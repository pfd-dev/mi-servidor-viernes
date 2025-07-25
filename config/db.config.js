import mongoose from "mongoose";
const nombreBD = "miBBDD";
const urlDataBase = `mongodb+srv://pablo:pablo1234@micluster0.2da9ncw.mongodb.net/${nombreBD}?retryWrites=true&w=majority&appName=MiCluster0`;


async function conectarBBDD() {
    try {
        await mongoose.connect(urlDataBase);
        console.log("Conectado a MongoDB con Mongoose");
    } catch (error) {
        console.log("Error en la conexion con Mongoose")
    }
}

export {
    conectarBBDD
}