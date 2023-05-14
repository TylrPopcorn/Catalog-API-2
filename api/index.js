console.log("node application practice");

require("dotenv").config();
const server = require("./server");
const PORT = 9000; // || process.env.PORT

/*
    Dependencies:

    npm install express
    npm i -D nodemon
    npm i dotenv
    npm i axios
    npm i cors
*/

server.listen(PORT, () => {
  console.log(`\nServer is running on port http://localhost:${PORT}\n`);
});
