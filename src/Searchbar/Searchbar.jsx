import React, { Component } from "react";

class Searchbar extends Component {
  state = {
    query: "",
  };

  handleChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.query.trim() === "") return;
    this.props.onSubmit(this.state.query);
    this.setState({ query: "" });
  };

  render() {
    const { query } = this.state;
    return (
      <header className="searchbar">
        <form onSubmit={this.handleSubmit} className="form">
          <input
            type="text"
            className="input"
            value={query}
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Поиск изображений"
          />
          <button type="submit" className="button">
            Искать
          </button>
        </form>
      </header>
    );
  }
}

export { Searchbar };
