import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  loading: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    this.loading = true;
    this.authService.login(this.email, this.password).subscribe({
      next: (success) => {
        this.loading = false;
        if (success) {
          this.router.navigate(['/']);
        } else {
          alert('Credenciales inválidas');
        }
      },
      error: () => {
        this.loading = false;
        alert('No se pudo conectar con el servidor');
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }
}