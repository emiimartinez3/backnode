const express = require('express');
const app = express();
const Contenedor = require('./index');
const productos = new Contenedor('productos.txt');

const PORT = process.env.PORT || 8080

const producto1 = {
    name: "batman",
    price: "1450",
    id: 1
}

const producto2 = {
    name: "shingeki no kioyin",
    price: "2900",
    id: 2
}

const producto3 = {
    name: "the walking dead",
    price: "1500",
    id: 3
}

const prodCont = async () => {
    await productos.save(producto1)
    await productos.save(producto2)
    await productos.save(producto3)
}

prodCont()

const getProducto = async () => {
    let listaProductos = JSON.stringify(await productos.getAll());
    return listaProductos;
}


const getProdRandom = async () => {
    let prodLength = await productos.getId()
    let random = Math.floor(Math.random() * prodLength)
    let productRandom = await productos.getAll();
    console.log(prodLength, random, productRandom)
    return JSON.stringify(productRandom[random]);
}


app.get('/', (req, res) => {
    res.send(`Holis!!!`)
})


app.get('/productos',async (req, res) => {
    res.send(`Lista de productos: ${await getProducto()}`);
})

app.get('/productoRandom',async (req, res) => {
    res.send(`El producto es: ${await getProdRandom()}`)
})

const server = app.listen(PORT, () => {
   console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

