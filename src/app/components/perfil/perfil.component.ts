import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  userId: string = '65c2099d981afd5beaa6ce9d';  
  oldPassword: string = '';
  newPassword: string = '';

  constructor(private userService: UserService) {}

  cambiarContrasena() {
    this.userService.actualizarContrasena(this.userId, this.oldPassword, this.newPassword).subscribe(
      response => {
        console.log(response.message); // Mensaje de éxito del backend
        // Restablecer los campos del formulario después de cambiar la contraseña
        this.oldPassword = '';
        this.newPassword = '';
      },
      error => {
        console.error('Error al cambiar la contraseña', error);
      }
    );
  }
}
