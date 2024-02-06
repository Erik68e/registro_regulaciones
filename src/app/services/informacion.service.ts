import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Informacion } from '../models/informacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformacionService {
  private apiUrl = 'http://localhost:3000/api/informacion';

  constructor(private httpClient: HttpClient) {
    this.selectedInformacion = new Informacion();
  }

  selectedInformacion: Informacion;
  informacion: Informacion[] = [];

  getInformacion() {
    return this.httpClient.get<Informacion[]>(this.apiUrl);
  }

  getInformacionById(id: string): Observable<Informacion> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<Informacion>(url);
  }
  createInformacion(informacion: Informacion): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl, informacion);
  }
}
