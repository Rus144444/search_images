import React, { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";

const BASE_URL = "https://pixabay.com/api";
const API_KEY = "49147198-03f8f016f7f029fb8f00a13f5";

class App extends Component {
  state = {
    images: [],
    query: "",
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query &&
      this.state.query.trim() !== ""
    ) {
      this.fetchImage();
    }
  }

  fetchImage = async () => {
    const { query } = this.state;
    if (!query.trim()) return;

    this.setState({ loading: true, error: null });

    try {
      const response = await fetch(
        `${BASE_URL}/?q=${query}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const data = await response.json();
      this.setState({ images: data.hits, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  handleSubmit = (query) => {
    if (query.trim() !== this.state.query) {
      this.setState({ query, images: [] });
    }
  };

  render() {
    const { images, loading, error } = this.state;
    return (
      <div>
        <h1>Поиск изображений</h1>
        <Searchbar onSubmit={this.handleSubmit} />
        {loading && <p>Загрузка...</p>}
        {error && <p style={{ color: "red" }}>Ошибка: {error}</p>}

        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {images.map((image) => (
            <img
              key={image.id}
              src={image.webformatURL}
              alt={image.tags}
              width="200"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
