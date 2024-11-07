import { Component } from '@angular/core';
import { CarritoService } from '../../service/carrito.service';
import { Carrito } from '../../model/carrito';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SidebarComponent } from "../../../sidebar/component/sidebar/sidebar.component";

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ToastModule,
    FormsModule,
    ProgressSpinnerModule,
    SidebarComponent
],
  providers: [MessageService, ConfirmationService],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  carrito = new Carrito();
  carritos: Carrito[] = [];
  titulo: string = '';
  opc: string = '';
  op: number = 0;
  visible: boolean = false;
  isDeleteInProgress: boolean = false;
  cargando: boolean = false;

  constructor(
    private carritoService: CarritoService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.cargando = true;
    this.listarCarritos();
  }

  listarCarritos() {
    this.carritoService.getCarrito().subscribe({
      next: (data) => {
        this.carritos = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la lista de carritos'
        });
      }
    });
  }

  showDialogCreate() {
    this.titulo = 'Crear Carrito';
    this.opc = 'Agregar';
    this.op = 0;
    this.carrito = new Carrito();
    this.visible = true;
  }

  showDialogEdit(id: number) {
    this.titulo = 'Editar Carrito';
    this.opc = 'Editar';
    this.op = 1;
    this.carritoService.getCarritoById(id).subscribe({
      next: (data) => {
        this.carrito = data;
        this.visible = true;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar el carrito'
        });
      }
    });
  }

  deleteCarrito(id: number) {
    this.isDeleteInProgress = true;
    this.carritoService.deleteCarrito(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Carrito eliminado',
        });
        this.isDeleteInProgress = false;
        this.listarCarritos();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el carrito'
        });
      }
    });
  }

  addCarrito(): void {
    if (!this.carrito.articulo || !this.carrito.precio || !this.carrito.cantidad) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Todos los campos son requeridos'
      });
      return;
    }

    this.carritoService.createCarrito(this.carrito).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Carrito creado',
        });
        this.visible = false;
        this.listarCarritos();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo crear el carrito',
        });
      },
    });
  }

  updateCarrito(): void {
    if (!this.carrito.articulo || !this.carrito.precio || !this.carrito.cantidad) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Todos los campos son requeridos'
      });
      return;
    }

    this.carritoService.updateCarrito(this.carrito, this.carrito.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Carrito actualizado'
        });
        this.visible = false;
        this.listarCarritos();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar el carrito'
        });
      }
    });
  }

}
