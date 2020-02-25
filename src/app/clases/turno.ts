export class Turno {
    id?: string; //Fecha?
    cliente_uid?: string;
    cliente_nombre?: string;
    cliente_mail?: string;
    especialidad?: string;
    especialista_uid?: string;
    especialista_nombre?: string;
    especialista_mail?: string;
    sector?: string; //ID sector | Nombre del sector
    fecha?: string;
    estado?: string;
    resenia?: string;
    encuesta?: {
        clinica: number,
        especialista: number,
        experiencia: string
    }
}
