from flask import Flask, jsonify, request, render_template

app = Flask(__name__)

# Persistencia en memoria (visto en 03-flask.ipynb)
carrito = []

@app.route('/')
def index():
    # Sirve el archivo desde la carpeta /templates
    return render_template('servicios.html')

@app.route('/carrito', methods=['POST'])
def agregar():
    # Captura el JSON enviado por el fetch (visto en 02-request y 03-flask)
    data = request.get_json()
    item = {
        "id_carrito": len(carrito) + 1,
        "nombre": data['nombre'],
        "precio": data['precio']
    }
    carrito.append(item)
    return jsonify(item), 201

@app.route('/carrito/total', methods=['GET'])
def obtener_datos():
    # Calcula el total y devuelve la lista para la tabla (visto en 05-fetch)
    total = sum(item['precio'] for item in carrito)
    return jsonify({
        "total_compra": total,
        "items_detallados": carrito
    })

@app.route('/carrito/<int:id_item>', methods=['DELETE'])
def eliminar(id_item):
    # Uso de parámetros de ruta (visto en 03-flask)
    global carrito
    carrito = [i for i in carrito if i['id_carrito'] != id_item]
    return jsonify({"res": "ok"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)