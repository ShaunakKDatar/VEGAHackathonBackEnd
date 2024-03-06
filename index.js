const express = require("express");
const app = express();
const event = require("./routes/events");
app.use(express.json());
require("./startup/db")();
app.use("/api/events", event);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
