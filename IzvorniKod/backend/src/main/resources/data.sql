INSERT INTO korisnik (lozinka, username, role, godine, spol, blocked) VALUES
('password123', 'nikolab2609@gmail.com', 2, 35, 'Muški', false),
('password123', 'blazstuzic2@gmail.com', 2, 28, 'Muški',false),
('password123', 'karla.sikavica@gmail.com', 2, 24, 'Ženski',false), -- IMAT CE 1 DA MOZE S NIKOM TESTIRAT
('password123', 'eugenkozomara2904@gmail.com', 3, 40, 'Muški',false),
('password123', 'anteaknezovic155@gmail.com', 3, 33, 'Ženski',false),
('password123', 'rimacniko0@gmail.com', 3, 29, 'Muški',false),
('password123', 'dakovicvalentin@gmail.com', 3, 38, 'Muški',false),

('password123', 'user2@gmail.com', 1, 22, 'Ženski',true),
('password123', 'user3@gmail.com', 1, 26, 'Ženski',false),
('password123', 'user4@gmail.com', 2, 32, 'Muški',false),
('password123', 'user5@gmail.com', 2, 31, 'Muški',false),
('password123', 'user6@gmail.com', 2, 29, 'Muški',true),
('password123', 'user7@gmail.com', 3, 35, 'Muški',false),
('password123', 'user8@gmail.com', 3, 28, 'Ženski',false),
('password123', 'user9@gmail.com', 1, 23, 'Ženski',true),
('password123', 'user10@gmail.com', 1, 27, 'Muški',false);

-- SQL za unos podataka o zagrebačkim menzama u tablicu `menza`
INSERT INTO radno_vrijeme (dan, pocetak, kraj) VALUES 
-- Jutarnje smjene
('ponedjeljak', '08:00:00', '16:00:00'),
('utorak', '08:00:00', '16:00:00'),
('srijeda', '08:00:00', '16:00:00'),
('cetvrtak', '08:00:00', '16:00:00'),
('petak', '08:00:00', '16:00:00'),
('subota', '10:00:00', '14:00:00'),
('nedjelja', NULL, NULL), -- Nedjelja zatvoreno

-- Popodnevne smjene
('ponedjeljak', '17:00:00', '21:00:00'),
('utorak', '17:00:00', '21:00:00'),
('srijeda', '17:00:00', '21:00:00'),
('cetvrtak', '17:00:00', '21:00:00'),
('petak', '17:00:00', '21:00:00'),
('subota', '17:00:00', '21:00:00'),
('nedjelja', NULL, NULL); -- Nedjelja zatvoreno


INSERT INTO menza (ime_Menze, lokacija)
VALUES
    ('Menza Lašćina', 'Laščinska cesta 32, Zagreb'), --1
    ('Menza Stjepan Radić PIZZERIA', 'Jarunska ulica 2, Zagreb'), --2
    ('Menza Stjepan Radić RESTORAN 1', 'Jarunska ulica 2, Zagreb'), --3
    ('Menza Stjepan Radić RESTORAN 2', 'Jarunska ulica 2, Zagreb'), --4
    ('Menza Cvjetno naselje LINIJA 1', 'Odranska ulica 8, Zagreb'), --5
    ('Menza Cvjetno naselje LINIJA 2', 'Odranska ulica 8, Zagreb'), --6
    ('Menza Ekonomija', 'Trg Johna F. Kennedyja 6, Zagreb'), --7
    ('Menza Kefa', 'Trg Johna F.Kennedyja 6, Zagreb'), --8
    ('Menza na Medicinskom fakultetu', 'Šalata 3b, Zagreb'), --9
    ('Menza Veterinarski fakultet', 'Heinzelova 55, Zagreb'), --10
    ('Menza ALU', 'Ilica 85c, Zagreb'), --11
    ('Menza Agronomija i Šumarstvo', 'Ulica Tvrtka Miloša 1, Zagreb'), --12
    ('Menza Gaudeamus', 'Ulica Radoslava Cimermana 88, Zagreb'), --13
    ('Menza Savska LINIJA LIJEVO', 'Savska cesta 25, Zagreb'), --14
    ('Menza Savska LINIJA DESNO', 'Savska cesta 25, Zagreb'), --15
    ('Menza Express', 'Savska cesta 25, Zagreb'), --16
    ('Menza TTF', 'Prilaz baruna Filipovića 28, Zagreb'), --17
    ('Menza RGNF-PBF', 'Pierottijeva ulica 6, Zagreb'), --18
    ('Menza SC-a NSK', 'Ulica Hrvatske bratske zajednicke 4, Zagreb'), --19
    ('Restoran Filozofski fakultet', 'Ulica Ivana Lučića 3, Zagreb'), --20
    ('Menza ZUK Borongaj', 'Borongajska bb, Zagreb'), --21
    ('Menza TVZ', 'Konavolska ulica 2, Zagreb'), --22
    ('Menza Cassandra', 'Ulica grada Vukovara 39, Zagreb'), --23
    ('Menza Cassandra BRZA', 'Ulica grada Vukovara 39, Zagreb'), --24
    ('Menza Odeon', 'Ulica Andrije Kačića Miošića 26, Zagreb'), --25
    ('Menza VEMAG', 'Horvatovac 102a, Zagreb'), --26

