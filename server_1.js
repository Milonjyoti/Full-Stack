const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

setInterval(() => {
    const sensorData = {
        temperature: (Math.random() * 30).toFixed(2),
        humidity: (Math.random() * 100).toFixed(2),
        pressure: (Math.random() * 50 + 950).toFixed(2),
        co2: (Math.random() * 1000 + 300).toFixed(2),
        motion: Math.random() > 0.5 ? 1 : 0,
    };

    io.emit("sensorData", sensorData);

    if (sensorData.temperature > 25) {
        io.emit("alert", `Warning: High temperature detected! ${sensorData.temperature}°C`);
    }
}, 2000);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
