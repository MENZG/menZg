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

  export interface UlogiraniKorisnik {
    sub: string;
    name: string;
    given_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
  }  

  export interface KorisnikFull {
    idKorisnik: number;
    lozinka: string;
    username: string;
    role: number;
    godine: number;
    spol: string;
    roleName: string;
  }