INSERT INTO korisnik_menza (id_Korisnik, id_Menza) VALUES
(1, 1), -- Nikolina omiljena menza je Menza 1
(1, 2), -- Nikolina omiljena menza je Menza 2
(2, 3), -- Blaž omiljena menza je Menza 3
(3, 1), -- Karla omiljena menza je Menza 1
(3, 4), -- Karla omiljena menza je Menza 4
(4, 2), -- Eugen omiljena menza je Menza 2
(5, 3), -- Ante omiljena menza je Menza 3
(6, 5), -- Rimac omiljena menza je Menza 5
(7, 1), -- Valentin omiljena menza je Menza 1
(7, 3); -- Valentin omiljena menza je Menza 3

--- RADNA VREMENA
-- Menza Lašćina
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '08:00:00', '20:30:00', 1),
    ('Utorak', '08:00:00', '20:30:00', 1),
    ('Srijeda', '08:00:00', '20:30:00', 1),
    ('Četvrtak', '08:00:00', '20:30:00', 1),
    ('Petak', '08:00:00', '20:30:00', 1),
    ('Subota', '08:00:00', '15:30:00', 1),
    ('Nedjelja', NULL,  NULL, 1);

-- Menza Stjepan Radić PIZZERIA
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '14:00:00', '20:30:00', 2),
    ('Utorak', '14:00:00', '20:30:00', 2),
    ('Srijeda', '14:00:00', '20:30:00', 2),
    ('Četvrtak', '14:00:00', '20:30:00', 2),
    ('Petak', '14:00:00', '20:30:00', 2),
    ('Subota', '14:00:00', '20:30:00', 2),
    ('Nedjelja', '14:00:00', '20:30:00', 2);

-- Menza Stjepan Radić RESTORAN 1
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '11:30:00', '21:30:00', 3),
    ('Utorak', '11:30:00', '21:30:00', 3),
    ('Srijeda', '11:30:00', '21:30:00', 3),
    ('Četvrtak', '11:30:00', '21:30:00', 3),
    ('Petak', '11:30:00', '21:30:00', 3),
    ('Subota', '11:30:00', '21:30:00', 3),
    ('Nedjelja', '11:30:00', '21:30:00', 3);

-- Menza Stjepan Radić RESTORAN 2
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '12:00:00', '15:00:00', 4),
    ('Utorak', '12:00:00', '15:00:00', 4),
    ('Srijeda', '12:00:00', '15:00:00', 4),
    ('Četvrtak', '12:00:00', '15:00:00', 4),
    ('Petak', '12:00:00', '15:00:00', 4),
    ('Subota', '12:00:00', '15:00:00', 4),
    ('Nedjelja', '12:00:00', '15:00:00', 4);

-- Menza Cvjetno naselje LINIJA 1
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '17:30:00', '21:00:00', 5),
    ('Utorak', '11:00:00', '16:00:00', 5),
    ('Srijeda', '11:00:00', '16:00:00', 5),
    ('Četvrtak', '11:00:00', '16:00:00', 5),
    ('Petak', '11:00:00', '16:00:00', 5),
    ('Subota', NULL, NULL, 5),
    ('Nedjelja', NULL, NULL, 5);

-- Menza Cvjetno naselje LINIJA 2
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '16:00:00', '20:00:00', 6),
    ('Utorak', '12:00:00', '15:00:00', 6),
    ('Srijeda', '12:00:00', '15:00:00', 6),
    ('Četvrtak', '12:00:00', '15:00:00', 6),
    ('Petak', '12:00:00', '15:00:00', 6),
    ('Subota', NULL, NULL, 6),
    ('Nedjelja', NULL, NULL, 6);
    
-- Menza Ekonomija
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '08:00:00', '16:00:00', 7),
    ('Utorak', '08:00:00', '16:00:00', 7),
    ('Srijeda', '08:00:00', '16:00:00', 7),
    ('Četvrtak', '08:00:00', '16:00:00', 7),
    ('Petak', '08:00:00', '16:00:00', 7),
    ('Subota', NULL, NULL, 7),
    ('Nedjelja', NULL, NULL, 7);

