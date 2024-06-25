# Benutze das offizielle Node.js-Image als Basis
FROM node:alpine

# Setze das Arbeitsverzeichnis im Container
WORKDIR /usr/src/app

# Kopiere die Dateien in das Arbeitsverzeichnis
COPY package*.json ./
COPY ./src .

# Installiere die Abhängigkeiten
RUN npm install

# Öffne den Port 3000
EXPOSE 3000

# Starte die Anwendung
CMD ["node", "server.js"]