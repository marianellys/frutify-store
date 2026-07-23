import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Manzana Roja',
      price: 2.99,
      category: 'frutas',
      image: 'assets/images/products/apple.jpg',
      description: 'Manzanas frescas y crujientes, perfectas para cualquier momento del día.',
      rating: 4.5
    },
    {
      id: 2,
      name: 'Plátano',
      price: 1.99,
      category: 'frutas',
      image: 'assets/images/products/banana.jpg',
      description: 'Plátanos maduros y dulces, ricos en potasio.',
      rating: 4.8
    },
    {
      id: 3,
      name: 'Naranja',
      price: 3.49,
      category: 'frutas',
      image: 'assets/images/products/orange.jpg',
      description: 'Naranjas jugosas y llenas de vitamina C.',
      rating: 4.6
    },
    {
      id: 4,
      name: 'Zanahoria',
      price: 1.49,
      category: 'vegetales',
      image: 'assets/images/products/carrot.jpg',
      description: 'Zanahorias frescas y crujientes, ideales para ensaladas.',
      rating: 4.3
    },
    {
      id: 5,
      name: 'Tomate',
      price: 2.29,
      category: 'vegetales',
      image: 'assets/images/products/tomato.jpg',
      description: 'Tomates rojos y jugosos, perfectos para cocinar.',
      rating: 4.4
    },
    {
      id: 6,
      name: 'Lechuga',
      price: 1.99,
      category: 'vegetales',
      image: 'assets/images/products/lettuce.jpg',
      description: 'Lechuga fresca y crujiente, ideal para ensaladas.',
      rating: 4.2
    }
  ];

  private productsSubject = new BehaviorSubject<Product[]>(this.products);
  products$ = this.productsSubject.asObservable();

  constructor() {}

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  getProductsByCategory(category: string): Product[] {
    return this.products.filter(product => product.category === category);
  }

  searchProducts(query: string): Product[] {
    const lowerQuery = query.toLowerCase();
    return this.products.filter(product => 
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery)
    );
  }
}
