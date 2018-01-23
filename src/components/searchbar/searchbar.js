import React from "react";
import "./searchbar.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {term: ''};
    this.handleClick = this.handleClick.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  handleClick(){
    this.props.onSearch(this.state.term);
  }

  handleTermChange(event) {
    this.setState(event);
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
        <a onClick={this.handleClick}>SEARCH</a>
      </div>
    )
  }
};

export default SearchBar;
