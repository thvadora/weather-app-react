import React from "react";

function Loading() {
  return (
    <div className="ui icon message">
      <i className="notched circle loading icon" />
      <div className="content">
        <div className="header">Just one second</div>
        <p>We are searching.</p>
      </div>
    </div>
  );
}

export default Loading;
