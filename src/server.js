// Lade die Umgebungsvariablen aus dem docker-compose.yml File
const token = process.env.INFLUXDB_TOKEN
const url = process.env.INFLUXDB_URL
const org = process.env.INFLUXDB_ORG
const bucket = process.env.INFLUXDB_BUCKET

// Importiere die benötigten Module
const express = require('express');
const {InfluxDB, Point} = require('@influxdata/influxdb-client')

// Erstelle eine Instanz von Express (Webserver)
const app = express();

// Erstelle eine Instanz von InfluxDB (Datenbank)
const client = new InfluxDB({url, token})
let writeClient = client.getWriteApi(org, bucket, 'ns')

// Erstelle eine Variable, um die Sensordaten zu speichern
let sensorData = [];

// Erstelle eine Route, um die Sensordaten zu empfangen
app.post('/', (req, res) => {
    req.on('data', (data) => {
        // Teile die Daten in einzelne Sensoren auf und speichere sie in der Variable sensorData
        const sensoren = data.toString().split('&');
        sensorData = sensoren.map(sensor => {
            const [name, value] = sensor.split('=');
            return {
                name,
                value
            };
        });
        
        // Schreibe die Sensordaten in die InfluxDB
        sensorData.forEach(sensor => {
            const point = new Point(sensor.name).floatField('value', parseFloat(sensor.value));
            writeClient.writePoint(point);
        });
        
        console.log("Data written to InfluxDB");
    });
});

// Starte den Webserver auf Port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});