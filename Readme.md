# README

## Résolution de l'erreur `ajv` lors du démarrage du serveur Angular

Si vous rencontrez une erreur liée au fichier `ajv` lors du démarrage du serveur Angular, suivez ces étapes pour la corriger :

### 1. Supprimer le dossier `node_modules`
```powershell
Remove-Item -Recurse -Force node_modules
```

### 2. Supprimer le fichier `package-lock.json`
```powershell
Remove-Item package-lock.json
```

### 3. Réinstaller les dépendances
```powershell
npm install
```

### 4. Relancer le serveur Angular
```powershell
ng serve
```

Ces étapes permettent de résoudre les conflits liés aux dépendances et d'assurer un bon fonctionnement du projet Angular.

