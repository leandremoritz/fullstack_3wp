// Import needed libraries
const express = require("express"); // Used to set up a server
const cors = require("cors"); // Used to prevent errors when working locally

// Import routes
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute")

// Configure Server
const app = express(); // Initialize express as an app variable
app.set("port", process.env.PORT || 6969); // Set the port
app.use(express.json()); // Enable the server to handle JSON requests
app.use(cors()); // Dont let local development give errors
app.use(express.static("public"));
// GET '/' is always what will be displayed on the home page of your application
app.get("/", function (req, res)  {
    res.sendFile(__dirname + "home.html");
  });
  // app.get('/', function(request, response) {
    // Render login template
  //   response.sendFile(path.join(__dirname + '/login.html'));
  // });

  // Use individual routes when visiting these URLS
app.use("/users", userRoute);
app.use("/products", productRoute);

app.listen(app.get ("port"),() => {
    console.log("Server is running")
    console.log(`Access Port at localhost:${app.get("port")}`)
})