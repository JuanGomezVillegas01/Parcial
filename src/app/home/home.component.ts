import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  producto: any[] = [];
  categoria: any[] = [];
  filtrarProdu: any[] = [];
  nombreCategoria: string | null = null;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.Categoria();
    this.Productos();
  }

  Productos(categoriaNombre?: string) {
    if (categoriaNombre) {
      this.apiService.obtenerCategoriaId(categoriaNombre).subscribe(
        (productos) => {
          this.producto = productos;
          this.filtrar();
          console.log('Productos:', this.producto);
        },
        (error) => {
          console.error('Error al obtener productos por categoría:', error);
        }
      );
    } else {
      this.apiService.obtenerProducto().subscribe(
        (productos) => {
          this.producto = productos;
          this.filtrar();
          console.log('Productos:', this.producto);
        },
        (error) => {
          console.error('Error al obtener productos:', error);
        }
      );
    }
  }

  Categoria() {
    this.apiService.obtenerCategoria().subscribe(
      (categorias) => {
        this.categoria = categorias;
        console.log('Categorias:', this.categoria);
      },
      (error) => {
        console.error('Error en categoria:', error);
      }
    );
  }

  onCategoryChange(categoriaNombre: string) {
    this.nombreCategoria = categoriaNombre;
    this.Productos(categoriaNombre);
  }

  filtrar() {
    if (this.nombreCategoria === null) {
      this.filtrarProdu = this.producto;
    } else {
      this.filtrarProdu = this.producto.filter((producto) => producto.categoriaNombre === this.nombreCategoria);
    }
  }

  irDetalles(productoId: number) {
    this.router.navigate(['/detalles-p', productoId]);
  }

  irCarrito() {
    this.router.navigate(['/carrito']);
  }
}
