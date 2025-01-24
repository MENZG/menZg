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
  

  export interface Korisnik {
    idKorisnik: number;
    lozinka: string;
    username: string;
    role: number;
    godine: number;
    spol: string;
    roleName: string;
  }