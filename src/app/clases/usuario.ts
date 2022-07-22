export interface Usuario {
    uid?: string;
    nombre: string;
    apellido: string;
    correo?: string;
    clave?: string;
    foto?: string;
    fechaAlta: Object;
    fechaMod: Object;
    esCliente: boolean;
    tipoEmpleado?: TipoEmpleado
    especialidad?: string;
}

export enum TipoEmpleado {
    administrador = 'Administrador',
    recepcionista = "recepcionista", 
    especialista = "especialista"
}
