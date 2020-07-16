import React from "react";
import PropType from "prop-types";
import getImg from "./getimg";

function Current(props) {
  const {
    data: {
      description,
      pic,
      temperature,
      mintemp,
      maxtemp,
      pressure,
      humidity,
      wind,
      sunrise,
      sunset,
      rain,
      start,
      id
    }
  } = props;

  return (
    <div className="ui placeholder segment">
      <div className="ui basic blue message">{description.toUpperCase()}</div>
      <div className="ui items">
        <div className="item">
          <div className="image">
            <img className="ui huge rounded image" alt="" src={getImg(pic)} />
          </div>
          <div className="content">
            <div className="ui segment">
              <div className="ui two column very relaxed grid">
                <div className="column">
                  <div className="ui divided list">
                    <b className="item">
                      <div className="ui big blue horizontal label">
                        Temperature
                      </div>
                      <b>{`${temperature}C°`}</b>
                    </b>
                    <br />
                    <b className="item">
                      <div className="ui big blue horizontal label">
                        Minimum Temperature
                      </div>
                      <b>{`${mintemp} C°`}</b>
                    </b>
                    <br />
                    <b className="item">
                      <div className="ui big blue horizontal label">
                        Maximum Temperature
                      </div>
                      <b>{`${maxtemp} C°`}</b>
                    </b>
                    <br />
                    <b className="item">
                      <div className="ui big blue horizontal label">
                        Preassure
                      </div>
                      <b>{`${pressure} hpm`}</b>
                    </b>
                    <br />
                  </div>
                </div>
                <div className="column">
                  <div className="ui divided list">
                    <b className="item">
                      <div className="ui big blue horizontal label">
                        Humidity
                      </div>
                      <b>{`${humidity}%`}</b>
                    </b>
                    <br />
                    <b className="item">
                      <div className="ui big blue horizontal label">Wind</div>
                      <b>{`${wind} km/h`}</b>
                    </b>
                    <br />
                    {sunrise !== undefined && (
                      <b className="item">
                        <div className="ui big blue horizontal label">
                          Sunrise
                        </div>
                        <b>{sunrise}</b>
                      </b>
                    )}
                    <br />
                    {sunset !== undefined && (
                      <b className="item">
                        <div className="ui big blue horizontal label">
                          Sunset
                        </div>
                        <b>{sunset}</b>
                      </b>
                    )}
                    {rain !== undefined && (
                      <b className="item">
                        <div className="ui big blue horizontal label">Rain</div>
                        <b>{rain["3h"]}</b>
                      </b>
                    )}
                    {id !== undefined && (
                      <div className="ui massive message">{start}</div>
                    )}
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}

Current.propTypes = {
  data: PropType.shape({
    description: PropType.string,
    pic: PropType.string,
    temperature: PropType.number,
    mintemp: PropType.number,
    maxtemp: PropType.number,
    pressure: PropType.number,
    humidity: PropType.number,
    wind: PropType.number,
    sunrise: PropType.string,
    sunset: PropType.string,
    rain: PropType.any,
    start: PropType.string,
    id: PropType.number
  }).isRequired
};

export default Current;
