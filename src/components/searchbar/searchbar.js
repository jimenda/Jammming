import React from "react";
import "./searchbar.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {term: ''};
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search(search) {
    this.props.onSearch(this.props.search);
  }

  handleTermChange(event) {
    this.setState(event);
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
        <a>SEARCH</a>
      </div>
    )
  }
};

export default SearchBar;
