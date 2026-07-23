import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any = null;

  constructor(private router: Router) {
    this.loadUserFromStorage();
  }

  login(email: string, password: string): boolean {
    // Simulación de login - en producción esto iría a un backend
    if (email && password) {
      this.currentUser = {
        email: email,
        name: email.split('@')[0],
        token: 'mock-token-' + Date.now()
      };
      localStorage.setItem('user', JSON.stringify(this.currentUser));
      return true;
    }
    return false;
  }

  register(name: string, email: string, password: string): boolean {
    // Simulación de registro - en producción esto iría a un backend
    if (name && email && password) {
      this.currentUser = {
        email: email,
        name: name,
        token: 'mock-token-' + Date.now()
      };
      localStorage.setItem('user', JSON.stringify(this.currentUser));
      return true;
    }
    return false;
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
      this.currentUser = JSON.parse(user);
    }
  }
}
