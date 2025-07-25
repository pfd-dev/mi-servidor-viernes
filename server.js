import { join, dirname } from "path";
import { fileURLToPath } from "url";

import express from "express";
import morgan from "morgan";

import { conectarBBDD } from "./config/db.config.js";
import { enrutadorPaginas } from "./routes/paginas.route.js";
import { enrutadorUsuarios } from "./routes/usuarios.route.js";
import { enrutadorProductos } from "./routes/productos.route.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const servidor = express();

// Middlewares
servidor.use(express.json())
servidor.use(express.urlencoded())
servidor.use(morgan("dev"))

// Views|
servidor.set("views", join(__dirname, "src/public"));
servidor.set("view engine", "ejs");
servidor.use(express.static(join(__dirname, "src/public")));

// Routes
servidor.get("/", (req, res) => {
    res.send("hola")
})

servidor.use("/pages/", enrutadorPaginas);
servidor.use("/api/usuarios/", enrutadorUsuarios);
servidor.use("/api/productos/", enrutadorProductos);

async function iniciarServidorMongoose() {
    await conectarBBDD();

    servidor.listen(4002, () => {
        console.log("servidor conectado en el puerto 4002")

        console.log("mi __dirname")
        console.log(__dirname)
    })
}

iniciarServidorMongoose();