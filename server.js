const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

let onlineDevices = {};

app.use(express.json());

// Ruta para la raíz "/"
app.get('/', (req, res) => {
  res.send('¡Servidor conectado correctamente!');
});

// Endpoint para registrar que una laptop está en línea
app.post('/register', (req, res) => {
    const { serialNumber } = req.body;
    if (!serialNumber) {
        return res.status(400).send('Número de serie no proporcionado.');
    }
    onlineDevices[serialNumber] = { connected: false, awaitingResponse: false };
    res.send('Dispositivo registrado como en línea.');
});

// Endpoint para verificar si un dispositivo está en línea
app.post('/check', (req, res) => {
    const { serialNumber } = req.body;
    if (!serialNumber || !onlineDevices[serialNumber]) {
        return res.status(404).send('ID fuera de servicio o inválida.');
    }
    res.send('Dispositivo disponible.');
});

// Endpoint para solicitar conexión
app.post('/request', (req, res) => {
    const { serialNumber } = req.body;
    if (!serialNumber || !onlineDevices[serialNumber]) {
        return res.status(404).send('ID fuera de servicio o inválida.');
    }
    onlineDevices[serialNumber].awaitingResponse = true;
    res.send('Solicitud enviada.');
});

// Endpoint para responder a la solicitud
app.post('/response', (req, res) => {
    const { serialNumber, accept } = req.body;
    if (!serialNumber || !onlineDevices[serialNumber]) {
        return res.status(404).send('ID fuera de servicio o inválida.');
    }
    onlineDevices[serialNumber].awaitingResponse = false;
    onlineDevices[serialNumber].connected = accept;
    res.send(accept ? 'Conexión aceptada.' : 'Solicitud denegada.');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});