const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Usa el puerto 3000 por defecto

app.get('/', (req, res) => {
  res.send('¡Servidor conectado correctamente!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
