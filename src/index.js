import React from 'react'
import {render} from "react-dom";
import Map from "./components/Map/Map"
import districts_data from "./districts_data.json";
// import

function App () {
    return (
        <Map districts = {districts_data}/>
    )
}

render(<App/>, document.getElementById('root'))