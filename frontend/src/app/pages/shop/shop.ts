import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-shop',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop implements OnInit {
  products: Product[] = [];
  searchQuery = '';
  selectedCategory = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.products$.subscribe(products => {
      this.products = products;
    });
  }

  get categories(): string[] {
    return [...new Set(this.products.map(p => p.category))];
  }

  get filteredProducts(): Product[] {
    let result = this.products;

    if (this.selectedCategory) {
      result = result.filter(p => p.category === this.selectedCategory);
    }

    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    return result;
  }

  filterByCategory(category: string): void {
    this.selectedCategory = this.selectedCategory === category ? '' : category;
  }

  getCategoryCount(category: string): number {
    return this.products.filter(p => p.category === category).length;
  }
}
