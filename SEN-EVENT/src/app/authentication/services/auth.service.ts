// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/apiUsers';
  private tokenKey = 'jwt';
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  private userType: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    const token = this.getToken();
    if (token) {
      this.authStatus.next(true);
      this.loadUserData();
    }
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  get isAuthenticated(): Observable<boolean> {
    return this.authStatus.asObservable();
  }
  loadUserData() {
    this.getUserData().subscribe(
      (userData) => {
        this.userSubject.next(userData);
        this.userType = userData.userType;
      },
      (error) => {
        this.logout(); // Déconnecte si le token est invalide
      }
    );
  }

  setAuthenticated(status: boolean): void {
    this.authStatus.next(status);
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login/`, { email, password })
      .pipe(
        tap((response) => {
          console.log('Réponse login:', response); // Pour voir la réponse complète
          localStorage.setItem(this.tokenKey, response.jwt);
          this.authStatus.next(true);
        }),
        switchMap(() => this.getUserData()),
        tap((userData) => {
          console.log('Données utilisateur:', userData); // Pour voir les données utilisateur
          localStorage.setItem('user', JSON.stringify(userData));
          this.userSubject.next(userData);
          if (userData && userData.userType) {
            this.userType = userData.userType;
          } else {
            this.userType = 'visitor';
          }
        })
      );
  }

  register(userData: any): Observable<any> {
    userData.userType = this.userType ?? 'visitor';
    return this.http.post(`${this.apiUrl}/register/`, userData).pipe(
      tap((response) => {
        this.userSubject.next(response);
      })
    );
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout/`, {}).subscribe(() => {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem('userType');
      this.authStatus.next(false);
      this.userSubject.next(null);
      this.router.navigate(['/auth/se-connecter']);
    });
  }
  getUser(): any {
    const user = this.userSubject.getValue();
    if (user) {
      return user;
    }

    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  getUserData(): Observable<any> {
    const token = this.getToken();
    return this.http.get(`${this.apiUrl}/user/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setUserType(type: string): void {
    this.userType = type;
    localStorage.setItem('userType', type);
  }

  getUserType(): string | null {
    return this.userType;
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  // méthode pour mettre à jour le userType
  updateUserType(userId: number, userType: string): Observable<any> {
    return this.http
      .patch(`${this.apiUrl}/update-user-type/`, {
        userId,
        userType,
      })
      .pipe(
        tap((response) => {
          this.userType = userType;
          this.userSubject.next(response);
        })
      );
  }
}
