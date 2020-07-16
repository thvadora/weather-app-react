import React, { Component } from "react";
import PropType from "prop-types";
import "../UI/dist/semantic.min.css";
import { getCountryName } from "./isoCountries";

const FLAGFOLDER = "https://www.countryflags.io/";

function FLAGfiledirectory(country) {
  return `${FLAGFOLDER + country}/flat/32.png`;
}
class Suggestions extends Component {
  constructor(props) {
    super(props);
    this.handleClickList = this.handleClickList.bind(this);
  }

  async handleClickList(e) {
    const { clickList } = this.props;
    e.preventDefault();
    clickList(e.target.id);
  }

  render() {
    const {
      handleClickList,
      props: { city, results }
    } = this;
    if (city === "") return null;
    const options = results.map(r => (
      <div
        role="button"
        tabIndex="0"
        className="item"
        key={r.id}
        id={r.id}
        onClick={handleClickList}
        onKeyDown={handleClickList}
      >
        <img
          className="flag image"
          src={FLAGfiledirectory(r.country)}
          id={r.id}
          alt=""
        />
        <div className="content" id={r.id}>
          <b className="header" id={r.id}>
            {r.name}
          </b>
          <div className="description" id={r.id}>
            {" "}
            {getCountryName(r.country)}
          </div>
        </div>
      </div>
    ));
    return <div className="ui middle aligned selection list">{options}</div>;
  }
}

Suggestions.propTypes = {
  clickList: PropType.func.isRequired,
  results: PropType.arrayOf(PropType.object).isRequired,
  city: PropType.string.isRequired
};

export default Suggestions;
