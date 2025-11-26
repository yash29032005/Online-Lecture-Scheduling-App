const dotenv = require("dotenv");
dotenv.config();
const app = require("./src/app");
const connectToDB = require("./src/config/db");

const PORT = process.env.PORT || 5050;

app.listen(PORT, async () => {
  connectToDB();
  console.log("Server running on port 5000");
});
