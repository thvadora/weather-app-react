import React, { Component } from "react";
import PropType from "prop-types";
import "../UI/dist/semantic.min.css";
import Details from "./details";
import getImg from "./getimg";

const undefinedElements = {
  idShow: undefined
};

class Forecast extends Component {
  constructor(props) {
    super(props);
    this.state = undefinedElements;
    this.handleDetails = this.handleDetails.bind(this);
    this.hide = this.hide.bind(this);
  }

  getIndex = () => {
    const {
      state: { idShow },
      props: {
        data: { details }
      }
    } = this;
    if (idShow !== undefined) {
      return details[idShow];
    }
    return "";
  };

  async handleDetails(e) {
    e.preventDefault();
    const setter = parseInt(e.target.id, 10);
    await this.setState({ idShow: setter });
  }

  async hide() {
    await this.setState({ idShow: undefined });
  }

  render() {
    const {
      hide,
      handleDetails,
      props: {
        data: { nextdays }
      },
      state: { idShow }
    } = this;
    const forecast = nextdays.map(day => (
      <div
        role="button"
        tabIndex="0"
        onClick={handleDetails}
        onKeyDown={handleDetails}
        key={day.id}
        className="ui blue card"
      >
        <div id={day.id} className="image">
          <img id={day.id} alt="" src={getImg(day.pic)} />
        </div>
        <div id={day.id} className="content">
          <div id={day.id} className="header">
            {day.date}
          </div>
          <div id={day.id} className="meta">
            <b id={day.id}>{day.description}</b>
          </div>
          <div id={day.id} className="description">
            <div className="ui two column grid">
              <div className="column">
                <div className="ui big blue horizontal label">
                  {`${day.mintemp}C°`}
                </div>
              </div>
              <div className="column">
                <div className="ui big blue horizontal label">
                  {`${day.maxtemp}C°`}
                </div>
              </div>
            </div>
            <br />
            <button type="button" id={day.id} onClick={handleDetails}>
              More Details
            </button>
          </div>
        </div>
      </div>
    ));
    return (
      <div>
        <div className="ui basic blue message">5 day Forecast</div>
        <div className="ui five doubling cards">{forecast}</div>
        <br />
        <br />
        {idShow !== undefined && (
          <button type="button" className="ui red button" onClick={hide}>
            {" "}
            Hide Details
          </button>
        )}
        {idShow !== undefined && this.getIndex() !== undefined && (
          <Details data={this.getIndex()} />
        )}
      </div>
    );
  }
}

Forecast.propTypes = {
  data: PropType.shape({
    nextdays: PropType.arrayOf(PropType.object)
  }).isRequired
};

export default Forecast;
