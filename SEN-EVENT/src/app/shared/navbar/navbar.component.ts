import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../authentication/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  scrolled = false; // Variable pour détecter le scroll

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const triggerHeight = window.innerHeight * 0.8; // 120vh

    this.scrolled = scrollPosition > triggerHeight;
  }
  isAuthenticated = false;
  user: any = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.isAuthenticated.subscribe((status) => {
      this.isAuthenticated = status;
    });

    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
