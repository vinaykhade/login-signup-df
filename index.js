import { render } from "react-dom";
import React from "react";
import App from "./src/App";
import Root from './routes';

// const containerEl = document.getElementById("container");
//
// render(
//   <App/>,
//   containerEl
// );


render(<Root />, document.getElementById('container'));
