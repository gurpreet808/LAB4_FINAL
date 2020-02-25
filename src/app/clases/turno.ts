export class Turno {
    id?: string; //Fecha?
    cliente_uid?: string;
    cliente_nombre?: string;
    cliente_mail?: string;
    tipo?: "consulta" | "tratamiento";
    duracion?: any;
    fecha?: string;
    especialidad?: string;
    especialista_uid?: string;
    especialista_nombre?: string;
    especialista_mail?: string;
    sector?: string; //Esto lo va a seleccionar el especialista
    estado?: string;
    resenia?: string;
    encuesta?: {
        clinica: number,
        especialista: number,
        experiencia: string
    }
}
