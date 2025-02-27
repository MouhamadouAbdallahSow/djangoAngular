import { Component } from '@angular/core';
import { AuthService } from './authentication/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SEN-EVENT';

  // ceci est dans le navbar
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
  // ceci est dans le navbar
}
