import React from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import data from "../data.yaml";

class Data extends React.Component {
  render() {
    return <SwaggerUI url={data} />;
  }
}

export default Data;
