# SENEVENT

Bienvenue dans le projet **SENEVENT** ! Ce projet a été généré à l'aide de [Angular CLI](https://github.com/angular/angular-cli) version 18.2.9. Ce document explique comment collaborer efficacement, structurer votre travail, et utiliser GitHub pour enregistrer vos modifications.

---

## **Modules du projet**
Le projet est organisé en plusieurs modules situés dans le répertoire `src/app/` :

1. **homepage & events** : Responsable : *Soukeyna* (inclut la page des événements).
2. **authentification** : Responsable : *Abdoulaye Sow*.
3. **create-event** : Responsable : *Fa Syaka Diouf*.
4. **page-evenement** : Responsable : *Fa Syaka Diouf*.
5. **profile-page** : Responsable : *Nazar*.

Chaque module est indépendant, mais vous pouvez utiliser les composants des autres modules en suivant les étapes décrites ci-dessous.

---

## **Démarrage du projet**

### **Lancer le serveur de développement**
1. Assurez-vous d'avoir installé Node.js et Angular CLI.
2. Ouvrez un terminal dans le répertoire du projet.
3. Exécutez la commande suivante :
   ```bash
   ng serve
   ```
4. Rendez-vous sur `http://localhost:4200/` dans votre navigateur.

Le serveur se rechargera automatiquement si vous modifiez un fichier source.

---

## **Ajouter un nouveau composant à un module**
Pour ajouter un nouveau composant dans un module spécifique, utilisez la commande suivante :

```bash
ng generate component <nom-du-module>/<nom-du-composant>
```

### **Exemple**
Pour ajouter un composant `login` dans le module `authentification` :
```bash
ng generate component authentification/login
```

Cette commande :
- Crée un nouveau composant dans `src/app/authentification/`.
- Ajoute automatiquement ce composant au tableau `declarations` dans `authentification.module.ts`.

---

## **Importer un composant d'un autre module**
Pour utiliser un composant se trouvant dans un autre module :

1. **Exporter le composant dans le module source**
   Dans le fichier `nom-du-module-source.module.ts`, ajoutez le composant au tableau `exports` :
   ```typescript
   @NgModule({
     declarations: [NomDuComposant],
     exports: [NomDuComposant]
   })
   export class NomDuModuleSource {}
   ```

2. **Importer le module source dans le module cible**
   Dans le fichier `nom-du-module-cible.module.ts`, ajoutez le module source au tableau `imports` :
   ```typescript
   import { NomDuModuleSource } from '../chemin-vers-le-module-source';

   @NgModule({
     imports: [NomDuModuleSource]
   })
   export class NomDuModuleCible {}
   ```

3. **Utiliser le composant dans un template HTML**
   Vous pouvez maintenant utiliser le composant dans un fichier HTML :
   ```html
   <app-nom-du-composant></app-nom-du-composant>
   
---
## **Configuration du Routage dans Angular**

Dans Angular, le routage permet de naviguer entre différentes vues ou pages de votre application. Pour cela, vous devez configurer les routes dans un module dédié.

Dans le fichier `app-routing.module.ts`, vous allez :

- Importer les composants associés aux routes.
- Configurer les routes en utilisant un tableau `Routes` qui mappe les chemins aux composants correspondants.

Exemple :

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },  // Route par défaut
  { path: 'about', component: AboutComponent }  // Route vers la page "About"
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Enregistrement des routes
  exports: [RouterModule]  // Exportation pour pouvoir les utiliser ailleurs
})
export class AppRoutingModule { }
```

---
## **Collaborer avec GitHub**
Pour que tout le monde puisse synchroniser et partager son travail, suivez ces étapes :

### **1. Initialiser et configurer GitHub (si ce nest pas fait)**
Assurez-vous d'avoir configuré votre projet local avec le dépôt GitHub :
```bash
git init
git remote add origin <url-du-dépôt-github>
```

### **2. Enregistrer vos modifications locales**
1. Ajoutez vos modifications :
   ```bash
   git add .
   ```
2. Validez vos changements avec un message descriptif :
   ```bash
   git commit -m "Description des modifications"
   ```

### **3. Synchroniser vos modifications avec GitHub**
Envoyez vos changements vers le dépôt distant :
```bash
git push origin main
```

### **4. Récupérer les modifications des autres**
Avant de commencer à travailler, assurez-vous d'avoir la dernière version du projet :
```bash
git pull origin main
```

---

## **Exemple : Ajouter un composant et partager les modifications sur GitHub**
### **Étapes**
1. Créez votre composant dans votre module (par exemple, `pages-profil/profile`).
   ```bash
   ng generate component pages-profil/profile
   ```

2. Ajoutez les fichiers modifiés à Git :
   ```bash
   git add .
   ```

3. Validez vos modifications :
   ```bash
   git commit -m "Ajout du composant Profile dans pages-profil"
   ```

4. Envoyez vos changements vers GitHub :
   ```bash
   git push origin main
   ```

5. Demandez aux autres de récupérer vos modifications :
   ```bash
   git pull origin main
   ```

---

## **Obtenir de l'aide supplémentaire**
Pour toute question ou problème concernant Angular CLI, utilisez :
```bash
ng help
```
Ou consultez la documentation officielle : [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).

---

### Merci de respecter cette structure pour un travail collaboratif fluide. 🚀