-- Menza Kefa
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', NULL, NULL, 8),
    ('Utorak', NULL, NULL, 8),
    ('Srijeda', NULL, NULL, 8),
    ('Četvrtak', NULL, NULL, 8),
    ('Petak', NULL, NULL, 8),
    ('Subota', NULL, NULL, 8),
    ('Nedjelja', NULL, NULL, 8);

-- Menza na Medicinskom fakultetu
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '11:00:00', '15:00:00', 9),
    ('Utorak', '11:00:00', '15:00:00', 9),
    ('Srijeda', '11:00:00', '15:00:00', 9),
    ('Četvrtak', '11:00:00', '15:00:00', 9),
    ('Petak', '11:00:00', '15:00:00', 9),
    ('Subota', NULL, NULL, 9),
    ('Nedjelja', NULL, NULL, 9);

-- Menza Veterinarski fakultet
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '08:00:00', '15:00:00', 10),
    ('Utorak', '08:00:00', '15:00:00', 10),
    ('Srijeda', '08:00:00', '15:00:00', 10),
    ('Četvrtak', '08:00:00', '15:00:00', 10),
    ('Petak', '08:00:00', '15:00:00', 10),
    ('Subota', NULL, NULL, 10),
    ('Nedjelja', NULL, NULL, 10);

-- Menza ALU
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '09:00:00', '15:00:00', 11),
    ('Utorak', '09:00:00', '15:00:00', 11),
    ('Srijeda', '09:00:00', '15:00:00', 11),
    ('Četvrtak', '09:00:00', '15:00:00', 11),
    ('Petak', '09:00:00', '15:00:00', 11),
    ('Subota', NULL, NULL, 11),
    ('Nedjelja', NULL, NULL, 11);

-- Menza Agronomija i Šumarstvo
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '08:00:00', '15:00:00', 12),
    ('Utorak', '08:00:00', '15:00:00', 12),
    ('Srijeda', '08:00:00', '15:00:00', 12),
    ('Četvrtak', '08:00:00', '15:00:00', 12),
    ('Petak', '08:00:00', '15:00:00', 12),
    ('Subota', NULL, NULL, 12),
    ('Nedjelja', NULL, NULL, 12);

 -- Menza Gaudeamus
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '08:00:00', '14:00:00', 13),
    ('Utorak', '08:00:00', '14:00:00', 13),
    ('Srijeda', '08:00:00', '14:00:00', 13),
    ('Četvrtak', '08:00:00', '14:00:00', 13),
    ('Petak', '08:00:00', '14:00:00', 13),
    ('Subota', '08:00:00', '14:00:00', 13),
    ('Nedjelja', '08:00:00', '14:00:00', 13);

-- Menza Savska LINIJA LIJEVO
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '11:00:00', '15:00:00', 14),
    ('Utorak', '11:00:00', '15:00:00', 14),
    ('Srijeda', '11:00:00', '15:00:00', 14),
    ('Četvrtak', '11:00:00', '15:00:00', 14),
    ('Petak', '11:00:00', '15:00:00', 14),
    ('Subota', '11:00:00', '15:00:00', 14),
    ('Nedjelja', '11:00:00', '15:00:00', 14);

-- Menza Savska LINIJA DESNO
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', NULL, NULL, 15),
    ('Utorak', NULL, NULL, 15),
    ('Srijeda', NULL, NULL, 15),
    ('Četvrtak', NULL, NULL, 15),
    ('Petak', NULL, NULL, 15),
    ('Subota', NULL, NULL, 15),
    ('Nedjelja', NULL, NULL, 15);

-- Menza Express
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '09:00:00', '15:00:00', 16),
    ('Utorak', '09:00:00', '15:00:00', 16),
    ('Srijeda', '09:00:00', '15:00:00', 16),
    ('Četvrtak', '09:00:00', '15:00:00', 16),
    ('Petak', '09:00:00', '15:00:00', 16),
    ('Subota', NULL, NULL, 16),
    ('Nedjelja', NULL, NULL, 16);

-- Menza TTF
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '08:00:00', '14:30:00', 17),
    ('Utorak', '08:00:00', '14:30:00', 17),
    ('Srijeda', '08:00:00', '14:30:00', 17),
    ('Četvrtak', '08:00:00', '14:30:00', 17),
    ('Petak', '08:00:00', '14:30:00', 17),
    ('Subota', NULL, NULL, 17),
    ('Nedjelja', NULL, NULL, 17);

