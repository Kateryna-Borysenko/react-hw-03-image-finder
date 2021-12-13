import React, { Component } from 'react';
import SearchBar from 'components/Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify'; //библиотека
import 'react-toastify/dist/ReactToastify.css';
import api from 'services/api';

import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Spinner from 'components/Loader/Loader';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    currentPage: 1,
    error: null,
    isLoading: false,
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
    //при запросе влк лоудер
    this.setState({ isLoading: true });

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
      })
      .finally(() => {
        //без файнали не отключается spinner
        return this.setState({ isLoading: false });
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
    const { images, isLoading } = this.state;
    //показать кнопку только в том случае, если длина  массива > 0 и нет загрузки
    const shouldRenderLoadMoreBtn = images.length > 0 && !isLoading;
    return (
      <div>
        <SearchBar onSubmit={this.onSearchHandle} />
        <ImageGallery images={images} />
        {isLoading && <Spinner />}
        {shouldRenderLoadMoreBtn && <Button onClick={this.fetchImages} />}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
