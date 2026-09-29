import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private productService = inject(ProductService);

  featuredProducts: Product[] = [];

  ngOnInit(): void {
    this.productService.products$.subscribe(products => {
      this.featuredProducts = products.slice(0, 4);
    });
  }

  goToShop() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/shop']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}
