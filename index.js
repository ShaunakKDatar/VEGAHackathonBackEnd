const express = require("express");
const app = express();
const studentUser = require("./routes/studentUser");
const tpoUser = require("./routes/tpoUser");
const alumniUser = require("./routes/alumniUser");
const events = require("./routes/events");
const announcements = require("./routes/announcements");

app.use(express.json());

require("./startup/db")();
app.use("/api/student", studentUser);
app.use("/api/tpo", tpoUser);
app.use("/api/alumni", alumniUser);
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
