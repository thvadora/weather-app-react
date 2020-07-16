import React, { Component } from "react";
import photo from "./img/cloud.png";
import "../UI/dist/semantic.min.css";

class Title extends Component {
  static getCenter() {
    return {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "30vh"
    };
  }

  render() {
    return (
      <div className="ui massive segement" style={Title.getCenter()}>
        <img className="ui medium circular image" src={photo} alt="" />
      </div>
    );
  }
}

export default Title;