-- Menza RGNF-PBF
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '11:00:00', '15:00:00', 18),
    ('Utorak', '11:00:00', '15:00:00', 18),
    ('Srijeda', '11:30:00', '15:00:00', 18),
    ('Četvrtak', '11:00:00', '15:00:00', 18),
    ('Petak', '11:00:00', '15:00:00', 18),
    ('Subota', NULL, NULL, 18),
    ('Nedjelja', NULL, NULL, 18);

-- Menza SC-a NSK
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '08:00:00', '15:00:00', 19),
    ('Utorak', '08:00:00', '15:00:00', 19),
    ('Srijeda', '08:00:00', '15:00:00', 19),
    ('Četvrtak', '08:00:00', '15:00:00', 19),
    ('Petak', '08:00:00', '15:00:00', 19),
    ('Subota', NULL, NULL, 19),
    ('Nedjelja', NULL, NULL, 19);

-- Restoran Filozofski fakultet
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '11:00:00', '15:00:00', 20),
    ('Utorak', '11:00:00', '15:00:00', 20),
    ('Srijeda', '11:00:00', '15:00:00', 20),
    ('Četvrtak', '11:00:00', '15:00:00', 20),
    ('Petak', '11:00:00', '15:00:00', 20),
    ('Subota', NULL, NULL, 20),
    ('Nedjelja', NULL, NULL, 20);

-- Menza ZUK Borongaj
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '10:30:00', '16:00:00', 21),
    ('Utorak', '10:30:00', '16:00:00', 21),
    ('Srijeda', '1O:30:00', '16:00:00', 21),
    ('Četvrtak', '10:30:00', '16:00:00', 21),
    ('Petak', '1O:30:00', '15:00:00', 21),
    ('Subota', NULL, NULL, 21),
    ('Nedjelja', NULL, NULL, 21);

-- Menza TVZ
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '08:00:00', '15:00:00', 22),
    ('Utorak', '08:00:00', '15:00:00', 22),
    ('Srijeda', '08:00:00', '15:00:00', 22),
    ('Četvrtak', '08:00:00', '15:00:00', 22),
    ('Petak', '08:00:00', '15:00:00', 22),
    ('Subota', NULL, NULL, 22),
    ('Nedjelja', NULL, NULL, 22);

-- Menza Cassandra
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '10:00:00', '16:00:00', 23),
    ('Utorak', '10:00:00', '16:00:00', 23),
    ('Srijeda', '10:00:00', '16:00:00', 23),
    ('Četvrtak', '10:00:00', '16:00:00', 23),
    ('Petak', '10:00:00', '16:00:00', 23),
    ('Subota', NULL, NULL, 23),
    ('Nedjelja', NULL, NULL, 23);

 -- Menza Cassandra BRZA
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '10:00:00', '17:00:00', 24),
    ('Utorak', '10:00:00', '17:00:00', 24),
    ('Srijeda', '10:00:00', '17:00:00', 24),
    ('Četvrtak', '10:00:00', '17:00:00', 24),
    ('Petak', '10:00:00', '17:00:00', 24),
    ('Subota', NULL, NULL, 24),
    ('Nedjelja', NULL, NULL, 24);

-- Menza Odeon
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '09:30:00', '17:00:00', 25),
    ('Utorak', '09:30:00', '17:00:00', 25),
    ('Srijeda', '09:30:00', '17:00:00', 25),
    ('Četvrtak', '09:30:00', '17:00:00', 25),
    ('Petak', '09:30:00', '17:00:00', 25),
    ('Subota', NULL, NULL, 25),
    ('Nedjelja', NULL, NULL, 25);

-- Menza VEMAG
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '08:00:00', '17:00:00', 26),
    ('Utorak', '08:00:00', '17:00:00', 26),
    ('Srijeda', '08:00:00', '17:00:00', 26),
    ('Četvrtak', '08:00:00', '17:00:00', 26),
    ('Petak', '08:00:00', '17:00:00', 26),
    ('Subota', NULL, NULL, 26),
    ('Nedjelja', NULL, NULL, 26);

-- Tablica za jelovnike (kategorije: Doručak, Ručak, Večera)
INSERT INTO jelo (kategorija, cijena, naziv_jela, id_menza) VALUES
-- Menza Lašćina (ID: 1)
('Doručak', 1.5, 'Jaja s pancetom', 1),
('Doručak', 1.2, 'Pecivo s maslacem i džemom', 1),
('Doručak', 1.0, 'Čokolino', 1),
('Ručak', 2.5, 'Pečena piletina s povrćem', 1),
('Ručak', 2.2, 'Rižoto s gljivama', 1),
('Ručak', 2.0, 'Pasta Primavera', 1),
('Večera', 2.3, 'Sendvič s tunjevinom', 1),
('Večera', 2.5, 'Pečena riba s blitvom', 1),
('Večera', 1.8, 'Pizza Margherita', 1),

