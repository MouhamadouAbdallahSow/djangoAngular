// creator-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/services/auth.service';

@Component({
  selector: 'app-creator-profile',
  templateUrl: './creator-profile.component.html',
  styleUrl: './creator-profile.component.css'
})
export class CreatorProfileComponent implements OnInit {
  currentSlide = 0;
  user: any;
  djangoServer = 'http://localhost:8000'; // URL de votre serveur Django
  
  constructor(private authService: AuthService) {}
  
  ngOnInit(): void {
    // Le code s'exécutera après le chargement du composant
    this.showSlide(this.currentSlide);
    this.authService.user$.subscribe(data => {
      if (data) {
        // Créer une copie pour ne pas modifier l'original
        this.user = {...data};
        
        // Corriger les URLs des images
        if (this.user.profile_photo && this.user.profile_photo.startsWith('/media')) {
          this.user.profile_photo = this.djangoServer + this.user.profile_photo;
        }
        if (this.user.cover_photo && this.user.cover_photo.startsWith('/media')) {
          this.user.cover_photo = this.djangoServer + this.user.cover_photo;
        }
        
        console.log("URLs corrigées:", this.user.profile_photo, this.user.cover_photo);
      } else {
        // Récupérer depuis localStorage comme avant
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          this.user = JSON.parse(storedUser);
          // Appliquer aussi les corrections aux données du localStorage
          if (this.user.profile_photo && this.user.profile_photo.startsWith('/media')) {
            this.user.profile_photo = this.djangoServer + this.user.profile_photo;
          }
          if (this.user.cover_photo && this.user.cover_photo.startsWith('/media')) {
            this.user.cover_photo = this.djangoServer + this.user.cover_photo;
          }
        }
      }
    });
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