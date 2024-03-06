const express = require("express");
const app = express();
const user = require("./routes/user");
const events = require("./routes/events");
const announcements = require("./routes/announcements");

app.use(express.json());

require("./startup/db")();
app.use("/user", user);
app.use("/api/events", events);
app.use("/api/announcements", announcements);

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (!err) {
    console.log(`Listening on port ${port}...`);
  } else {
    console.log(err);
  }
});
