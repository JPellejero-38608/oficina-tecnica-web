const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

app.use(express.static('public'));

// carrito 
let carrito = [];

app.get('/', function (req, res) {
    //  servicios.html  public
    res.sendFile(path.join(__dirname, 'public', 'servicios.html'));
});

//  agregar un servicio 
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

// eliminar 
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

// servidor 
app.listen(5000, function () {
    console.log('Servidor activo en el puerto 5000');
});
