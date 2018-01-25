import React from "react";
import "./searchbar.css";

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {term: ''};

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  handleTermChange(event) {
    this.setState({term: event.target.value});
  }

//  handleClick(){
//    this.search(this.state.term);
//  }

  search() {
    console.log(this.state.term);
    this.props.onSearch(this.state.term);
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
        <a onClick={this.search}>SEARCH</a>
      </div>
    )
  }
};

export default SearchBar;
