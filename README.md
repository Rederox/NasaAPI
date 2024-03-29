
# NasaAPI

## Aperçu
NasaAPI est un projet open-source conçu pour interagir avec les API publiques de la NASA, offrant aux utilisateurs un accès facile à une large gamme de données liées à l'espace. Ce projet vise à simplifier le processus de récupération et d'utilisation des données de la NASA, incluant les images, les informations planétaires, et d'autres phénomènes spatiaux. Développé en Node.js et TypeScript, ce projet intègre également Swagger pour une documentation interactive de l'API.

## Fonctionnalités
- **Intégration Facile** : Accès simplifié aux API de la NASA avec une configuration minimale.
- **Accès Complet aux Données** : Récupérez des images, des détails planétaires, des informations sur les astéroïdes, etc.
- **Documentation Swagger** : Accédez à une documentation interactive pour explorer facilement les routes disponibles.

## Mise en Route

### Prérequis
- Node.js
- TypeScript
- Une clé API de la NASA (obtenable sur le [portail API de la NASA](https://api.nasa.gov))

### Installation
1. Clonez le dépôt :
   ```
   git clone https://github.com/Rederox/NasaAPI.git
   ```
2. Naviguez vers le répertoire du projet :
   ```
   cd NasaAPI
   ```
3. Installez les dépendances requises :
   ```
   npm install
   ```

### Configuration
Copiez le fichier `.env.Example` fourni dans le répertoire racine, renommez-le en `.env`, et configurez les variables d'environnement suivantes selon vos besoins :
```
PORT=Port souhaité pour votre api
API_KEY=Clé de l'api de NASA
```

### Obtenir une Clé API de la NASA
Pour utiliser le projet NasaAPI, vous aurez besoin d'une clé API de la NASA. Suivez les instructions sur le [portail API de la NASA](https://api.nasa.gov) pour obtenir votre clé.

## Exécution

Pour lancer l'API NasaAPI, utilisez les commandes suivantes :

### Démarrer le serveur
Pour démarrer le serveur, exécutez :
```
npm start
```
Cette commande lance le serveur en utilisant `ts-node` sur le fichier `server.ts`.

### Mode développement
Pour lancer le serveur en mode développement avec rechargement automatique, utilisez :
```
npm run watch
```
Cette commande utilise `nodemon` avec `ts-node` pour exécuter `server.ts`, permettant au serveur de redémarrer automatiquement à chaque modification du code.


## Routes Disponibles
- **APOD (Astronomy Picture of the Day)**
  - Aujourd'hui : `/apod` - Récupère l'APOD du jour.
  - Par Date : `/apod/YYYY-MM-DD` - Récupère l'APOD pour une date spécifique.
  - Par Nombre : `/apod/count/3` - Récupère un nombre spécifique d'APOD aléatoires (exemple 3).
- **Images**
  - Recherche : `/images/asteroide` - Récupère les images correspondant à la recherche.
- **NEO (Near Earth Object)**
  - Aujourd'hui : `/neo` - Récupère les NEO du jour.
  - Par Période : `/neo/YYYY-MM-DD/YYYY-MM-DD` - Récupère les NEO pour une période spécifique.
- **Documentation Swagger** : `/swagger-docs` - Accédez à la documentation interactive de l'API.
