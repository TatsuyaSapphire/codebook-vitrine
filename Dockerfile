# Utiliser une image Node.js officielle comme image de base
FROM node:16

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copier le package.json et le package-lock.json dans le conteneur
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code de l'application dans le conteneur
COPY . .

# Exposer le port que l'application va utiliser (par défaut, Vue utilise le port 3000)
EXPOSE 5173

# Démarrer l'application en mode développement
CMD ["npm", "run", "dev"]