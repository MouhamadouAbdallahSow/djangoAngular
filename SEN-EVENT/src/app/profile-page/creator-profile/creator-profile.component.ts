// creator-profile.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../authentication/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-creator-profile',
  templateUrl: './creator-profile.component.html',
  styleUrl: './creator-profile.component.css',
})
export class CreatorProfileComponent implements OnInit, OnDestroy {
  currentSlide = 0;

  user: any;
  djangoServer = 'http://localhost:8000'; // URL du serveur Django
  private userSubscription!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.showSlide(this.currentSlide);

    this.userSubscription = this.authService.user$.subscribe((data) => {
      if (data) {
        this.setUserData(data);
      } else {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          this.setUserData(JSON.parse(storedUser));
        } else {
          this.authService.loadUserData(); // Charger les données depuis le backend si rien en cache
        }
      }
    });
  }

  private setUserData(data: any): void {
    this.user = { ...data };

    // Corriger les URLs des images
    if (this.user.profile_photo?.startsWith('/media')) {
      this.user.profile_photo = this.djangoServer + this.user.profile_photo;
    }
    if (this.user.cover_photo?.startsWith('/media')) {
      this.user.cover_photo = this.djangoServer + this.user.cover_photo;
    }

    console.log('Utilisateur chargé :', this.user);
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe(); // Évite les fuites de mémoire
    }
  }
  // Méthode pour afficher un slide spécifique
  showSlide(n: number) {
    const slides = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');

    // Masquer tous les slides
    slides.forEach((slide) =>
      (slide as HTMLElement).classList.remove('active')
    );
    // Désactiver tous les points
    dots.forEach((dot) => (dot as HTMLElement).classList.remove('active'));

    // Gérer la boucle du carousel
    this.currentSlide = (n + slides.length) % slides.length;

    // Afficher le slide actif
    (slides[this.currentSlide] as HTMLElement).classList.add('active');
    // Activer le point correspondant
    (dots[this.currentSlide] as HTMLElement).classList.add('active');
  }

  // Méthodes pour les boutons précédent/suivant
  prevSlide() {
    this.showSlide(this.currentSlide - 1);
  }

  nextSlide() {
    this.showSlide(this.currentSlide + 1);
  }
}
