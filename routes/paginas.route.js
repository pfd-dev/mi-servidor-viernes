import express from "express";

const enrutadorPaginas = express.Router();


enrutadorPaginas.get("/", (req, res) => {
    res.render('home', {foo: 'FOO'});
    // res.send("hola");
})

enrutadorPaginas.get("/dashboard", (req, res) => {
    res.render('dashboard');
})

export {
    enrutadorPaginas
}