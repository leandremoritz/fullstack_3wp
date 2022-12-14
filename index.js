// Import needed libraries
const express = require("express"); // Used to set up a server
const cors = require("cors"); // Used to prevent errors when working locally
const path = require("path")

// Import routes
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute")

// Configure Server
const app = express(); 
// Initialize express as an app variable
app.set("port", process.env.PORT || 6969); // Set the port
app.use(express.json()); // Enable the server to handle JSON requests
app.use(cors()); // Dont let local development give errors
app.use(express.static("public"));
// GET '/' is always what will be displayed on the home page of your application
// app.get("/", function (req, res)  {
//     res.sendFile( "/home.html", {root : __dirname});
//   });
  app.get('/', function (req, res) {
    const index = path.join(__dirname, '/', 'home.html');
    res.sendFile(index);
  });
  // app.get('/', function(request, response) {
    // Render login template
  //   response.sendFile(path.join(__dirname + '/login.html'));
  // });

  // Use individual routes when visiting these URLS
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });
app.use("/users", userRoute);
app.use("/products", productRoute);

app.listen(app.get ("port"),() => {
    console.log("Server is running")
    console.log(`Access Port at localhost:${app.get("port")}`)
})

app.use(
  cors({
    origin: ["http://192.168.9.202:8080/", "http://localhost:8080/"],
    credentials: true,
  })
);
{
  credentials: "include";
}