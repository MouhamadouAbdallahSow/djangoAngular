import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent {
  prenom: string = '';
  nom: string = '';
  email: string = '';
  username: string = '';
  password1: string = '';
  password2: string = '';
  errorMessage: string = '';

  profilePhoto: File | null = null;
  coverPhoto: File | null = null;
  profilePhotoUrl: string | null = null;
  coverPhotoUrl: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.password1 !== this.password2) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    const name = `${this.prenom} ${this.nom}`.trim();
    const userData = {
      name: name,
      prenom: this.prenom,
      nom: this.nom,
      email: this.email,
      username: this.username,
      password: this.password1,
      userType: 'visitor',
    };

    const formData = new FormData();
    // Ajout des propriétés textuelles de userData
    for (const [key, value] of Object.entries(userData)) {
      formData.append(key, value);
    }

    // Ajout des fichiers si disponibles
    if (this.profilePhoto) {
      formData.append(
        'profile_photo',
        this.profilePhoto,
        this.profilePhoto.name
      );
    }
    if (this.coverPhoto) {
      formData.append('cover_photo', this.coverPhoto, this.coverPhoto.name);
    }
    this.authService.register(formData).subscribe({
      next: (response) => {
        console.log('Inscription réussie', response);
        this.authService.setAuthenticated(true);
        this.router.navigate(['/auth/user-type']);
      },
      error: (error) => {
        this.errorMessage = "Erreur lors de l'inscription. Veuillez réessayer.";
        console.error("Erreur lors de l'inscription :", error);
      },
    });
  }

  onFileSelected(event: any, type: string) {
    const file = event.target.files?.[0];
    if (!file) return; // Évite une erreur si aucun fichier n'est sélectionné.

    const reader = new FileReader();
    reader.onload = (e: any) => {
      if (type === 'profile') {
        this.profilePhoto = file;
        this.profilePhotoUrl = e.target.result;
      } else if (type === 'cover') {
        this.coverPhoto = file;
        this.coverPhotoUrl = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  }
}
