const express = require('express');
const AuthController = require('./controllers/AuthController');
const AdminController = require("./controllers/AdminController");
const authenticateMiddleware = require("./middlewares/authenticate");
const Categoria = require("../controller/Categoria");
const productRoutes = require("./controllers/productRoutes");

const app = express();

app.use(express.json());

app.use("/auth", AuthController);
app.use("/Admin", authenticateMiddleware ,AdminController);


app.listen(6000, () => {
    console.log('mongodb iniciado');
})