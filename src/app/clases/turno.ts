export class Turno {
    id?: string;

    cliente_uid?: string;
    cliente_nombre?: string; //Obligatorio
    cliente_mail?: string;
    
    tipo?: "consulta" | "tratamiento"; //Obligatorio
    duracion?: number; //Obligatorio
    fecha?: string | Date; //Obligatorio
    especialidad?: string; //Obligatorio

    especialista_uid?: string; //Obligatorio
    especialista_nombre?: string; //Obligatorio
    especialista_mail?: string; //Obligatorio

    sala_id?: string; //Lo llena el Especialista
    sala_nombre?: string;
    estado?: "confirmado" | "cancelado" | "esperando" | "atendiendo" | "finalizado" | "cerrado";
    resenia?: string; //Lo llena el Especialista
    encuesta?: {
        clinica: number,
        especialista: number,
        experiencia: string
    }
    quien_pidio?: "cliente" | "recepcionista";
    codigo?: string;
}
