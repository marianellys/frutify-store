import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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

    if (this.authService.register(this.name, this.email, this.password)) {
      this.router.navigate(['/']);
    } else {
      alert('Error al registrar');
    }
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
