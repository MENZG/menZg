CREATE TABLE KORISNIK
(
  lozinka VARCHAR NOT NULL,
  idKorisnik INT NOT NULL,
  username VARCHAR NOT NULL,
  PRIMARY KEY (idKorisnik),
  UNIQUE (username)
);

CREATE TABLE MENZA
(
  idMenza INT NOT NULL,
  imeMenze VARCHAR NOT NULL,
  lokacija VARCHAR NOT NULL,
  PRIMARY KEY (idMenza),
  UNIQUE (imeMenze)
);

CREATE TABLE ADMIN
(
  idKorisnik INT NOT NULL,
  PRIMARY KEY (idKorisnik),
  FOREIGN KEY (idKorisnik) REFERENCES KORISNIK(idKorisnik)
);

CREATE TABLE DJELATNIK
(
  idKorisnik INT NOT NULL,
  idMenza INT NOT NULL,
  PRIMARY KEY (idKorisnik),
  FOREIGN KEY (idKorisnik) REFERENCES KORISNIK(idKorisnik),
  FOREIGN KEY (idMenza) REFERENCES MENZA(idMenza)
);

CREATE TABLE STUDENT
(
  spol VARCHAR(1),
  dob INT NOT NULL,
  idKorisnik INT NOT NULL,
  PRIMARY KEY (idKorisnik),
  FOREIGN KEY (idKorisnik) REFERENCES KORISNIK(idKorisnik)
);

CREATE TABLE JELO
(
  idJela INT NOT NULL,
  kategorija VARCHAR NOT NULL,
  cijena INT NOT NULL,
  nazivJela VARCHAR NOT NULL,
  PRIMARY KEY (idJela),
  UNIQUE (nazivJela)
);

CREATE TABLE RESTORAN
(
  idRestoran INT NOT NULL,
  imeRestorana VARCHAR NOT NULL,
  idMenza INT NOT NULL,
  PRIMARY KEY (idRestoran),
  FOREIGN KEY (idMenza) REFERENCES MENZA(idMenza),
  UNIQUE (imeRestorana)
);

CREATE TABLE RADNO_VRIJEME
(
  dan VARCHAR NOT NULL,
  pocetak INT NOT NULL,
  kraj INT NOT NULL,
  idRadnoVrijeme INT NOT NULL,
  PRIMARY KEY (idRadnoVrijeme)
);

CREATE TABLE DORUCAK
(
  idDorucak INT NOT NULL,
  PRIMARY KEY (idDorucak)
);

CREATE TABLE RUCAK
(
  idRucak INT NOT NULL,
  PRIMARY KEY (idRucak)
);

CREATE TABLE VECERA
(
  idVecera INT NOT NULL,
  PRIMARY KEY (idVecera)
);

CREATE TABLE bira
(
  favorit VARCHAR(2) NOT NULL,
  idKorisnik INT NOT NULL,
  idMenza INT NOT NULL,
  PRIMARY KEY (idKorisnik, idMenza),
  FOREIGN KEY (idKorisnik) REFERENCES STUDENT(idKorisnik),
  FOREIGN KEY (idMenza) REFERENCES MENZA(idMenza)
);

CREATE TABLE sadrzi1
(
  idDorucak INT NOT NULL,
  idJela INT NOT NULL,
  PRIMARY KEY (idDorucak, idJela),
  FOREIGN KEY (idDorucak) REFERENCES DORUCAK(idDorucak),
  FOREIGN KEY (idJela) REFERENCES JELO(idJela)
);

CREATE TABLE ima1
(
  idRestoran INT NOT NULL,
  idDorucak INT NOT NULL,
  PRIMARY KEY (idRestoran, idDorucak),
  FOREIGN KEY (idRestoran) REFERENCES RESTORAN(idRestoran),
  FOREIGN KEY (idDorucak) REFERENCES DORUCAK(idDorucak)
);

CREATE TABLE radi1
(
  idDorucak INT NOT NULL,
  idRadnoVrijeme INT NOT NULL,
  PRIMARY KEY (idDorucak, idRadnoVrijeme),
  FOREIGN KEY (idDorucak) REFERENCES DORUCAK(idDorucak),
  FOREIGN KEY (idRadnoVrijeme) REFERENCES RADNO_VRIJEME(idRadnoVrijeme)
);

