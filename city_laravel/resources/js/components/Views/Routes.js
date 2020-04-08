import React from "react";

import { BrowserRouter } from "react-router-dom";
import HomePage from "./homePage/homePage";
import ReactDOM from "react-dom";

const Routes = (props) => {
    return (
        <BrowserRouter basename={window.location.pathname}>
            <HomePage dataUser={{ ...props }} />
        </BrowserRouter>
    );
};

export default Routes;

if (document.getElementById("Routes")) {
    const el = document.getElementById("Routes");
    const props = Object.assign({}, el.dataset);
    ReactDOM.render(<Routes {...props} />, el);
}
