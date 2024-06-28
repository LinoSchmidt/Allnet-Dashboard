# Allnet Dashboard

Allnet Grafana Dashboard mit InfluxDB als Datenbank.

## Einrichtung

- Projekt clonen/[herunterladen]("https://github.com/LinoSchmidt/Allnet-Dashboard/archive/refs/heads/main.zip")
- `.env.example` in `.env` umbenennen und mit gewünschten Daten befüllen
  - `INFLUXDB_TOKEN` mit einem zufällig generierten Passwort befüllen
- im Ordner per Terminal Ausführen: `docker-compose up -d`

### Allnet Gerät

- Allnet Gerät mit dem Netzwerk verbinden
- IP-Adresse des Geräts herausfinden und die Web-Oberfläche öffnen
- Das Modul `POST/GET` aktivieren
- Einstellungen des Moduls öffnen
  - Adresse: `http://<server-ip>:8086`
  - Protokoll: `http`
  - Send Method: `POST`
  - Auszuwertende Sensoren auswählen

## Zugriff

### Grafana (Dashboard)

Das Dashboard ist unter `http://<server-ip>:3000` erreichbar.

Falls Anderungen an Grafana vorgenommen werden sollen, kann dies durch das Login mit dem Benutzer `admin` und dem Passwort aus der `.env` Datei getan werden.

Neue Dashboards können über Grafana erstellt werden und dann in den `grafana-provisioning/dashboards` Ordner gespeichert werden.

### InfluxDB (Datenbank)

Die InfluxDB ist unter `http://<server-ip>:8086` erreichbar.

Logindaten werden in der `.env` Datei festgelegt.
