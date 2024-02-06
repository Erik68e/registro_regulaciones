import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/user'; // Cambia esta URL según tu servidor backend

  constructor(private http: HttpClient) { }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): Observable<any> {
    return this.http.get(`${this.apiUrl}/is-authenticated`);
  }

  // Método para cerrar la sesión
  logoutUser(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  registerUser(userData: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  loginUser(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Método para obtener todos los usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  // Método para actualizar un usuario por su ID
  updateUser(id: string, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, userData);
  }

  // Método para eliminar un usuario por su ID
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  
  actualizarContrasena(id: string, oldPassword: string, newPassword: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { oldPassword, newPassword });
  }
}
