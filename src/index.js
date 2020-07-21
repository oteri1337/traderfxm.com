// App
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares
const session = require("express-session");
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 },
  })
);

const fileUpload = require("express-fileupload");
app.use(fileUpload());

// Routes
const RatesRouter = require("./routers/RatesRouter");
const TransactionsRouter = require("./routers/TransactionsRouter");

const ProductsRouter = require("./routers/ProductsRouter");
const OrdersRouter = require("./routers/OrdersRouter");
const GroupsRouter = require("./routers/GroupsRouter");

const UsersRouter = require("./routers/UsersRouter");
const AdminsRouter = require("./routers/AdminsRouter");

app.use("/api", RatesRouter);
app.use("/api", TransactionsRouter);

app.use("/api", ProductsRouter);
app.use("/api", OrdersRouter);
app.use("/api", GroupsRouter);

app.use("/api", UsersRouter);
app.use("/api", AdminsRouter);

const path = require("path");
const publicPath = path.resolve(__dirname, "../public_html/");

app.use(express.static(publicPath));
app.set("view engine", "ejs");
app.set("views", publicPath);

app.get("/sw.js", (request, response) => {
  return response.sendFile(publicPath, "sw.js");
});

app.get("*", (request, response) => {
  return response.render("index.ejs");
});

app.listen(process.env.PORT || 1027, () => {
  console.log("server running");
});
