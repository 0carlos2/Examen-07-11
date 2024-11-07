import { Component } from '@angular/core';
import { ClienteService } from '../../service/cliente.service';
import { Cliente } from '../../model/cliente';
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
  selector: 'app-cliente',
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
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {
  cliente = new Cliente();
  clientes: Cliente[] = [];
  titulo: string = '';
  opc: string = '';
  op: number = 0;
  visible: boolean = false;
  isDeleteInProgress: boolean = false;
  cargando: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.cargando = true;
    this.listarClientes();
  }

  listarClientes() {
    this.clienteService.getCliente().subscribe({
      next: (data) => {
        this.clientes = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la lista de clientes'
        });
      }
    });
  }

  showDialogCreate() {
    this.titulo = 'Crear Cliente';
    this.opc = 'Agregar';
    this.op = 0;
    this.cliente = new Cliente();
    this.visible = true;
  }

  showDialogEdit(id: number) {
    this.titulo = 'Editar Cliente';
    this.opc = 'Editar';
    this.op = 1;
    this.clienteService.getClienteById(id).subscribe({
      next: (data) => {
        this.cliente = data;
        this.visible = true;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar el cliente'
        });
      }
    });
  }

  deleteCliente(id: number) {
    this.isDeleteInProgress = true;
    this.clienteService.deleteCliente(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Cliente eliminado',
        });
        this.isDeleteInProgress = false;
        this.listarClientes();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el cliente',
        });
      },
    });
  }

  addCliente(): void {
    if (!this.cliente.nombre || !this.cliente.apellido || !this.cliente.dni) {
      return;
    }

    this.clienteService.createCliente(this.cliente).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Cliente creado',
        });
        this.visible = false;
        this.listarClientes();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo crear el cliente',
        });
      },
    });
  }

  updateCliente(): void {
    if (!this.cliente.nombre || !this.cliente.apellido || !this.cliente.dni) {
      return;
    }

    this.clienteService.updateCliente(this.cliente, this.cliente.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Cliente actualizado',
        });
        this.visible = false;
        this.listarClientes();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar el cliente',
        });
      },
    });
  }
}
