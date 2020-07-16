import React, { Component } from "react";
import Search from "./search";
import "../UI/dist/semantic.min.css";
import cityList from "./city.list.json";
import Loading from "./loading";
import Current from "./current";
import Forecast from "./forecast";
import Uvi from "./uvi";
import { getCountryName, getCountryCode } from "./isoCountries";

const CURURL = "https://api.openweathermap.org/data/2.5/weather";
const FORURL = "https://api.openweathermap.org/data/2.5/forecast";
const UVIURL = "https://api.openweathermap.org/data/2.5/uvi";
const APPID = "aed5830e10ec8f9b653a377eacfe29e8";

const undefinedElements = {
  results: [],
  city: "",
  country: "",
  couldSearch: true,
  forCurrent: {
    cityShown: undefined,
    countryShown: undefined,
    temperature: undefined,
    description: undefined,
    pic: undefined,
    pressure: undefined,
    mintemp: undefined,
    maxtemp: undefined,
    sunrise: undefined,
    sunset: undefined,
    wind: undefined,
    humidity: undefined,
    lat: undefined,
    lon: undefined
  },
  forForecast: {
    nextdays: [
      {
        id: undefined,
        day: undefined,
        date: undefined,
        pic: undefined,
        mintemp: undefined,
        maxtemp: undefined,
        description: undefined
      }
    ],
    details: [
      {
        id: undefined,
        date: undefined,
        info: [
          {
            id: undefined,
            start: undefined,
            temperature: undefined,
            description: undefined,
            pressure: undefined,
            wind: undefined,
            mintemp: undefined,
            maxtemp: undefined,
            humidity: undefined,
            rain: undefined,
            pic: undefined
          }
        ]
      }
    ]
  },
  forUvi: {
    value: undefined
  },
  isError: false,
  isReload: false,
  show: "current"
};

class Engine extends Component {
  static DayAsString(dayIndex) {
    const weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";

    return weekdays[dayIndex];
  }

  static max(a, b) {
    if (a >= b) return a;
    return b;
  }

  static min(a, b) {
    if (a <= b) return a;
    return b;
  }

  constructor() {
    super();
    this.state = undefinedElements;
    this.setStateCurrentWeather = this.setStateCurrentWeather.bind(this);
    this.toCurrent = this.toCurrent.bind(this);
    this.toForecast = this.toForecast.bind(this);
    this.toUvi = this.toUvi.bind(this);
    this.searchBoxCountryOnChange = this.searchBoxCountryOnChange.bind(this);
    this.searchBoxCityOnChange = this.searchBoxCityOnChange.bind(this);
    this.searchButtonClick = this.searchButtonClick.bind(this);
    this.clickList = this.clickList.bind(this);
    this.clickMyLoc = this.clickMyLoc.bind(this);
  }

  // hacer request y actualizar estado
  setStateCurrentWeather = async (cityName, country, type, lat, lon) => {
    let response;
    if (type === "ONLYCITYSEARCH") {
      response = await fetch(
        `${CURURL}?q=${cityName}&APPID=${APPID}&units=metric`
      );
    } else if (type === "IDSEARCH") {
      response = await fetch(
        `${CURURL}?id=${cityName}&APPID=${APPID}&units=metric`
      );
    } else if (type === "CITYANDCOUNTRYSEARCH") {
      response = await fetch(
        `${CURURL}?q=${cityName},${getCountryCode(
          country
        )}&APPID=${APPID}&units=metric`
      );
    } else if (type === "COORDS") {
      response = await fetch(
        `${CURURL}?lat=${lat}&lon=${lon}&APPID=${APPID}&units=metric`
      );
    }
    const data = await response.json();
    console.log(data);
    await this.setState({ isError: false });
    if (data.cod.toString() !== "200") {
      await this.setState({ isError: true });
    } else {
      await this.setState({
        forCurrent: {
          cityShown: data.name,
          countryShown: data.sys.country,
          temperature: data.main.temp,
          description: data.weather[0].description,
          pic: data.weather[0].icon,
          pressure: data.main.pressure,
          mintemp: data.main.temp_min,
          maxtemp: data.main.temp_max,
          sunrise: Engine.getFormatDate(data.sys.sunrise),
          sunset: Engine.getFormatDate(data.sys.sunset),
          wind: data.wind.speed,
          humidity: data.main.humidity,
          lat: data.coord.lat,
          lon: data.coord.lon
        }
      });
    }
  };

