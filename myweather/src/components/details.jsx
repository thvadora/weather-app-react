import React from "react";
import PropType from "prop-types";
import Current from "./current";
import photo from "./img/cloud.png";

function Details(props) {
  const { data } = props;
  if (data === undefined) return null;
  const {
    data: { date, info }
  } = props;
  const details = info.map(r => (
    <div key={r.id}>
      <Current data={r} />
    </div>
  ));
  return (
    <div>
      <br />
      <br />
      <h2 className="ui header">
        <img alt="" src={photo} className="ui circular image" />
        {`Showing details for ${date}`}
      </h2>
      <div>{details}</div>
    </div>
  );
}

Details.propTypes = {
  data: PropType.shape({
    date: PropType.string,
    info: PropType.arrayOf(PropType.object)
  }).isRequired
};

export default Details;
