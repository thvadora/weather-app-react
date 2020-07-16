import React, { Component } from "react";
import Engine from "./components/engine";
import "./UI/dist/semantic.min.css";
import Title from "./components/title";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="ui segment">
        <Title />
        <br />
        <br />
        <Engine />
      </div>
    );
  }
}

export default App;
