import React, { Component } from "react";
import PropType from "prop-types";
import "../UI/dist/semantic.min.css";
import { geolocated, geoPropTypes } from "react-geolocated";
import Suggestions from "./suggestions";

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
    this.handleChangeCountry = this.handleChangeCountry.bind(this);
    this.handleMyLoc = this.handleMyLoc.bind(this);
  }

  handleChangeCity(e) {
    const { searchBoxCityOnChange } = this.props;
    e.preventDefault();
    searchBoxCityOnChange(e.target.value);
  }

  handleChangeCountry(e) {
    const { searchBoxCountryOnChange } = this.props;
    e.preventDefault();
    searchBoxCountryOnChange(e.target.value);
  }

  handleSearchButtonClick(e) {
    const { searchButtonClick } = this.props;
    e.preventDefault();
    searchButtonClick();
  }

  handleMyLoc(e) {
    const { coords } = this.props;
    if (coords !== null) {
      const {
        coords: { latitude, longitude },
        clickMyLoc
      } = this.props;
      e.preventDefault();
      if (latitude !== null && latitude !== undefined) {
        clickMyLoc(latitude, longitude);
      }
    }
  }

  render() {
    const {
      props: {
        city,
        country,
        results,
        isGeolocationEnabled,
        isGeolocationAvailable,
        clickList
      },
      handleChangeCity,
      handleMyLoc,
      handleChangeCountry,
      handleSearchButtonClick
    } = this;
    return (
      <div>
        <div className="ui large icon input">
          <input
            className="city"
            type="ui input1"
            placeholder="City..."
            value={city}
            onChange={handleChangeCity}
          />
        </div>
        <div className="ui large icon input">
          <input
            className="country"
            type="ui input2"
            placeholder="Country..."
            value={country}
            onChange={handleChangeCountry}
          />
        </div>
        <button
          type="button"
          className="ui large blue button"
          onClick={handleSearchButtonClick}
        >
          Buscar &nbsp;&nbsp;&nbsp;&nbsp;
          <i className="search icon" />
        </button>
        {isGeolocationAvailable && isGeolocationEnabled && (
          <button
            type="button"
            className="ui large blue button"
            onClick={handleMyLoc}
          >
            Use My Location
          </button>
        )}
        <div>
          <Suggestions
            results={results}
            city={city}
            country={country}
            clickList={clickList}
          />
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  city: PropType.string.isRequired,
  country: PropType.string.isRequired,
  results: PropType.arrayOf(PropType.object).isRequired,
  clickList: PropType.func.isRequired,
  searchBoxCountryOnChange: PropType.func.isRequired,
  searchButtonClick: PropType.func.isRequired,
  searchBoxCityOnChange: PropType.func.isRequired,
  clickMyLoc: PropType.func.isRequired
};

Search.propTypes = { ...Search.propTypes, ...geoPropTypes };

// Search.propTypes = {
//   city: PropType.string.isRequired,
//   country: PropType.string.isRequired,
//   results: PropType.arrayOf(PropType.object).isRequired,
//   isGeolocationEnabled: PropType.bool.isRequired,
//   isGeolocationAvailable: PropType.bool.isRequired,
//   clickList: PropType.func.isRequired,
//   coords: PropType.shape({
//     latitude: PropType.number,
//     longitude: PropType.number
//   }).isRequired,
//   searchBoxCountryOnChange: PropType.func.isRequired,
//   searchButtonClick: PropType.func.isRequired,
//   searchBoxCityOnChange: PropType.func.isRequired,
//   clickMyLoc: PropType.func.isRequired
// };
// export default Search;
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(Search);