  // hacer request y actualizar estado
  setStateForecast = async (cityName, country, type, lat, lon) => {
    let response;
    if (type === "ONLYCITYSEARCH") {
      response = await fetch(
        `${FORURL}?q=${cityName}&APPID=${APPID}&units=metric`
      );
    } else if (type === "IDSEARCH") {
      response = await fetch(
        `${FORURL}?id=${cityName}&APPID=${APPID}&units=metric`
      );
    } else if (type === "CITYANDCOUNTRYSEARCH") {
      response = await fetch(
        `${FORURL}?q=${cityName},${getCountryCode(
          country
        )}&APPID=${APPID}&units=metric`
      );
    } else if (type === "COORDS") {
      response = await fetch(
        `${FORURL}?lat=${lat}&lon=${lon}&APPID=${APPID}&units=metric`
      );
    }
    const data = await response.json();
    await this.setState({ isError: false });
    if (data.cod.toString() !== "200") {
      await this.setState({ isError: true });
    } else {
      const list = new Array(5);
      const details = [];
      let put = 0;
      const today = new Date();
      const checker = Engine.getDates(today, 5);
      let averageMax;
      let averageMin;
      let pos = 0;
      while (data.list[pos].dt_txt.split(" ")[0] !== checker[0].first) pos += 1;
      while (put < 5) {
        averageMax = -200;
        averageMin = 200;
        const desc = data.list[pos].weather[0].description;
        let iconPos = 0;
        let listsize = 0;
        const currentList = [];
        while (
          data.list[pos] !== undefined &&
          data.list[pos].dt_txt.split(" ")[0] === checker[put].first
        ) {
          currentList.push({
            id: pos,
            start: data.list[pos].dt_txt.split(" ")[1],
            temperature: data.list[pos].main.temp,
            description: data.list[pos].weather[0].description,
            pressure: data.list[pos].main.pressure,
            wind: data.list[pos].wind.speed,
            mintemp: data.list[pos].main.temp_min,
            maxtemp: data.list[pos].main.temp_min,
            humidity: data.list[pos].main.humidity,
            rain: data.list[pos].rain,
            pic: data.list[pos].weather[0].icon
          });
          averageMax = Engine.max(averageMax, data.list[pos].main.temp_max);
          averageMin = Engine.min(averageMin, data.list[pos].main.temp_min);
          pos += 1;
          listsize += 1;
        }
        iconPos = Math.floor(Math.random() * listsize + 1);
        details.push({
          id: put,
          date: checker[put].second,
          info: currentList
        });
        list[put] = {
          id: put,
          date: checker[put].second,
          pic: data.list[iconPos].weather[0].icon,
          mintemp: averageMin,
          maxtemp: averageMax,
          description: desc
        };
        put += 1;
      }
      await this.setState({
        forForecast: { nextdays: list, details }
      });
    }
  };

  setStateUvi = async () => {
    const {
      state: {
        forCurrent: { lat, lon }
      }
    } = this;
    const response = await fetch(
      `${UVIURL}?lat=${lat}&lon=${lon}&APPID=${APPID}&mode=json`
    );
    if (!response.ok) {
      await this.setState({ isError: true });
    } else {
      const data = await response.json();
      await this.setState({ forUvi: { value: data.value } });
    }
    await this.setState({ isReload: false });
  };

  // actualizar estado de opciones de buscador
  getInfo = (city, country) => {
    if (country === "" && city !== "") {
      const completeList = cityList.filter(list => list.name.includes(city));
      const options = completeList.slice(0, 3);
      this.setState({
        results: options
      });
    } else if (country !== "" && city !== "") {
      const completeList = cityList.filter(
        list =>
          list.name.includes(city) &&
          getCountryName(list.country).includes(country)
      );
      const options = completeList.slice(0, 3);
      this.setState({
        results: options
      });
    } else {
      const options = [];
      this.setState({
        results: options
      });
    }
  };

  static getDates(startDate, daysToAdd) {
    const aryDates = [];

    for (let i = 1; i <= daysToAdd; i += 1) {
      const currentDate = new Date();
      currentDate.setDate(startDate.getDate() + i);
      let day = currentDate.getDate().toString();
      if (day.length < 2) day = `0${day}`;
      let month = (currentDate.getMonth() + 1).toString();
      if (month.length < 2) month = `0${month}`;
      aryDates.push({
        first: `${currentDate.getFullYear()}-${month}-${day}`,
        second: Engine.DayAsString(currentDate.getDay())
      });
    }
    return aryDates;
  }

  static getFormatDate(input) {
    const day = new Date(input * 1000);
    const hour = day.getHours();
    const minute = day.getMinutes();
    return `${hour}:${minute}`;
  }

  static getCenter() {
    return {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "10vh"
    };
  }

  toCurrent = async () => {
    await this.setState({ show: "current" });
  };

  toForecast = async () => {
    await this.setState({ show: "forecast" });
  };

  toUvi = async () => {
    await this.setState({ show: "uvi" });
  };

