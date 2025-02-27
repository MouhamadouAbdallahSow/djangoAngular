// user-type.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.css']
})
export class UserTypeComponent {
  profileType: string = '';
  
  constructor(private router: Router, private authService: AuthService) {}

  onSubmit(): void {
    if (!this.profileType) {
      alert("Veuillez sélectionner un type de compte.");
      return;
    }

    // Récupérer l'utilisateur actuel
    this.authService.user$.subscribe(user => {
      if (user && user.id) {
        // Mettre à jour le type d'utilisateur
        this.authService.updateUserType(user.id, this.profileType).subscribe({
          next: (response) => {
            this.authService.setUserType(this.profileType);
            // Rediriger vers la page appropriée
            this.router.navigate([`/profile/${this.profileType}`]);
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour du type utilisateur:', error);
            alert("Une erreur s'est produite. Veuillez réessayer.");
          }
        });
      }
    });
  }
}
