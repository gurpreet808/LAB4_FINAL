export class Usuario {
    uid?: string;
    nombre?: string;
    apellido?: string;
    correo?: string;
    clave?: string;
    foto?: string;
    fechaAlta?: Object;
    fechaMod?: Object;
    esCliente?: boolean;
    tipoEmpleado?: "administrador" | "recepcionista" | "especialista";
    especialidad?: string;
}