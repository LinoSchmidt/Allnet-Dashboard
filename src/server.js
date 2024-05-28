const token = ''
const url = ''
let org = ''
let bucket = ''

const express = require('express');
const {InfluxDB, Point} = require('@influxdata/influxdb-client')

const app = express();

const client = new InfluxDB({url, token})
let writeClient = client.getWriteApi(org, bucket, 'ns')

let sensorData = [];

app.post('/', (req, res) => {
    req.on('data', (data) => {
        const sensoren = data.toString().split('&');
        sensorData = sensoren.map(sensor => {
            const [name, value] = sensor.split('=');
            return {
                name,
                value
            };
        });
        
        sensorData.forEach(sensor => {
            const point = new Point(sensor.name).floatField('value', parseFloat(sensor.value));
            writeClient.writePoint(point);
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});