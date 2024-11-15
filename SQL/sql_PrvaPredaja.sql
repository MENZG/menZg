CREATE TABLE KORISNIK
(
  lozinka VARCHAR(30) NOT NULL,
  idKorisnik INT NOT NULL,
  username VARCHAR(30) NOT NULL,
  spol VARCHAR(1),
  dob INT,
  status VARCHAR(30),
  uloga VARCHAR(10) NOT NULL,
  PRIMARY KEY (idKorisnik),
  UNIQUE (username)
);

CREATE TABLE MENZA
(
  idMenza INT NOT NULL,
  imeMenze VARCHAR(30) NOT NULL,
  lokacija VARCHAR(30) NOT NULL,
  PRIMARY KEY (idMenza),
  UNIQUE (imeMenze)
);

CREATE TABLE OCJENA
(
  idOcjena INT NOT NULL,
  rating INT NOT NULL,
  kategorija VARCHAR(10) NOT NULL,
  idMenza INT NOT NULL,
  idKorisnik INT NOT NULL,
  PRIMARY KEY (idOcjena),
  FOREIGN KEY (idMenza) REFERENCES MENZA(idMenza),
  FOREIGN KEY (idKorisnik) REFERENCES KORISNIK(idKorisnik)
);

CREATE TABLE KAMERA
(
  idKamera INT NOT NULL,
  URL VARCHAR(255) NOT NULL,
  idMenza INT NOT NULL,
  PRIMARY KEY (idKamera),
  FOREIGN KEY (idMenza) REFERENCES MENZA(idMenza)
);

CREATE TABLE CHAT
(
  idChat INT NOT NULL,
  idMenza INT NOT NULL,
  PRIMARY KEY (idChat),
  FOREIGN KEY (idMenza) REFERENCES MENZA(idMenza)
);

CREATE TABLE PORUKA
(
  idPoruka INT NOT NULL,
  tekst VARCHAR(500) NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  idChat INT,
  idKorisnik INT NOT NULL,
  PRIMARY KEY (idPoruka),
  FOREIGN KEY (idChat) REFERENCES CHAT(idChat),
  FOREIGN KEY (idKorisnik) REFERENCES KORISNIK(idKorisnik)
);

CREATE TABLE JELO
(
  idJela INT NOT NULL,
  kategorija VARCHAR(20) NOT NULL,
  cijena INT NOT NULL,
  nazivJela VARCHAR(20) NOT NULL,
  PRIMARY KEY (idJela),
  UNIQUE (nazivJela)
);

CREATE TABLE RADNO_VRIJEME
(
  dan VARCHAR(15) NOT NULL,
  pocetak TIME NULL,
  kraj TIME NULL,
  idRadnoVrijeme INT NOT NULL,
  idMenza INT NOT NULL,
  PRIMARY KEY (idRadnoVrijeme),
  FOREIGN KEY (idMenza) REFERENCES MENZA(idMenza)
);

CREATE TABLE OBROK
(
  idObrok INT NOT NULL,
  tipObroka VARCHAR(10) NOT NULL,
  PRIMARY KEY (idObrok),
  UNIQUE (tipObroka)
);

CREATE TABLE gleda
(
  idKamera INT NOT NULL,
  idKorisnik INT NOT NULL,
  PRIMARY KEY (idKamera, idKorisnik),
  FOREIGN KEY (idKamera) REFERENCES KAMERA(idKamera),
  FOREIGN KEY (idKorisnik) REFERENCES KORISNIK(idKorisnik)
);

CREATE TABLE sadrzi
(
  idObrok INT NOT NULL,
  idJela INT NOT NULL,
  PRIMARY KEY (idObrok, idJela),
  FOREIGN KEY (idObrok) REFERENCES OBROK(idObrok),
  FOREIGN KEY (idJela) REFERENCES JELO(idJela)
);

CREATE TABLE ima
(
  idMenza INT NOT NULL,
  idObrok INT NOT NULL,
  PRIMARY KEY (idMenza, idObrok),
  FOREIGN KEY (idMenza) REFERENCES MENZA(idMenza),
  FOREIGN KEY (idObrok) REFERENCES OBROK(idObrok)
);

CREATE TABLE favorit
(
  idKorisnik INT NOT NULL,
  idMenza INT NOT NULL,
  PRIMARY KEY (idKorisnik, idMenza),
  FOREIGN KEY (idKorisnik) REFERENCES KORISNIK(idKorisnik),
  FOREIGN KEY (idMenza) REFERENCES MENZA(idMenza)
);

CREATE TABLE uređuje
(
  idKorisnik INT NOT NULL,
  idMenza INT NOT NULL,
  PRIMARY KEY (idKorisnik, idMenza),
  FOREIGN KEY (idKorisnik) REFERENCES KORISNIK(idKorisnik),
  FOREIGN KEY (idMenza) REFERENCES MENZA(idMenza)
);