CREATE TABLE radi2
(
  idRucak INT NOT NULL,
  idRadnoVrijeme INT NOT NULL,
  PRIMARY KEY (idRucak, idRadnoVrijeme),
  FOREIGN KEY (idRucak) REFERENCES RUCAK(idRucak),
  FOREIGN KEY (idRadnoVrijeme) REFERENCES RADNO_VRIJEME(idRadnoVrijeme)
);

CREATE TABLE radi3
(
  idVecera INT NOT NULL,
  idRadnoVrijeme INT NOT NULL,
  PRIMARY KEY (idVecera, idRadnoVrijeme),
  FOREIGN KEY (idVecera) REFERENCES VECERA(idVecera),
  FOREIGN KEY (idRadnoVrijeme) REFERENCES RADNO_VRIJEME(idRadnoVrijeme)
);

CREATE TABLE ima2
(
  idRestoran INT NOT NULL,
  idRucak INT NOT NULL,
  PRIMARY KEY (idRestoran, idRucak),
  FOREIGN KEY (idRestoran) REFERENCES RESTORAN(idRestoran),
  FOREIGN KEY (idRucak) REFERENCES RUCAK(idRucak)
);

CREATE TABLE ima3
(
  idRestoran INT NOT NULL,
  idVecera INT NOT NULL,
  PRIMARY KEY (idRestoran, idVecera),
  FOREIGN KEY (idRestoran) REFERENCES RESTORAN(idRestoran),
  FOREIGN KEY (idVecera) REFERENCES VECERA(idVecera)
);

CREATE TABLE sadrzi2
(
  idRucak INT NOT NULL,
  idJela INT NOT NULL,
  PRIMARY KEY (idRucak, idJela),
  FOREIGN KEY (idRucak) REFERENCES RUCAK(idRucak),
  FOREIGN KEY (idJela) REFERENCES JELO(idJela)
);

CREATE TABLE sadrzi3
(
  idVecera INT NOT NULL,
  idJela INT NOT NULL,
  PRIMARY KEY (idVecera, idJela),
  FOREIGN KEY (idVecera) REFERENCES VECERA(idVecera),
  FOREIGN KEY (idJela) REFERENCES JELO(idJela)
);

CREATE TABLE OCJENA
(
  idOcjena INT NOT NULL,
  rating INT NOT NULL,
  kategorija VARCHAR NOT NULL,
  idKorisnik INT,
  idMenza INT NOT NULL,
  PRIMARY KEY (idOcjena),
  FOREIGN KEY (idKorisnik) REFERENCES STUDENT(idKorisnik),
  FOREIGN KEY (idMenza) REFERENCES MENZA(idMenza)
);

CREATE TABLE KAMERA
(
  idKamera INT NOT NULL,
  URL VARCHAR NOT NULL,
  idRestoran INT NOT NULL,
  PRIMARY KEY (idKamera),
  FOREIGN KEY (idRestoran) REFERENCES RESTORAN(idRestoran)
);

CREATE TABLE CHAT
(
  idChat INT NOT NULL,
  idRestoran INT NOT NULL,
  PRIMARY KEY (idChat),
  FOREIGN KEY (idRestoran) REFERENCES RESTORAN(idRestoran)
);

CREATE TABLE PORUKA
(
  idPoruka INT NOT NULL,
  tekst VARCHAR NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  idChat INT,
  idStudent INT,
  idAdmin INT,
  PRIMARY KEY (idPoruka),
  FOREIGN KEY (idChat) REFERENCES CHAT(idChat),
  FOREIGN KEY (idKorisnik) REFERENCES STUDENT(idKorisnik),
  FOREIGN KEY (idKorisnik) REFERENCES ADMIN(idKorisnik)
);

CREATE TABLE gleda
(
  idKamera INT NOT NULL,
  idKorisnik INT NOT NULL,
  PRIMARY KEY (idKamera, idKorisnik),
  FOREIGN KEY (idKamera) REFERENCES KAMERA(idKamera),
  FOREIGN KEY (idKorisnik) REFERENCES KORISNIK(idKorisnik)
);

-- hahaha

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
  FOREIGN KEY (idKorisnik) REFERENCES ADMIN(idKorisnik),
  FOREIGN KEY (idChat) REFERENCES CHAT(idChat)
);