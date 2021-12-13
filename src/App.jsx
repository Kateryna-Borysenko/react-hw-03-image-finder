import React, { Component } from 'react';
import SearchBar from 'components/Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify'; //библиотека
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    searchQuery: '',
    // images: [],
  };
  onSearchHandle = query => {
    this.setState({
      searchQuery: query,
    });
    console.log(query);
  };

  //////////////////////////////////
  // state = {
  //   images: [],
  // };
  // componentDidMount() {
  //   const BASE_URL = 'https://pixabay.com/api';
  //   const API_KEY = '24447293-d3f0d6bbd906e1eb5560775ff';
  //   const searchQuery = 'cat';
  //   const currentPage = 1;
  //   fetch(
  //     `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${currentPage}&per_page=12&key=${API_KEY}`,
  //   )
  //     .then(res => res.json())
  //     .then(res => res.hits)
  //     .then(images => this.setState({ images }));
  // }
  //////////////////////////////////

  render() {
    return (
      <div>
        <SearchBar onSubmit={this.onSearchHandle} />
        <h1>Hello!</h1>
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