  // que sucede cuando se escribe en el input de ciudad
  searchBoxCityOnChange(input) {
    const {
      state: { country }
    } = this;
    let i = 0;
    if (input === "") {
      this.setState({ city: "" });
    } else {
      const a = input.split(" ");
      let inputt = "";
      for (i = 0; i < a.length - 1; i += 1) {
        inputt += `${a[i].charAt(0).toUpperCase() +
          a[i].slice(1).toLowerCase()} `;
      }
      inputt +=
        a[a.length - 1].charAt(0).toUpperCase() + a[i].slice(1).toLowerCase();
      this.setState({
        city: inputt,
        couldSearch: true
      });
      this.getInfo(inputt, country);
    }
  }

  // que sucede cuando se escribe en el input de pais
  searchBoxCountryOnChange(input) {
    const {
      state: { city }
    } = this;
    let i = 0;
    if (input === "") {
      this.setState({ country: "" });
    } else {
      const a = input.split(" ");
      let inputt = "";
      for (i = 0; i < a.length - 1; i += 1) {
        inputt += `${a[i].charAt(0).toUpperCase() +
          a[i].slice(1).toLowerCase()} `;
      }
      inputt +=
        a[a.length - 1].charAt(0).toUpperCase() + a[i].slice(1).toLowerCase();
      this.setState({
        country: inputt,
        couldSearch: true
      });
      this.getInfo(city, inputt);
    }
  }

  // que sucede cuando se aprieta el boton buscar
  async searchButtonClick() {
    const {
      state: { city, country }
    } = this;
    await this.setState({ couldSearch: true, isReload: true });
    if (city !== "" && country !== "") {
      await this.setStateCurrentWeather(
        city,
        country,
        "CITYANDCOUNTRYSEARCH",
        "",
        ""
      );
      await this.setStateForecast(
        city,
        country,
        "CITYANDCOUNTRYSEARCH",
        "",
        ""
      );
      await this.setStateUvi();
    } else if (city !== "" && country === "") {
      await this.setStateCurrentWeather(
        city,
        country,
        "ONLYCITYSEARCH",
        "",
        ""
      );
      await this.setStateForecast(city, country, "ONLYCITYSEARCH", "", "");
      await this.setStateUvi();
    } else this.setState({ couldSearch: false });
  }

  async clickMyLoc(lat, lon) {
    await this.setState({ couldSearch: true, isReload: true });
    await this.setStateCurrentWeather("", "", "COORDS", lat, lon);
    await this.setStateForecast("", "", "COORDS", lat, lon);
    await this.setStateUvi();
  }

  // que sucede cuando se aprieta una de las opciones
  async clickList(cityID) {
    await this.setState({ couldSearch: true, isReload: true });
    await this.setStateCurrentWeather(cityID, "", "IDSEARCH", "", "");
    await this.setStateForecast(cityID, "", "IDSEARCH", "", "");
    await this.setStateUvi();
  }

  render() {
    const {
      searchBoxCountryOnChange,
      searchBoxCityOnChange,
      searchButtonClick,
      clickList,
      clickMyLoc,
      toCurrent,
      toForecast,
      toUvi,
      state: {
        couldSearch,
        isError,
        city,
        country,
        results,
        isReload,
        show,
        forForecast,
        forCurrent,
        forUvi
      }
    } = this;
    const nullCityError = couldSearch ? null : (
      <h1 className="ui big red label">
        {" "}
        No se pudo realizar la búsqueda, ingrese una ciudad.
      </h1>
    );
    const fetchAPIError = isError ? (
      <h1 className="ui big red label">
        {" "}
        Hubo un error al obtener la información deseada.
      </h1>
    ) : null;
    return (
      <div>
        <div style={Engine.getCenter()}>
          <Search
            city={city}
            country={country}
            results={results}
            searchBoxCountryOnChange={searchBoxCountryOnChange}
            searchBoxCityOnChange={searchBoxCityOnChange}
            searchButtonClick={searchButtonClick}
            clickList={clickList}
            clickMyLoc={clickMyLoc}
          />
        </div>
        <br />
        <br />
        {nullCityError}
        {fetchAPIError}
        <div className="ui pointng menu">
          <button type="button" onClick={toCurrent} className="item">
            <b>Current Weather</b>
          </button>
          <button type="button" onClick={toForecast} className="item">
            <b>Forecast</b>
          </button>
          <button type="button" onClick={toUvi} className="item">
            <b>UVI</b>
          </button>
        </div>
        {isReload && nullCityError === null && !isError && <Loading />}
        {!isReload &&
          nullCityError === null &&
          show === "current" &&
          !isError &&
          forCurrent.temperature !== undefined && <Current data={forCurrent} />}
        {!isReload &&
          show === "forecast" &&
          nullCityError === null &&
          !isError &&
          forForecast.nextdays[0].maxtemp !== undefined && (
            <Forecast data={forForecast} />
          )}
        {!isReload &&
          show === "uvi" &&
          nullCityError === null &&
          !isError &&
          forUvi.value !== undefined && <Uvi data={forUvi} />}
      </div>
    );
  }
}

export default Engine;
