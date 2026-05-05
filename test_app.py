import unittest
from app import app

class TestAPI(unittest.TestCase):
    def setUp(self):
        # Configuramos la app para tests
        self.app = app.test_client()
        self.app.testing = True

    def test_obtener_datos_presupuesto(self):
        # Probamos la ruta real que definiste en app.py
        response = self.app.get('/carrito/total')
        self.assertEqual(response.status_code, 200)
        # Verificamos que la respuesta contenga los items
        self.assertIn(b"items_detallados", response.data)

    def test_agregar_al_carrito(self):
        # Simulamos el envío de un JSON como lo hace el fetch
        nuevo_item = {"nombre": "Servicio de Prueba", "precio": 5000}
        response = self.app.post('/carrito', json=nuevo_item)
        self.assertEqual(response.status_code, 201)
        self.assertIn(b"Servicio de Prueba", response.data)

    def test_obtener_total(self):
        # Verificamos que el cálculo del total funcione
        response = self.app.get('/carrito/total')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"total_compra", response.data)

if __name__ == '__main__':
    unittest.main()