const express = require("express");
const app = express();
const userRoute = require("./routes2/userRoute");
const port = process.env.PORT || 3000;
app.use(express.json());
require("./startup/db")();

app.use("/", userRoute);


app.listen(port, (err) => {
    if(!err)
    {console.log(`Listening on port ${port}...`)}
else{
    console.log(err);
}});
