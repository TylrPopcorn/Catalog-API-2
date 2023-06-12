import React, { useEffect, useState } from "react";

import Functions from "./App-model"; //Helper functions that support the overall component.

import { Routes, Route, useNavigate } from "react-router-dom";
//------------------
function App() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    //app info:
    items: {}, //all items
    loadingMsg: "Loading...", //msgs for the loading (DEFAULT: Loading...)

    bottomNavigation: {
      visible: false,
      right: false,
      left: false,
    },
  });

  //function that will run after first mount:
  useEffect(() => {
    console.log("UseEffect - running");
    const randomTime = Math.floor(Math.random() * 1000) + 1000; //Loading effect.
    const navigationDiv = document.getElementsByClassName("navigation")[0];

    setTimeout(async () => {
      //Attempt to get any current hats in the database:
      let CURRENT_hats = await Functions.getResponse(
        "http://localhost:9000/api/hats/"
      );

      if (Object.keys(CURRENT_hats).length <= 0) {
        //IF there are no hats in the database, import some starters.
        CURRENT_hats = await Functions.getResponse(
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
        <li className>
          <Routes>
            <Route //MAIN PAGE
              exact
              path="/"
              element={<Functions.HOME_Page data={data} navigate={navigate} />}
            />

            <Route //ITEM INFO PAGE
              exact
              path="/:itemName" //itemName is a variable.
              element={
                <>
                  <Functions.ITEM_Page
                    props={{
                      data: data,
                      navigate: navigate,
                    }}
                  />
                </>
              }
            />
          </Routes>
        </li>
      </div>

      <div className="navigation" hidden={false}>
        <button class="arrow-button left-arrow">&lt;</button>
        <p> Page 1 of 2 </p>
        <button class="arrow-button right-arrow">&gt;</button>
      </div>
    </div>
  );
}
//------------

export default App;
