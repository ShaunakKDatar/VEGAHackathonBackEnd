const express = require("express");
const app = express();
const cors = require("cors");
const studentUser = require("./routes/studentUser");
const tpoUser = require("./routes/tpoUser");
const alumniUser = require("./routes/alumniUser");
const events = require("./routes/events");
const announcements = require("./routes/announcements");
const company = require("./routes/company");
const auth = require("./routes/auth");
const resources = require("./routes/resources");

app.use(express.json());
app.use(cors());

require("./startup/db")();
app.use("/api/student", studentUser);
app.use("/api/tpo", tpoUser);
app.use("/api/alumni", alumniUser);
app.use("/api/events", events);
app.use("/api/announcements", announcements);
app.use("/api/auth", auth);
app.use("/api/company", company);
app.use("/api/resources", resources);

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (!err) {
    console.log(`Listening on port ${port}...`);
  } else {
    console.log(err);
  }
});
