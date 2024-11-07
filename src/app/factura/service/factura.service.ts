import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Factura } from '../model/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private apiUrl = 'http://localhost:8080/api/factura'; 
  constructor(private http: HttpClient) { }

  getFactura(): Observable<Factura[]> {
    return this.http.get<Factura[]>(this.apiUrl);
  }

  createFactura(Factura: Factura): Observable<Factura> {
      return this.http.post<Factura>(this.apiUrl, Factura);
  }

  updateFactura(Factura: Factura, id: number): Observable<Factura> {
      return this.http.put<Factura>(`${this.apiUrl}/${id}`, Factura);
  }

  deleteFactura(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getFacturaById(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.apiUrl}/${id}`);
  }
}
