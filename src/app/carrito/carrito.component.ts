import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  carritoItems: any[] = [];
  total: number = 0;

  constructor(private apiService: ApiService, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
    this.cargarCarrito();
  }

  cargarCarrito() {
    this.apiService.obtenerCarrito().subscribe(carrito => {
      this.carritoItems = carrito;
      this.calcularTotal();
    });
  }

  calcularTotal() {
    this.total = this.carritoItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  async quitarItem(item: any) {
    const index = this.carritoItems.findIndex(p => p.id === item.id);

    if (index > -1) {
      this.carritoItems.splice(index, 1);
      this.apiService.limpiarCarrito();
      this.carritoItems.forEach(producto => this.apiService.addCarrito(producto));
      this.calcularTotal();
    }

    const toast = await this.toastController.create({
      message: 'Producto eliminado del carrito',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async pagar() {
    const toast = await this.toastController.create({
      message: 'Pago exitoso!',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  limpiarCarrito() {
    this.apiService.limpiarCarrito();
    this.carritoItems = [];
    this.total = 0;
  }

  irHome() {
    this.router.navigate(['/home']);
  }
}
