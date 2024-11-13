CREATE TABLE KORISNIK
(
  idKorisnik INT NOT NULL,
  username VARCHAR(30) NOT NULL,
  lozinka VARCHAR(30) NOT NULL,
  PRIMARY KEY (idKorisnik),
  UNIQUE (username),
  CHECK (LENGTH(lozinka) >= 8)
);

CREATE TABLE MENZA
(
  idMenza INT NOT NULL,
  imeMenze VARCHAR(30) NOT NULL,
  lokacija VARCHAR(30) NOT NULL,
  PRIMARY KEY (idMenza),
  UNIQUE (imeMenze)
);

CREATE TABLE APPADMIN
(
  idAdmin INT NOT NULL,
  status VARCHAR(30),
  PRIMARY KEY (idAdmin),
  FOREIGN KEY (idAdmin) REFERENCES KORISNIK(idKorisnik) ON DELETE CASCADE
);

CREATE TABLE DJELATNIK
(
  idDjelatnik INT NOT NULL,
  PRIMARY KEY (idDjelatnik),
  FOREIGN KEY (idDjelatnik) REFERENCES KORISNIK(idKorisnik) ON DELETE CASCADE
);

CREATE TABLE STUDENT
(
  idStudent INT NOT NULL,
  spol VARCHAR(1) CHECK (spol IN ('M', 'Ž')),
  dob INT CHECK (dob BETWEEN 0 AND 100),
  PRIMARY KEY (idStudent),
  FOREIGN KEY (idStudent) REFERENCES KORISNIK(idKorisnik)
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

CREATE TABLE JELO
(
  idJela INT NOT NULL,
  kategorija VARCHAR(20) NOT NULL,
  cijena INT NOT NULL CHECK (cijena > 0),
  nazivJela VARCHAR(20) NOT NULL,
  PRIMARY KEY (idJela),
  UNIQUE (nazivJela)
);

CREATE TABLE RADNO_VRIJEME
(
  idRadnoVrijeme INT NOT NULL,
  dan VARCHAR(15) NOT NULL CHECK (dan IN ('Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota', 'Nedjelja')),
  pocetak TIME NOT NULL,
  kraj TIME NOT NULL,
  PRIMARY KEY (idRadnoVrijeme)
);

CREATE TABLE OBROK
(
  idObrok INT NOT NULL,
  tipObroka VARCHAR(10) NOT NULL CHECK(tipObroka IN ('Doručak', 'Ručak', 'Večera')),
  PRIMARY KEY(idObrok),
  UNIQUE(tipObroka)
);

CREATE TABLE gleda
(
  idKamera INT NOT NULL,
  idKorisnik INT NOT NULL,
  PRIMARY KEY (idKamera, idKorisnik),
  FOREIGN KEY (idKamera) REFERENCES KAMERA(idKamera),
  FOREIGN KEY (idKorisnik) REFERENCES KORISNIK(idKorisnik)
);

CREATE TABLE favorit
(
  idKorisnik INT NOT NULL,
  idMenza INT NOT NULL,
  PRIMARY KEY (idKorisnik, idMenza),
  FOREIGN KEY (idKorisnik) REFERENCES STUDENT(idKorisnik),
  FOREIGN KEY (idMenza) REFERENCES MENZA(idMenza)
);

CREATE TABLE sudjeluje1
(
  idKorisnik INT NOT NULL,
  idChat INT NOT NULL,
  PRIMARY KEY (idKorisnik, idChat),
  FOREIGN KEY (idKorisnik) REFERENCES STUDENT(idKorisnik),
  FOREIGN KEY (idChat) REFERENCES CHAT(idChat)
);

CREATE TABLE sudjeluje2
(
  idKorisnik INT NOT NULL,
  idChat INT NOT NULL,
  PRIMARY KEY (idKorisnik, idChat),
  FOREIGN KEY (idKorisnik) REFERENCES APPADMIN(idKorisnik),
  FOREIGN KEY (idChat) REFERENCES CHAT(idChat)
);

CREATE TABLE uređuje
(
  idKorisnik INT NOT NULL,
  idMenza INT NOT NULL,
  PRIMARY KEY (idKorisnik, idMenza),
  FOREIGN KEY (idKorisnik) REFERENCES DJELATNIK(idKorisnik),
  FOREIGN KEY (idMenza) REFERENCES MENZA(idMenza)
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

CREATE TABLE radi
(
  idMenza INT NOT NULL,
  idRadnoVrijeme INT NOT NULL,
  PRIMARY KEY (idMenza, idRadnoVrijeme),
  FOREIGN KEY (idMenza) REFERENCES MENZA(idMenza),
  FOREIGN KEY (idRadnoVrijeme) REFERENCES RADNO_VRIJEME(idRadnoVrijeme)
);

CREATE TABLE OCJENA
(
  idOcjena INT NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  kategorija VARCHAR(10) NOT NULL CHECK (kategorija IN ('Ambijent', 'Hrana', 'Lokacija', 'Ljubaznost')),
  idStudent INT NOT NULL,
  idMenza INT NOT NULL,
  PRIMARY KEY (idOcjena),
  FOREIGN KEY (idStudent) REFERENCES STUDENT(idStudent),
  FOREIGN KEY (idMenza) REFERENCES MENZA(idMenza)
);

CREATE TABLE PORUKA
(
  idPoruka INT NOT NULL,
  tekst VARCHAR(500) NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  idChat INT,
  idStudent INT,
  idAdmin INT,
  PRIMARY KEY (idPoruka),
  FOREIGN KEY (idChat) REFERENCES CHAT(idChat),
  FOREIGN KEY (idStudent) REFERENCES STUDENT(idStudent),
  FOREIGN KEY (idAdmin) REFERENCES APPADMIN(idAdmin),
  CHECK ((idStudent IS NOT NULL AND idAdmin IS NULL) OR (idStudent IS NULL AND idAdmin IS NOT NULL))
);