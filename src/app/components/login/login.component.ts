import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['administrador'] // Establecer el valor predeterminado del campo role como 'administrador'
    });
  }

  // En el componente de inicio de sesión
  loginUser() {
    const credentials = this.loginForm.value;

    this.userService.loginUser(credentials).subscribe(
      response => {
        console.log(response.message); // Mensaje de éxito del backend
        localStorage.setItem('token', response.token);

        // Comprobar el tipo de usuario y redirigir en consecuencia
        if (response.userType === 'administrador') {
          this.router.navigate(['configuracion']); // Redirige a la página de configuración
        } else if (response.userType === 'operador') {
          this.router.navigate(['regulaciones']); // Redirige a la página de regulaciones
        }
      },
      error => {
        console.error('Error al iniciar sesión', error);
      }
    );
  }


  registerUser() {
    const userData = this.registerForm.value;

    // Llama al servicio para enviar la solicitud de registro al backend
    this.userService.registerUser(userData).subscribe(
      response => {
        console.log(response.message); // Mensaje de éxito del backend
        localStorage.setItem('token', response.token);
        this.registerForm.reset();
      },
      error => {
        console.error('Error al registrar usuario', error);
      }
    );
  }
}
