import React from "react";
import PropType from "prop-types";

function Uvi(props) {
  const {
    data: { value }
  } = props;
  function getCenter() {
    return {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "10vh"
    };
  }
  return (
    <div>
      <br />
      <br />
      <div style={getCenter()}>
        <button type="button" className="massive ui green button">
          {Math.floor(value) <= 1 && <b>{value}</b>}
        </button>
        <button type="button" className="massive ui green button">
          {Math.floor(value) === 2 && <b>{value}</b>}
        </button>
        <button type="button" className="massive ui yellow button">
          {Math.floor(value) === 3 && <b>{value}</b>}
        </button>
        <button type="button" className="massive ui yellow button">
          {Math.floor(value) === 4 && <b>{value}</b>}
        </button>
        <button type="button" className="massive ui yellow button">
          {Math.floor(value) === 5 && <b>{value}</b>}
        </button>
        <button type="button" className="massive ui orange button">
          {Math.floor(value) === 6 && <b>{value}</b>}
        </button>
        <button type="button" className="massive ui orange button">
          {Math.floor(value) === 7 && <b>{value}</b>}
        </button>
        <button type="button" className="massive ui red button">
          {Math.floor(value) === 8 && <b>{value}</b>}
        </button>
        <button type="button" className="massive ui red button">
          {Math.floor(value) === 9 && <b>{value}</b>}
        </button>
        <button type="button" className="massive ui red button">
          {Math.floor(value) === 10 && <b>{value}</b>}
        </button>
        <button type="button" className="massive ui violet button">
          {Math.floor(value) >= 11 && <b>{value}</b>}
        </button>
      </div>
    </div>
  );
}

Uvi.propTypes = {
  data: PropType.shape({
    value: PropType.number
  }).isRequired
};

export default Uvi;
