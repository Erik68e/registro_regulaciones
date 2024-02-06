import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  usuarios: any[] = [];
  usuarioForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.usuarioForm = this.fb.group({
      _id: [''], // Agregar el campo _id para identificar el usuario
      usuario: [''],
      email: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.userService.getUsers().subscribe(
      (data: any[]) => {
        this.usuarios = data;
      },
      error => {
        console.error('Error al obtener usuarios', error);
      }
    );
  }

  seleccionarUsuario(usuario: any) {
    this.usuarioForm.patchValue({
      _id: usuario._id,
      usuario: usuario.usuario,
      email: usuario.email,
      password: '' // No establecer la contraseña para editar
    });
  }

  agregarUsuario() {
    const userData = this.usuarioForm.value;

    this.userService.registerUser(userData).subscribe(
      response => {
        console.log(response.message); // Mensaje de éxito del backend
        // Actualizar la lista de usuarios después de agregar uno nuevo
        this.getUsuarios();
        // Limpiar el formulario después de agregar el usuario
        this.usuarioForm.reset();
      },
      error => {
        console.error('Error al registrar usuario', error);
      }
    );
  }

  editarUsuario(usuario: any) {
    const { usuario: nuevoUsuario, email: nuevoEmail, role: nuevoRole } = usuario; // Obtener datos del usuario actual
    const id = usuario._id;
  
    const userData = {
      usuario: nuevoUsuario,
      email: nuevoEmail,
      role: nuevoRole
    };
  
    this.userService.updateUser(id, userData).subscribe(
      response => {
        console.log(response.message);
        // Actualizar la lista de usuarios después de la edición
        this.getUsuarios(); // Recargar los usuarios después de la actualización
      },
      error => {
        console.error('Error al editar usuario', error);
      }
    );
  }
  
  
   

  eliminarUsuario(id: string) {
    this.userService.deleteUser(id).subscribe(
      response => {
        console.log(response.message);
        // Actualizar la lista de usuarios después de la eliminación
        this.getUsuarios();
      },
      error => {
        console.error('Error al eliminar usuario', error);
      }
    );
  }
}
