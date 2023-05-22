import React, { useEffect, useState } from "react";

import functions from "./App-model"; //Helper functions that support the overall app function
//import {createLabel, getResponse,} from "./App-model"; //helper functions

import { Routes, Route, useNavigate } from "react-router-dom";
//------------------
function App() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    //app info:
    items: {}, //all items
    loadingMsg: "Loading...", //msgs for the loading (DEFAULT: Loading...)
  });

  //function that will run after first mount:
  useEffect(() => {
    //console.log("UseEffect - running");
    const randomTime = Math.floor(Math.random() * 1000) + 1000; //Loading effect.

    setTimeout(async () => {
      //Attempt to get any current hats in the database:
      let CURRENT_hats = await functions.getResponse(
        "http://localhost:9000/api/hats/"
      );

      if (Object.keys(CURRENT_hats).length <= 0) {
        //IF there are no hats in the database, import some starters.
        CURRENT_hats = await functions.getResponse(
          "http://localhost:9000/api/hats/imports"
        );
      }
      //
      setData({
        ...data,
        items: CURRENT_hats,
      });
    }, randomTime);
  }, []);

  return (
    <div className="App">
      {/* TITLE */}
      <h2 className="title"> CATALOG API </h2>

      {/* API LINK */}
      <a
        className="link"
        href="https://catalog.roblox.com/v1/search/items/details?Category=11&SortType=3&Limit=10"
        title="view and verify incoming data"
      >
        https://catalog.roblox.com/v1/search/items/details?Category=11&SortType=3&Limit=10
      </a>

      {/* LIST CONTAINER */}
      <div className="list-container">
        <li>
          {/* <functions.mainPage /> */}
          <Routes>
            <Route
              exact
              path="/"
              element={<functions.mainPage data={data} navigate={navigate} />}
            />

            <Route exact path="/:item" element={<functions.showItemInfo />} />
          </Routes>
        </li>
      </div>
    </div>
  );
}
//------------

export default App;
