export interface RadnoVrijeme {
    id: number;
    dan: string;
    pocetak: string | null;
    kraj: string | null;
  }
  
  export interface Menza {
    id: number;
    ime: string;
    adresa: string;
    radnaVremena: RadnoVrijeme[];
  }
  