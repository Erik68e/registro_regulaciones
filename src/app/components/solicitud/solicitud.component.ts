import { Component } from '@angular/core';
import { InformacionService } from '../../services/informacion.service';
import { Informacion } from '../../models/informacion';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent {
  informacion: Informacion = new Informacion();

  constructor(private informacionService: InformacionService) { }

  submitForm() {
    this.informacionService.createInformacion(this.informacion)
      .subscribe(() => {
        console.log('Solicitud de regulación registrada exitosamente');
        // Puedes agregar aquí la lógica para redirigir a otra página o mostrar un mensaje de éxito
      }, error => {
        console.error('Error al registrar solicitud de regulación:', error);
        // Puedes agregar aquí la lógica para mostrar un mensaje de error al usuario
      });
  }
}
