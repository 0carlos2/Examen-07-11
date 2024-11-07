import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/api/cliente';
  constructor(private http: HttpClient) { }
  getCliente(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  createCliente(Cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, Cliente);
  }

  updateCliente(Cliente: Cliente, id: number): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, Cliente);
  }

  deleteCliente(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }
}
