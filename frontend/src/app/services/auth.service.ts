import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

interface ApiUser {
  id: number;
  nombre: string;
  email: string;
}

interface LoginResponse {
  success: boolean;
  user: ApiUser;
  token?: string;
}

interface RegisterResponse {
  success: boolean;
  user: ApiUser;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any = null;
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromStorage();
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login.php`, { email, password })
      .pipe(
        map((res) => {
          if (res.success) {
            this.currentUser = {
              id: res.user.id,
              email: res.user.email,
              name: res.user.nombre,
              token: res.token ?? 'session-token'
            };
            localStorage.setItem('user', JSON.stringify(this.currentUser));
            return true;
          }
          return false;
        })
      );
  }

  register(name: string, email: string, password: string): Observable<boolean> {
    return this.http
      .post<RegisterResponse>(`${this.apiUrl}/registro.php`, { nombre: name, email, password })
      .pipe(
        map((res) => {
          if (res.success) {
            this.currentUser = {
              id: res.user.id,
              email: res.user.email,
              name: res.user.nombre,
              token: 'session-token'
            };
            localStorage.setItem('user', JSON.stringify(this.currentUser));
            return true;
          }
          return false;
        })
      );
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }

  private loadUserFromStorage(): void {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        this.currentUser = JSON.parse(user);
      } catch {
        this.currentUser = null;
      }
    }
  }
}