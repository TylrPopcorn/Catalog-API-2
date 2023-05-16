import React from "react";
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

//This function is responsible for showing information regarding one item:
functions.getInfo = function () {
  console.log("YERS");
};

//This function is repsonsible for creating each label in the list:
export function createLabel(data) {
  // console.log(data, "Creating label....");
  const items = Object.keys(data);
  return items.map((item, idx) => {
    const { id, name, url, thumbnailUrl } = data[item];
    console.log(data[item], "<-------");

    return (
      <div
        className={`item-container ${item}`}
        key={id || idx}
        onClick={functions.getInfo}
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
