// se-connecter.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-se-connecter',
  templateUrl: './se-connecter.component.html',
  styleUrls: ['./se-connecter.component.css']
})
export class SeConnecterComponent {
  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.isLoading) return;
    this.isLoading = true;
    
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.isLoading = false;
        const userType = this.authService.getUserType();
        if (userType === 'creator') {
          this.router.navigate(['/profile/creator']);
        } else if (userType === 'visitor') {
          this.router.navigate(['/profile/visitor']);
        }
      },
      error: err => {
        this.errorMessage = 'Identifiants incorrects';
        this.isLoading = false;
      }
    });
  }
}
