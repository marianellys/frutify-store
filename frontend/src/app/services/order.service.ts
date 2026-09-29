import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface OrderItemPayload {
  producto_id: number;
  cantidad: number;
  precio: number;
}

export interface OrderPayload {
  usuario_id: number;
  direccion: string;
  ciudad: string;
  telefono: string;
  metodo_pago: string;
  total: number;
  items: OrderItemPayload[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * GET /pedidos.php?usuario_id=X -> historial de pedidos del usuario
   */
  getOrders(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/pedidos.php`, {
      params: { usuario_id: String(usuarioId) }
    });
  }

  /**
   * POST /pedidos.php -> crea un pedido con sus detalles
   */
  createOrder(order: OrderPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/pedidos.php`, order);
  }

  /**
   * GET /detalle_pedido.php?pedido_id=X -> ítems de un pedido
   */
  getOrderDetails(pedidoId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/detalle_pedido.php`, {
      params: { pedido_id: String(pedidoId) }
    });
  }
}