-- Menza Stjepan Radić PIZZERIA (ID: 2)
('Doručak', 1.5, 'Kajgana s povrćem', 2),
('Doručak', 1.0, 'Kroasan s čokoladom', 2),
('Doručak', 1.2, 'Gris s kakaom', 2),
('Ručak', 3.0, 'Pohana piletina s pomfritom', 2),
('Ručak', 2.5, 'Punjene paprike', 2),
('Ručak', 2.8, 'Lasagne', 2),
('Večera', 2.3, 'Špageti Carbonara', 2),
('Večera', 2.7, 'Burger s pomfritom', 2),
('Večera', 2.0, 'Vegetarijanski rižoto', 2),

-- Menza Stjepan Radić RESTORAN 1 (ID: 3)
('Doručak', 1.3, 'Palačinke s medom', 3),
('Doručak', 1.0, 'Sendvič sa sirom i šunkom', 3),
('Doručak', 1.2, 'Žitarice s mlijekom', 3),
('Ručak', 3.2, 'Grah s kobasicom', 3),
('Ručak', 2.8, 'Zapečeni krumpir s mesom', 3),
('Ručak', 2.5, 'Pileći medaljoni s rižom', 3),
('Večera', 2.3, 'Salata s tunjevinom', 3),
('Večera', 2.7, 'Pizza s povrćem', 3),
('Večera', 2.2, 'Ćevapi s lepinjom', 3),

-- Menza Stjepan Radić RESTORAN 2 (ID: 4)
('Doručak', 1.3, 'Omelette sa šunkom', 4),
('Doručak', 1.2, 'Jogurt s muslijem', 4),
('Doručak', 1.0, 'Kiflica s maslacem', 4),
('Ručak', 2.9, 'Bečki odrezak s krumpirom', 4),
('Ručak', 3.0, 'Punjena pileća prsa', 4),
('Ručak', 2.8, 'Šunka u tijestu', 4),
('Večera', 2.4, 'Tuna salata s jajima', 4),
('Večera', 2.7, 'Hot dog s prilozima', 4),
('Večera', 2.1, 'Pohane tikvice s krumpir salatom', 4),

-- Menza Cvjetno naselje LINIJA 1 (ID: 5)
('Doručak', 1.0, 'Muesli s jogurtom', 5),
('Doručak', 1.2, 'Tost sa sirom', 5),
('Doručak', 1.3, 'Kukuruzna kaša', 5),
('Ručak', 3.5, 'Svinjski kotlet s prilogom', 5),
('Ručak', 3.0, 'Punjeni lignji s povrćem', 5),
('Ručak', 2.5, 'Gulaš s njokima', 5),
('Večera', 2.2, 'Sendvič s piletinom', 5),
('Večera', 2.7, 'Zapečeni grah s kobasicom', 5),
('Večera', 2.0, 'Vegetarijanski wrap', 5),

-- Menza Cvjetno naselje LINIJA 2 (ID: 6)
('Doručak', 1.2, 'Palačinke s marmeladom', 6),
('Doručak', 1.0, 'Čokoladno pecivo', 6),
('Doručak', 1.1, 'Kukuruzni kruh s maslacem', 6),
('Ručak', 3.0, 'Lazanje s mljevenim mesom', 6),
('Ručak', 2.8, 'Zapečena tjestenina s povrćem', 6),
('Ručak', 2.6, 'Grah s kobasicom', 6),
('Večera', 2.3, 'Pizza Capricciosa', 6),
('Večera', 2.7, 'Riblji file s povrćem', 6),
('Večera', 2.1, 'Pohana riba s tartarom', 6);

-- Menza Ekonomija (ID: 7)
INSERT INTO jelo (kategorija, cijena, naziv_jela, id_menza) VALUES
('Doručak', 1.3, 'Jaja na oko s kobasicom', 7),
('Doručak', 1.0, 'Sendvič s mortadelom', 7),
('Doručak', 1.2, 'Zobene pahuljice s mlijekom', 7),
('Ručak', 3.0, 'Svinjski paprikaš s noklicama', 7),
('Ručak', 2.8, 'Pečena teletina s krumpirima', 7),
('Ručak', 2.6, 'Vegetarijanski wok s povrćem', 7),
('Večera', 2.4, 'Pileći burger', 7),
('Večera', 2.5, 'Tuna salata s kukuruzom', 7),
('Večera', 2.0, 'Pizza s kulenom', 7),

