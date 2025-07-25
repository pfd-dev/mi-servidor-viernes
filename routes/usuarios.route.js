import express from "express";
import { usuarioModel } from "../models/usuario.model.js";

const enrutadorUsuarios = express.Router();

enrutadorUsuarios.get("/", async (req, res) => {
    try {
        const resultado = await usuarioModel.find()

        res.status(201).json(resultado)
    } catch (error) {
        res.status(500).send("error")
    }
})

enrutadorUsuarios.get("/:identificacion", async (req, res) => {
    try {
        console.log(req.params.identificacion)
        const resultado = await usuarioModel.findById(req.params.identificacion)

        res.status(201).json(resultado)
    } catch (error) {
        res.status(500).send("error")
    }
})

enrutadorUsuarios.post("/", async (req, res) => {
    try {
        const { nombre, contrasenia, email } = req.body;

        const usuarioNuevo = new usuarioModel({
            name: nombre,
            email: email,
            password: contrasenia
        })

        const resultado = await usuarioNuevo.save()

        res.status(201).json(resultado)
    } catch (error) {
        res.status(500).send("error")
    }
})

enrutadorUsuarios.delete("/:identificador", async (req, res) => {
    try {
        console.log(req.params.identificador)

        const productoEncontrado = await usuarioModel.findById(req.params.identificador);

        if (!productoEncontrado) {
            res.status(404).send("producto no encontrado")
        }

        const resultado = await usuarioModel.findByIdAndDelete(req.params.identificador);

        console.log(resultado)

        res.status(201).json(resultado)
    } catch (error) {
        res.status(500).send("error")
    }
})

enrutadorUsuarios.put("/:identificador", async (req, res) => {
    try {
        console.log(req.params.identificador)

        const { nombre, contrasenia, email } = req.body;

        const productoEncontrado = await usuarioModel.findById(req.params.identificador);

        if (!productoEncontrado) {
            res.status(404).send("producto no encontrado")
        }

        const resultado = await usuarioModel.findByIdAndUpdate(
            req.params.identificador,
            {
                name: nombre,
                email: email,
                password: contrasenia
            }
        );

        res.status(201).json(resultado)
    } catch (error) {
        res.status(500).send("error")
    }
})

export {
    enrutadorUsuarios
}