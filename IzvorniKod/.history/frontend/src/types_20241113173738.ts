// src/types.ts
export interface RadnoVrijeme {
    idRadnoVrijeme: number;
    dan: string;
    pocetak: string | null;
    kraj: string | null;
  }
  
  export interface Menza {
    idMenza: number;
    imeMenze: string;
    lokacija: string;
    radnaVremena: RadnoVrijeme[];
  }
  