-- Menza Kefa (ID: 8)
('Doručak', 1.5, 'Kajgana sa špekom', 8),
('Doručak', 1.0, 'Jogurt s pahuljicama', 8),
('Doručak', 1.2, 'Kruh s maslacem i medom', 8),
('Ručak', 3.2, 'Bečki odrezak s pomfritom', 8),
('Ručak', 3.0, 'Piletina u umaku od gljiva', 8),
('Ručak', 2.8, 'Zapečene lazanje', 8),
('Večera', 2.4, 'Salata s feta sirom', 8),
('Večera', 2.5, 'Pizza Funghi', 8),
('Večera', 2.2, 'Sendvič s povrćem', 8),

-- Menza na Medicinskom fakultetu (ID: 9)
('Doručak', 1.3, 'Pecivo sa sirom', 9),
('Doručak', 1.0, 'Sendvič s maslacem', 9),
('Doručak', 1.2, 'Zobena kaša s voćem', 9),
('Ručak', 3.0, 'Pečeni losos s povrćem', 9),
('Ručak', 2.7, 'Rižoto od kozica', 9),
('Ručak', 2.8, 'Pohana puretina s pireom', 9),
('Večera', 2.5, 'Burger s BBQ umakom', 9),
('Večera', 2.3, 'Špageti Bolonjez', 9),
('Večera', 2.1, 'Vegetarijanski wrap', 9),

-- Menza Veterinarski fakultet (ID: 10)
('Doručak', 1.5, 'Omlet s gljivama', 10),
('Doručak', 1.2, 'Kiflica sa šunkom i sirom', 10),
('Doručak', 1.0, 'Jogurt s medom', 10),
('Ručak', 3.5, 'Punjeni odrezak u umaku od vrganja', 10),
('Ručak', 3.0, 'Pileći file s povrćem na žaru', 10),
('Ručak', 2.9, 'Njoki u pestu', 10),
('Večera', 2.5, 'Pizza s mozzarellom', 10),
('Večera', 2.7, 'Pileći wok s rezancima', 10),
('Večera', 2.3, 'Salata s jajima', 10),

-- Menza ALU (ID: 11)
('Doručak', 1.5, 'Palačinke s nutellom', 11),
('Doručak', 1.3, 'Sendvič s puretinom', 11),
('Doručak', 1.0, 'Kiflica s margarinom', 11),
('Ručak', 3.2, 'Pohana teletina s krumpir salatom', 11),
('Ručak', 2.8, 'Rižoto s piletinom', 11),
('Ručak', 3.0, 'Zapečeni grah s mesom', 11),
('Večera', 2.4, 'Burger s povrćem', 11),
('Večera', 2.5, 'Špageti s umakom od rajčice', 11),
('Večera', 2.3, 'Pizza Vegetariana', 11);

-- Menza Agronomija i Šumarstvo (ID: 12)
INSERT INTO jelo (kategorija, cijena, naziv_jela, id_menza) VALUES
('Doručak', 1.5, 'Pecivo s čokoladnim namazom', 12),
('Doručak', 1.3, 'Kajgana s povrćem', 12),
('Doručak', 1.0, 'Jogurt s voćem', 12),
('Ručak', 3.3, 'Gulaš s knedlama', 12),
('Ručak', 3.0, 'Roštilj plate s prilozima', 12),
('Ručak', 2.9, 'Tjestenina sa sirom i vrhnjem', 12),
('Večera', 2.5, 'Burger s prženim krumpirićima', 12),
('Večera', 2.7, 'Pizza Quattro Formaggi', 12),
('Večera', 2.4, 'Tuna salata s maslinama', 12),

-- Menza Gaudeamus (ID: 13)
('Doručak', 1.4, 'Sendvič s tunjevinom', 13),
('Doručak', 1.2, 'Kroasan s marmeladom', 13),
('Doručak', 1.0, 'Žitarice s mlijekom', 13),
('Ručak', 3.0, 'Ćevapi s ajvarom i lepinjom', 13),
('Ručak', 2.7, 'Pohana piletina s blitvom', 13),
('Ručak', 2.8, 'Pečena puretina s pireom', 13),
('Večera', 2.3, 'Salata od tune', 13),
('Večera', 2.7, 'Pasta Carbonara', 13),
('Večera', 2.0, 'Sendvič s avokadom', 13),

-- Menza Savska LINIJA LIJEVO (ID: 14)
('Doručak', 1.4, 'Sendvič s pršutom i sirom', 14),
('Doručak', 1.3, 'Kiflica s maslacem', 14),
('Doručak', 1.1, 'Zobena kaša s grožđicama', 14),
('Ručak', 3.5, 'Beef Stroganoff s rižom', 14),
('Ručak', 3.2, 'Grilana piletina s povrćem', 14),
('Ručak', 3.0, 'Njoki u umaku od rajčice', 14),
('Večera', 2.6, 'Pizza Pepperoni', 14),
('Večera', 2.7, 'Taco s piletinom i salsom', 14),
('Večera', 2.4, 'Salata od tune s tjesteninom', 14);

