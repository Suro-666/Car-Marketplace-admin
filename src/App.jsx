import React from "react";
import { BrowserRouter } from "react-router-dom";
import RouteManager from "./Routes/RouteManager";

const App = () => {
  return (
    <BrowserRouter>
      <RouteManager />
    </BrowserRouter>
  );
};

export default App;
