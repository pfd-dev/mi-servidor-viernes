import express from "express";

import { productoModel } from "../models/productos.model.js"

const enrutadorPaginas = express.Router();


enrutadorPaginas.get("/", async (req, res) => {
    const miproductos = await productoModel.find()
    res.render('home', { productos: miproductos });
})

enrutadorPaginas.get("/dashboard", (req, res) => {
    res.render('dashboard');
})

export {
    enrutadorPaginas
}