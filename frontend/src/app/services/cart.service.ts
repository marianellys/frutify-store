import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

export interface CartItem {
  id: number;
  producto_id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  private readonly apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.loadCart();
  }

  private getUsuarioId(): number {
    const user = this.authService.getCurrentUser();
    return user?.id ?? 0;
  }

  loadCart(): void {
    const usuarioId = this.getUsuarioId();
    if (usuarioId <= 0) {
      this.cartItems = [];
      this.cartSubject.next(this.cartItems);
      return;
    }

    this.http
      .get<{ success: boolean; items: CartItem[] }>(`${this.apiUrl}/carrito.php?usuario_id=${usuarioId}`)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.cartItems = res.items;
            this.cartSubject.next(this.cartItems);
          }
        },
        error: (err) => {
          console.error('Error cargando carrito:', err);
          this.cartItems = [];
          this.cartSubject.next(this.cartItems);
        }
      });
  }

  addToCart(item: CartItem): void {
    const usuarioId = this.getUsuarioId();
    if (usuarioId <= 0) return;

    this.http
      .post<{ success: boolean }>(`${this.apiUrl}/carrito.php`, {
        usuario_id: usuarioId,
        producto_id: item.producto_id,
        cantidad: item.cantidad
      })
      .subscribe({
        next: () => this.loadCart(),
        error: (err) => console.error('Error agregando al carrito:', err)
      });
  }

  removeFromCart(itemId: number): void {
    const usuarioId = this.getUsuarioId();
    if (usuarioId <= 0) return;

    this.http
      .delete<{ success: boolean }>(`${this.apiUrl}/carrito.php?usuario_id=${usuarioId}&id=${itemId}`)
      .subscribe({
        next: () => this.loadCart(),
        error: (err) => console.error('Error eliminando del carrito:', err)
      });
  }

  updateQuantity(productoId: number, cantidad: number): void {
    const usuarioId = this.getUsuarioId();
    if (usuarioId <= 0) return;

    this.http
      .put<{ success: boolean }>(`${this.apiUrl}/carrito.php`, {
        usuario_id: usuarioId,
        producto_id: productoId,
        cantidad: cantidad
      })
      .subscribe({
        next: () => this.loadCart(),
        error: (err) => console.error('Error actualizando cantidad:', err)
      });
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }

  getCartCount(): number {
    return this.cartItems.reduce((count, item) => count + item.cantidad, 0);
  }

  clearCart(): void {
    const usuarioId = this.getUsuarioId();
    if (usuarioId <= 0) return;

    this.http
      .delete<{ success: boolean }>(`${this.apiUrl}/carrito.php?usuario_id=${usuarioId}`)
      .subscribe({
        next: () => this.loadCart(),
        error: (err) => console.error('Error vaciando carrito:', err)
      });
  }
}
