import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  agreeTerms: boolean = false;
  loading: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (!this.agreeTerms) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }

    this.loading = true;
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: (success) => {
        this.loading = false;
        if (success) {
          this.router.navigate(['/']);
        } else {
          alert('Error al registrar');
        }
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        const message =
          err.status === 409
            ? 'El email ya está registrado'
            : 'No se pudo conectar con el servidor';
        alert(message);
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}