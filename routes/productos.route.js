import express from "express";
import { productoModel } from "../models/productos.model.js";

const enrutadorProductos = express.Router();

enrutadorProductos.get("/", async (req, res) => {
    try {
        const resultado = await productoModel.find()

        res.status(201).json(resultado)
    } catch (error) {
        res.status(500).send("error")
    }
})

enrutadorProductos.get("/:identificacion", async (req, res) => {
    try {
        console.log(req.params.identificacion)
        const resultado = await productoModel.findById(req.params.identificacion)

        res.status(201).json(resultado)
    } catch (error) {
        res.status(500).send("error")
    }
})

enrutadorProductos.post("/", async (req, res) => {
    try {
        const { nombre, cantidad, precio } = req.body;

        const usuarioNuevo = new productoModel({
            name: nombre,
            precio: precio,
            cantidad: cantidad
        })

        const resultado = await usuarioNuevo.save()

        res.status(201).json(resultado)
    } catch (error) {
        res.status(500).send("error")
    }
})

enrutadorProductos.delete("/:identificador", async (req, res) => {
    try {
        console.log(req.params.identificador)

        const productoEncontrado = await productoModel.findById(req.params.identificador);

        if (!productoEncontrado) {
            res.status(404).send("producto no encontrado")
        }

        const resultado = await productoModel.findByIdAndDelete(req.params.identificador);

        console.log(resultado)

        res.status(201).json(resultado)
    } catch (error) {
        res.status(500).send("error")
    }
})


enrutadorProductos.put("/:identificador", async (req, res) => {
    try {
        console.log(req.params.identificador)

        const { nombre, precio, cantidad } = req.body;

        const productoEncontrado = await productoModel.findById(req.params.identificador);

        if (!productoEncontrado) {
            res.status(404).send("producto no encontrado")
        }

        const resultado = await productoModel.findByIdAndUpdate(
            req.params.identificador,
            {
                name: nombre,
                cantidad: cantidad,
                precio: precio
            }
        );

        res.status(201).json(resultado)
    } catch (error) {
        res.status(500).send("error")
    }
})

export {
    enrutadorProductos
}