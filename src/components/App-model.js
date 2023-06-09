import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
//vars
//
const Functions = {
  //Functions that DO get sent back to the main
};

const internalFunctions = {
  //Functions that do NOT get sent back to the main.
};
//
//------- ------- ------- -------     [FUNCTIONS]     --------  --------  --------  ---------
//
Functions.HOME_Page = function (props) {
  const { items, loadingMsg } = props.data;
  const navigate = props.navigate;

  return (
    <>
      {items !== undefined && Object.keys(items).length > 0
        ? (console.log("Items found"),
          internalFunctions.createLabel(items, navigate))
        : (console.log("NO DATA"),
          (<p className="loading-container">{loadingMsg}</p>))}
    </>
  );
};

Functions.ITEM_Page = function (params) {
  const { itemName } = useParams(); //useParams allows us to read the headers incoming information.
  const props = params.props;
  //--
  const navigate = props.navigate;
  const data = props.data;
  //--
  const { items } = data; //ALL of the items.
  //--
  const ITEM = items[itemName];

  //console.log(props); //For testing purposes.
  //---------------
  //--Start:
  // useEffect(() => {
  //   const navigationDiv = document.getElementsByClassName("navigation")[0];
  //   if (navigationDiv != undefined) {
  //     navigationDiv.setAttribute("hidden", "true");
  //   }
  // }, []);

  if (ITEM !== undefined) {
    return internalFunctions.ITEM_INFO_PAGE(ITEM, navigate);
  } else {
    //The page CANNOT be found.

    return internalFunctions.ERROR_PAGE(itemName, navigate);
  }
};

//This is responsible for getting and returning any kind of response from an API.
Functions.getResponse = async function (Link) {
  const response = await fetch(Link); //request API data.
  const jsonData = await response.json();
  return jsonData; //data.
};
//
//
//

//This function is responsible for hiding/showing navigation at the bottom.
Functions.ShowNavigation = function (bool) {
  const navigationDiv = document.getElementsByClassName("navigation")[0];
  if (navigationDiv != undefined) {
    if (bool === true) {
      navigationDiv.setAttribute("hidden", "true");
    } else {
      navigationDiv.setAttribute("hidden", "false");
    }
  }
};
//------- ------- ------- -------     [Internal FUNCTIONS]     --------  --------  --------  ---------
//
//This function is repsonsible for creating each label in the list:
internalFunctions.createLabel = function (data, navigate) {
  // console.log(data, "Creating label....");
  const items = Object.keys(data);

  return items.map((item, idx) => {
    const { id, name, url, thumbnailUrl } = data[item];

    if (idx + 1 < 5) {
      return (
        <div
          className={`item-container ${item}`}
          key={id || idx}
          onClick={() => {
            navigate(name);
          }}
        >
          <div className="itm-img-section">
            <img
              className="item-thumbnail"
              // title={url}
              alt="N/A"
              src={thumbnailUrl}
            />
            <p className="item-id"> {id} </p>
          </div>
          <p className="item-name">{name}</p>
        </div>
      );
    }
  });
};

//This function is responsible for SHOWING the error page.
internalFunctions.ERROR_PAGE = function (itemName, navigate) {
  function onClick() {
    //This function is responsible for sending the user back to the main page.
    navigate("/");
  }

  return (
    <div className="error-page">
      <p className="error-title"> ITEM NOT FOUND</p>
      <p className="error-description">{itemName}</p>
      <button onClick={onClick}>BACK</button>
    </div>
  );
};

//This function is responsible for SHOWING the items info on the page
internalFunctions.ITEM_INFO_PAGE = function (ITEM, navigate) {
  //TODO: FINISH
  console.log(ITEM);
  setTimeout(() => {
    navigate("/");
  }, 7000);
  return <h1> {ITEM.name} </h1>;
};

//---exports:
export default Functions;
//[NOTE]: functions can be exported one by one or all together like done by the line above.
