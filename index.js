const express = require("express");
const app = express();
const event = require("./routes/events");
app.use(express.json());const userRoute = require("./routes/userRoute");
require("./startup/db")();
app.use("/", userRoute);
app.use("/api/events", event);
app.listen(port, (err) => {
    if(!err)
    {console.log(`Listening on port ${port}...`)}
else{
    console.log(err);
}});
