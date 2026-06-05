const express = require('express');
const path = require('path');
const app = express();

// Middleware obligatorio para entender los datos JSON de los POST
app.use(express.json());

// 1. LE MAQUILLAMOS LA PRIORIDAD: Primero le decimos a Express dónde están los archivos físicos
app.use(express.static('public'));

// El carrito en memoria de la Oficina Técnica
let carrito = [];

// 2. EL CAMBIO SEGURO: Usamos la ruta raíz directamente apuntando al archivo sin intermediarios
app.get('/', function (req, res) {
    // Mandamos el archivo real servicios.html que está en la carpeta public
    res.sendFile(path.join(__dirname, 'public', 'servicios.html'));
});

// Ruta para agregar un servicio al presupuesto (POST)
app.post('/carrito', function (req, res) {
    const data = req.body;
    const item = {
        "id_carrito": carrito.length + 1,
        "nombre": data.nombre,
        "precio": data.precio
    };
    carrito.push(item);
    res.status(201).json(item);
});

// Ruta para ver el total y los artículos (GET)
app.get('/carrito/total', function (req, res) {
    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
        total += carrito[i].precio;
    }
    res.json({
        "total_compra": total,
        "items_detallados": carrito
    });
});

// Ruta para eliminar un servicio por su ID (DELETE)
app.delete('/carrito/:id_item', function (req, res) {
    const idBuscar = parseInt(req.params.id_item);
    let carritoFiltrado = [];
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id_carrito !== idBuscar) {
            carritoFiltrado.push(carrito[i]);
        }
    }
    carrito = carritoFiltrado;
    res.status(200).json({ "res": "ok" });
});

// Levantamos el servidor en el puerto 5000
app.listen(5000, function () {
    console.log('Servidor activo en el puerto 5000');
});