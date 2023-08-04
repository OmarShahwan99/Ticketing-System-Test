import React from "react";

const ServiceCard = (props) => {
  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ color: "#1677ff", fontSize: "22px", fontWeight: "bold" }}>
        {props.title}
      </p>
      <p style={{ fontWeight: "600", fontSize: "24px" }}>${props.price}</p>
    </div>
  );
};

export default ServiceCard;
