export interface Sala {
    id?: string,
    nombre: string,
    tipo: TipoSala,
    estado: EstadoSala,
    en_uso: boolean
}

export enum TipoSala {
    consultorio = "consultorio",
    laboratorio = "laboratorio",
}

export enum EstadoSala {
    habilitada = "habilitada",
    inhabilitada = "inhabilitada",
    en_construccion = "en construccion",
}