-- Menza Savska LINIJA DESNO (ID: 15)
INSERT INTO jelo (kategorija, cijena, naziv_jela, id_menza) VALUES
('Doručak', 1.4, 'Zobena kaša s bademima', 15),
('Doručak', 1.2, 'Sendvič s pečenicom', 15),
('Doručak', 1.0, 'Kruh s medom', 15),
('Ručak', 3.2, 'Punjena paprika s pireom', 15),
('Ručak', 2.8, 'Oslić na žaru s blitvom', 15),
('Ručak', 2.9, 'Tjestenina Alfredo', 15),
('Večera', 2.5, 'Pileći nuggetsi s BBQ umakom', 15),
('Večera', 2.6, 'Pasta Primavera', 15),
('Večera', 2.3, 'Salata od krumpira s jajima', 15),

-- Menza Express (ID: 16)
('Doručak', 1.3, 'Pecivo s maslacem i džemom', 16),
('Doručak', 1.2, 'Jogurt s granolom', 16),
('Doručak', 1.0, 'Kruh s maslinovim uljem', 16),
('Ručak', 3.4, 'Pileći batak s rižom', 16),
('Ručak', 3.0, 'Bečki odrezak s krumpirima', 16),
('Ručak', 2.7, 'Povrtni curry s rižom', 16),
('Večera', 2.5, 'Pizza Capricciosa', 16),
('Večera', 2.6, 'Burger s cheddar sirom', 16),
('Večera', 2.4, 'Zapečena tjestenina', 16);

-- Menza TTF (ID: 17)
INSERT INTO jelo (kategorija, cijena, naziv_jela, id_menza) VALUES
('Doručak', 1.5, 'Omlet sa sirom i šunkom', 17),
('Doručak', 1.2, 'Kroasan s maslacem', 17),
('Doručak', 1.0, 'Kiflica s marmeladom', 17),
('Ručak', 3.0, 'Pečena piletina s pečenim povrćem', 17),
('Ručak', 2.9, 'Riblji file s blitvom', 17),
('Ručak', 2.8, 'Rižoto s gljivama', 17),
('Večera', 2.6, 'Salata od tune i povrća', 17),
('Večera', 2.5, 'Pohana mozzarella', 17),
('Večera', 2.3, 'Pizza s povrćem', 17),

-- Menza RGNF-PBF (ID: 18)
('Doručak', 1.4, 'Zobena kaša s borovnicama', 18),
('Doručak', 1.3, 'Pecivo s jogurtom', 18),
('Doručak', 1.0, 'Kruh s namazom od lješnjaka', 18),
('Ručak', 3.2, 'Osso buco s povrćem', 18),
('Ručak', 3.0, 'Pileći file s umakom od gljiva', 18),
('Ručak', 2.9, 'Vegetarijanske tortilje', 18),
('Večera', 2.5, 'Burger s umakom od avokada', 18),
('Večera', 2.6, 'Pizza Prosciutto', 18),
('Večera', 2.4, 'Tuna salata s tjesteninom', 18),

-- Menza SC-a NSK (ID: 19)
('Doručak', 1.3, 'Kiflica sa sirom', 19),
('Doručak', 1.2, 'Sendvič s povrćem i feta sirom', 19),
('Doručak', 1.0, 'Jogurt s medom', 19),
('Ručak', 3.0, 'Lasagne Bolognese', 19),
('Ručak', 2.8, 'Zapečena piletina s povrćem', 19),
('Ručak', 2.7, 'Rižoto od povrća', 19),
('Večera', 2.5, 'Pizza Margherita', 19),
('Večera', 2.6, 'Pileći kebab', 19),
('Večera', 2.4, 'Tjestenina Carbonara', 19),

-- Restoran Filozofski fakultet (ID: 20)
('Doručak', 1.4, 'Omlet s povrćem', 20),
('Doručak', 1.2, 'Palačinke s marmeladom', 20),
('Doručak', 1.1, 'Čokolino', 20),
('Ručak', 3.1, 'Punjene paprike s pire krumpirom', 20),
('Ručak', 3.0, 'Pečeni losos s povrćem na pari', 20),
('Ručak', 2.9, 'Musaka od krumpira i mljevenog mesa', 20),
('Večera', 2.7, 'Tortilja s piletinom i povrćem', 20),
('Večera', 2.5, 'Quiche s brokulom i sirom', 20),
('Večera', 2.6, 'Burger s piletinom i umakom od jogurta', 20),

