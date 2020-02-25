export class Turno {
    id?: string; //Fecha?
    cliente?: string; //ID_cliente
    especialista?: string; //ID especialista
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
