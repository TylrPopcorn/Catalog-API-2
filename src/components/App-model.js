import React from "react";
import { useParams } from "react-router-dom";
//
//
const vars = {
  //extra variables, debounecs, tables, etc that this file may need.
};
const functions = {
  //all functions jumbled together to be exported.
  createLabel,
  getResponse,
};

functions.mainPage = function (props) {
  const { items, loadingMsg } = props.data;
  const navigate = props.navigate;

  return (
    <>
      {items !== undefined && Object.keys(items).length > 0
        ? (console.log("Items found"), functions.createLabel(items, navigate))
        : (console.log("NO DATA"),
          (<p className="loading-container">{loadingMsg}</p>))}
    </>
  );
};

functions.showItemInfo = function (props) {
  const { itemName } = useParams(); //useParams allows us to read the headers incoming information.
  const { items } = props.data; //ALL of the items.
  const ITEM = items[itemName];
  const navigate = props.navigate;

  if (ITEM !== undefined) {
    console.log(ITEM);
    setTimeout(() => {
      //  navigate("/");
    }, 7000);
    return <h1> {ITEM.name} </h1>;
  } else {
    //The page CANNOT be found.
    console.log("NO WAY");

    return (
      <div className="error-page">
        <p className="error-title"> ITEM NOT FOUND</p>
        <p className="error-description">{itemName}</p>
        <button>BACK</button>
      </div>
    );
  }
};

//This function is repsonsible for creating each label in the list:
export function createLabel(data, navigate) {
  // console.log(data, "Creating label....");
  const items = Object.keys(data);

  return items.map((item, idx) => {
    const { id, name, url, thumbnailUrl } = data[item];

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
  });
}

//This is responsible for getting and returning any kind of response from an API.
export async function getResponse(Link) {
  const response = await fetch(Link); //request API data.
  const jsonData = await response.json();
  return jsonData; //data.
}

export default functions;
//[NOTE]: functions can be exported one by one or all together like done by the line above.
