import { Component } from '@angular/core';
import { FacturaService } from '../../service/factura.service';
import { Factura } from '../../model/factura';
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
import { Cliente } from '../../../cliente/model/cliente';
import { Carrito } from '../../../carrito/model/carrito';
import { DropdownModule } from 'primeng/dropdown';
import { ClienteService } from '../../../cliente/service/cliente.service';
import { CarritoService } from '../../../carrito/service/carrito.service';

@Component({
  selector: 'app-factura',
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
    SidebarComponent,
    DropdownModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css'
})
export class FacturaComponent {
  factura = new Factura(0, new Cliente(), new Carrito());
  facturas: Factura[] = [];
  titulo: string = '';
  opc: string = '';
  op: number = 0;
  visible: boolean = false;
  isDeleteInProgress: boolean = false;
  cargando: boolean = false;
  clientes: Cliente[] = [];
  carritos: Carrito[] = [];

  constructor(
    private facturaService: FacturaService,
    private messageService: MessageService,
    private clienteService: ClienteService,
    private carritoService: CarritoService
  ) {}

  ngOnInit() {
    this.cargando = true;
    this.listarFacturas();
    this.cargarClientes();
    this.cargarCarritos();
  }

  listarFacturas() {
    this.facturaService.getFactura().subscribe({
      next: (data) => {
        this.facturas = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la lista de facturas'
        });
      }
    });
  }

  showDialogCreate() {
    this.titulo = 'Crear Factura';
    this.opc = 'Agregar';
    this.op = 0;
    this.factura = new Factura(0, new Cliente(), new Carrito());
    this.visible = true;
  }

  showDialogEdit(id: number) {
    this.titulo = 'Editar Factura';
    this.opc = 'Editar';
    this.op = 1;
    this.facturaService.getFacturaById(id).subscribe({
      next: (data) => {
        this.factura = data;
        this.visible = true;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la factura'
        });
      }
    });
  }

  deleteFactura(id: number) {
    this.isDeleteInProgress = true;
    this.facturaService.deleteFactura(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Factura eliminada',
        });
        this.isDeleteInProgress = false;
        this.listarFacturas();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la factura',
        });
      },
    });
  }

  addFactura(): void {
    if (!this.factura.cliente || !this.factura.carrito) {
      return;
    }

    this.facturaService.createFactura(this.factura).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Factura creada',
        });
        this.visible = false;
        this.listarFacturas();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo crear la factura',
        });
      },
    });
  }

  updateFactura(): void {
    if (!this.factura.cliente || !this.factura.carrito) {
      return;
    }

    this.facturaService.updateFactura(this.factura, this.factura.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Factura actualizada',
        });
        this.visible = false;
        this.listarFacturas();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar la factura',
        });
      },
    });
  }

  cargarClientes() {
    this.clienteService.getCliente().subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los clientes'
        });
      }
    });
  }

  cargarCarritos() {
    this.carritoService.getCarrito().subscribe({
      next: (data) => {
        this.carritos = data;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los carritos'
        });
      }
    });
  }
}
