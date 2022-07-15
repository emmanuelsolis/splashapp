// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalized = require("./utils/capitalized");
const projectName = "splashapp";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users.routes");
const productRoutes = require("./routes/product.routes");
// const orderRoutes = require("./routes/order.routes");


app.use("/auth", authRoutes);
app.use("/", usersRoutes);
app.use("/product", productRoutes);
// app.use("/order", orderRoutes);

// app.use("/user",require ("./routes/user"))


app.use("/partner", require("./routes/partner.routes"))
app.use("/product", require("./routes/product.routes"))

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
// require("./error-handling")(app);

module.exports = app;
