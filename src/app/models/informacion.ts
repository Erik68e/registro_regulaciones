export class Informacion {
    constructor(regulacion_id = 0,
        regulacion = "",
        url = "",
        descripcion = "",
        tipo = "",
        institucion_emisora = "",
        registro_oficial_numero = "",
        registro_oficial_fecha = "",
        suscripcion = "",
        archivo = "",
        modificado = "") { 
            this.regulacion_id = regulacion_id;
            this.regulacion = regulacion;
            this.url= url;
            this.descripcion = descripcion;
            this.tipo = tipo;
            this.institucion_emisora = institucion_emisora;
            this.registro_oficial_numero = registro_oficial_numero
            this.registro_oficial_fecha = registro_oficial_fecha
            this.suscripcion = suscripcion;
            this.archivo = archivo;
            this.modificado = modificado;
        }

    "regulacion_id": number;
    "regulacion": string;
    "url": string;
    "descripcion": string;
    "tipo": string;
    "institucion_emisora": string;
    "registro_oficial_numero": string;
    "registro_oficial_fecha": string;
    "suscripcion": string;
    "archivo": string;
    "modificado": string;

}