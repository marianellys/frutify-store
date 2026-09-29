import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
}

interface ApiProduct {
  id: string | number;
  nombre: string;
  precio: string | number;
  categoria: string;
  imagen: string | null;
  descripcion: string | null;
  rating: string | number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = environment.apiUrl;

  private products: Product[] = [];

  private productsSubject = new BehaviorSubject<Product[]>(this.products);
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  /**
   * Carga el catálogo desde productos.php.
   * Si el backend no está disponible, muestra un error.
   */
  loadProducts(): void {
    this.http
      .get<{ success: boolean; productos: ApiProduct[] }>(`${this.apiUrl}/productos.php`)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.products = res.productos.map((p) => ({
              id: Number(p.id),
              name: p.nombre,
              price: Number(p.precio),
              category: p.categoria,
              image: p.imagen ?? '',
              description: p.descripcion ?? '',
              rating: Number(p.rating)
            }));
            this.productsSubject.next(this.products);
          }
        },
        error: (err) => {
          console.error('Error cargando productos:', err);
        }
      });
  }

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