-- Menza ZUK Borongaj (ID: 21)
('Doručak', 1.5, 'Croissant s čokoladom', 21),
('Doručak', 1.3, 'Kajgana s tostom', 21),
('Doručak', 1.2, 'Voćni jogurt', 21),
('Ručak', 3.2, 'Pohana piletina s krumpir salatom', 21),
('Ručak', 3.1, 'Grah s kobasicom', 21),
('Ručak', 2.9, 'Tjestenina s pestom i povrćem', 21),
('Večera', 2.6, 'Burger s goveđim mesom', 21),
('Večera', 2.7, 'Hot dog s umakom od senfa', 21),
('Večera', 2.5, 'Pečena palačinka s povrćem i sirom', 21),


--  Menza TVZ (ID:22)
('Doručak', 1.4, 'Tost sa šunkom i sirom', 22),
('Doručak', 1.3, 'Jogurt s müsli žitaricama', 22),
('Doručak', 1.2, 'Medena kiflica', 22),
('Ručak', 3.1, 'Pečena svinjetina s kroketima', 22),
('Ručak', 3.0, 'Čevapi s lepinjom i ajvarom', 22),
('Ručak', 2.8, 'Špageti s tunom i maslinama', 22),
('Večera', 2.6, 'Tost pizza s povrćem', 22),
('Večera', 2.7, 'Zapečene lazanje s tikvicama', 22),
('Večera', 2.5, 'Krem juha od rajčice s krutonima', 22),

-- Menza Cassandra (ID:23)
('Doručak', 1.5, 'Mliječni kruh s maslacem i marmeladom', 23),
('Doručak', 1.4, 'Omlet s gljivama', 23),
('Doručak', 1.2, 'Banana s kikiriki maslacem', 23),
('Ručak', 3.2, 'Bečki odrezak s rižom i povrćem', 23),
('Ručak', 3.0, 'Pileći file u umaku od gljiva', 23),
('Ručak', 2.9, 'Vegetarijanski burger s pečenim krumpirom', 23),
('Večera', 2.7, 'Rižoto s morskim plodovima', 23),
('Večera', 2.6, 'Tjestenina s umakom od rajčice i parmezanom', 23),
('Večera', 2.5, 'Pita od špinata i sira', 23),

-- Menza Cassandra BRZA (ID: 24)
('Doručak', 1.4, 'Čokoladni muffin', 24),
('Doručak', 1.3, 'Tost s avokadom', 24),
('Doručak', 1.2, 'Smoothie od banane i jagode', 24),
('Ručak', 3.3, 'Pečena riba s blitvom i krumpirom', 24),
('Ručak', 3.1, 'Musaka od tikvica i mesa', 24),
('Ručak', 2.9, 'Pohana puretina s pireom od batata', 24),
('Večera', 2.8, 'Zapečeni njoki sa sirom', 24),
('Večera', 2.7, 'Švedske mesne okruglice s pireom', 24),
('Večera', 2.5, 'Palačinke s nutellom i šlagom', 24),

-- Menza Odeon (ID: 25)
('Doručak', 1.4, 'Pekarski sendvič s jajima', 25),
('Doručak', 1.3, 'Jogurt s medom i orasima', 25),
('Doručak', 1.2, 'Krafna s marmeladom', 25),
('Ručak', 3.2, 'Janjetina s restanim krumpirom', 25),
('Ručak', 3.0, 'Punjena paprika s pire krumpirom', 25),
('Ručak', 2.9, 'Tjestenina s četiri vrste sira', 25),
('Večera', 2.7, 'Pohani sir s tartar umakom', 25),
('Večera', 2.6, 'Krumpiruša s jogurtom', 25),
('Večera', 2.5, 'Krem juha od brokule', 25),

-- Menza VEMAG (ID: 26)
('Doručak', 1.5, 'Brioche s krem sirom i šunkom', 26),
('Doručak', 1.3, 'Omlet s paprikom i sirom', 26),
('Doručak', 1.2, 'Voćna salata s jogurtom', 26),
('Ručak', 3.4, 'Svinjski kotlet s pečenim povrćem', 26),
('Ručak', 3.2, 'Pileći paprikaš s njokima', 26),
('Ručak', 3.0, 'Lazanje s povrćem', 26),
('Večera', 2.8, 'Pohani oslić s krumpir salatom', 26),
('Večera', 2.7, 'Zapečeni sendvič sa šunkom i sirom', 26),
('Večera', 2.5, 'Pita od jabuka s cimetom', 26);