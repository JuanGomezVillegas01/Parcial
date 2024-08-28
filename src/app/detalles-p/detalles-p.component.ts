import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-detalles-p',
  templateUrl: './detalles-p.component.html',
  styleUrls: ['./detalles-p.component.scss'],
})
export class DetallesPComponent implements OnInit {
  producto: any;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.obtenerDetalles(id);
    });
  }

  obtenerDetalles(productoId: number) {
    this.apiService.obtenerProductoId(productoId).subscribe(
      producto => {
        this.producto = producto;
      },
      error => {
        console.error('Error al obtener el producto:', error);
      }
    );
  }

  async addCarrito() {
    if (this.producto) {
      this.apiService.addCarrito(this.producto);

      const toast = await this.toastController.create({
        message: 'Producto añadido al carrito',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    }
  }

  irCarrito() {
    this.router.navigate(['/carrito']);
  }
}
