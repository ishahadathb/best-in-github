import React from "react";
import {render} from "react-dom";
import {App} from "./components/App";

require("./index.css");

render(<App/>, document.getElementById("app"));

if (module.hot) {
    module.hot.accept(App, function () {
        console.log('Accepting the updated printMe module!');
    })
}