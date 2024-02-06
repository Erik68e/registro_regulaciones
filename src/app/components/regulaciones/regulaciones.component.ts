import { Component, OnInit } from '@angular/core';
import { InformacionService } from '../../services/informacion.service';
import { Informacion } from '../../models/informacion';
import { AuthService } from '../../services/auth.service';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-regulaciones',
  templateUrl: './regulaciones.component.html',
  styleUrls: ['./regulaciones.component.css']
})
export class RegulacionesComponent implements OnInit {
  informaciones: Informacion[] = [];

  constructor(private informacionService: InformacionService, public authService: AuthService) { }

  ngOnInit() {
    this.getInformacion();
  }

  getInformacion() {
    this.informacionService.getInformacion().subscribe(data => {
      this.informaciones = data;
      console.log(this.informaciones);
    });
  }

  descargarExcel(informacion: Informacion) {
    const data: any[] = [
      ['Id', 'Regulaciones', 'Url', 'Descripcion', 'Tipo', 'Institucion Emisora', 'Registro Oficial Numero', 'Registro Oficial Fecha', 'Suscripcion', 'Archivo', 'Modificado'],
      [informacion.regulacion_id, informacion.regulacion, informacion.url, informacion.descripcion, informacion.tipo, informacion.institucion_emisora, informacion.registro_oficial_numero, informacion.registro_oficial_fecha, informacion.suscripcion, informacion.archivo, informacion.modificado]
    ];

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Regulaciones');
    XLSX.writeFile(wb, 'regulaciones.xlsx');
  }

  descargarPDF(archivoPDF: string) {
    window.open(archivoPDF, '_blank');
  }

  abrirURL(url: string) {
    window.open(url, '_blank');
  }

  generarReporte() {
    const data: any[] = [
      ['Id', 'Regulaciones', 'Url', 'Descripcion', 'Tipo', 'Institucion Emisora', 'Registro Oficial Numero', 'Registro Oficial Fecha', 'Suscripcion', 'Archivo', 'Modificado']
    ];

    this.informaciones.forEach(informacion => {
      const rowData = [
        informacion.regulacion_id, informacion.regulacion, informacion.url, informacion.descripcion,
        informacion.tipo, informacion.institucion_emisora, informacion.registro_oficial_numero,
        informacion.registro_oficial_fecha, informacion.suscripcion, informacion.archivo, informacion.modificado
      ];

      data.push(rowData);
    });

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Regulaciones');
    XLSX.writeFile(wb, 'reporte_regulaciones.xlsx');
  }
  
}
