import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private Products = 'https://fakestoreapi.com/products';
  private Category = 'https://fakestoreapi.com/products/categories';
  private CategoryId = 'https://fakestoreapi.com/products/category/';
  private ProductById = 'https://fakestoreapi.com/products/';

  private carrito: any[] = [];
  private cartSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) { }

  public obtenerProducto(): Observable<any> {
    return this.http.get<any>(this.Products);
  }

  public obtenerCategoria(): Observable<any> {
    return this.http.get<any>(this.Category);
  }

  public obtenerCategoriaId(categoriaNombre: string): Observable<any> {
    return this.http.get<any>(`${this.CategoryId}${categoriaNombre}`);
  }

  public obtenerProductoId(id: number): Observable<any> {
    return this.http.get<any>(`${this.ProductById}${id}`);
  }

  public addCarrito(producto: any) {
    const existingProduct = this.carrito.find(p => p.id === producto.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      producto.quantity = 1;
      this.carrito.push(producto);
    }
    this.cartSubject.next(this.carrito);
  }

  public obtenerCarrito(): Observable<any[]> {
    return this.cartSubject.asObservable();
  }

  public obtenerTotal(): number {
    return this.carrito.reduce((total, producto) => total + producto.quantity, 0);
  }

  public limpiarCarrito() {
    this.carrito = [];
    this.cartSubject.next(this.carrito);
  }
}
