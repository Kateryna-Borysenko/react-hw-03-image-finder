import React, { Component } from 'react';
import SearchBar from 'components/Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify'; //библиотека
import 'react-toastify/dist/ReactToastify.css';
import api from 'services/api';

import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    currentPage: 1,
    error: null,
  };
  onSearchHandle = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      error: null,
    });
    console.log(query);
    console.log(api);
  };
  ////////////////////////////////////////
  //делаю запрос
  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    const options = {
      searchQuery,
      currentPage,
    };

    api
      .fetchImages(options)
      .then(response => {
        if (response.data.total === 0) {
          toast.error('Нет совпадений с запросом');
          return;
        }
        const filteredData = response.data.hits.map(hit => {
          return {
            id: hit.id,
            webformatURL: hit.webformatURL,
            largeImageURL: hit.largeImageURL,
          };
        });

        this.setState(prevState => ({
          images: [...prevState.images, ...filteredData],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => {
        this.setState({ error });
        toast.error('Ошибка');
      });
  };

  // если прошлый запрос не равен текущему, то отправляем запрос
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
      // console.log('prevProps', prevState.searchQuery);
      // console.log('prevState', this.state.searchQuery);
    }
  }

  render() {
    const { images } = this.state;
    return (
      <div>
        <SearchBar onSubmit={this.onSearchHandle} />
        <ImageGallery images={images} />
        <Button onClick={this.fetchImages} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
