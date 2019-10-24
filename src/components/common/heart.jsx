import React from "react";

const HeartIcon = props => {
  let newClasses = "fa fa-heart";
  if (!props.liked) newClasses += "-o";
  return (
    <i
      style={{ cursor: "pointer" }}
      className={newClasses}
      aria-hidden="true"
      onClick={props.onClick}
    ></i>
  );
};

export default HeartIcon;
