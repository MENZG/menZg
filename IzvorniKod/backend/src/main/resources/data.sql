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
    ('Menza Cassandra', 'Ulica grada Vukovara 39, Zagreb'), --22
    ('Menza Cassandra BRZA', 'Ulica grada Vukovara 39, Zagreb'), --23
    ('Menza Odeon', 'Ulica Andrije Kačića Miošića 26, Zagreb'), --24
    ('Menza VEMAG', 'Horvatovac 102a, Zagreb'), --25


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
  -- Menza Lašćina - LINIJA 1
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '08:00:00', '20:30:00', 1),  -- Jutarnja smjena
    ('Utorak', '08:00:00', '20:30:00', 1),        -- Kasnija smjena
    ('Srijeda', '08:00:00', '20:30:00', 1),        -- Rano jutro
    ('Četvrtak', '08:00:00', '20:30:00', 1),                    -- Nema rada
    ('Petak', '08:00:00', '20:30:00', 1),          -- Standardno radno vrijeme
    ('Subota', '08:00:00', '15:30:00', 1),                      -- Zatvoreno
    ('Nedjelja', NULL,  NULL, 1);       -- Jutarnja smjena

-- Menza Lašćina - LINIJA 2
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '08:30:00', '16:30:00', 2),    -- Jutarnja smjena s pomaknutim početkom
    ('Utorak', '12:00:00', '20:00:00', 2),          -- Kasnija smjena
    ('Srijeda', '07:00:00', '15:00:00', 2),         -- Rano jutro
    ('Četvrtak', NULL, NULL, 2),                    -- Nema rada
    ('Petak', '09:00:00', '17:00:00', 2),           -- Standardno radno vrijeme
    ('Subota', NULL, NULL, 2),                      -- Zatvoreno
    ('Nedjelja', '08:00:00', '16:00:00', 2);        -- Jutarnja smjena

-- Menza Borongaj - LINIJA 1
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '08:00:00', '16:00:00', 3),    -- Standardna smjena
    ('Utorak', '09:30:00', '17:30:00', 3),          -- Pomaknuta smjena
    ('Srijeda', '07:00:00', '15:00:00', 3),         -- Rano jutro
    ('Četvrtak', '10:00:00', '18:00:00', 3),        -- Kasnija smjena
    ('Petak', NULL, NULL, 3),                       -- Nema rada
    ('Subota', NULL, NULL, 3),                      -- Zatvoreno
    ('Nedjelja', '08:00:00', '16:00:00', 3);        -- Jutarnja smjena

-- Menza Borongaj - LINIJA 2
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '09:00:00', '17:00:00', 4),    -- Standardna smjena
    ('Utorak', '12:00:00', '20:00:00', 4),          -- Kasna smjena
    ('Srijeda', NULL, NULL, 4),                     -- Nema rada
    ('Četvrtak', '08:00:00', '16:00:00', 4),        -- Jutarnja smjena
    ('Petak', NULL, NULL, 4),                       -- Zatvoreno
    ('Subota', '08:00:00', '16:00:00', 4),          -- Jutarnja smjena
    ('Nedjelja', NULL, NULL, 4);                    -- Zatvoreno

-- Menza Ekonomija
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '08:00:00', '16:00:00', 5),    -- Standardna smjena
    ('Utorak', '11:00:00', '19:00:00', 5),          -- Kasna smjena
    ('Srijeda', NULL, NULL, 5),                     -- Zatvoreno
    ('Četvrtak', '09:00:00', '17:00:00', 5),        -- Standardna smjena
    ('Petak', NULL, NULL, 5),                       -- Zatvoreno
    ('Subota', NULL, NULL, 5),                      -- Nema rada
    ('Nedjelja', '10:00:00', '18:00:00', 5);        -- Kasnija smjena

-- Menza Medicine
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '07:00:00', '15:00:00', 6),    -- Rano jutro
    ('Utorak', '08:00:00', '16:00:00', 6),          -- Jutarnja smjena
    ('Srijeda', '10:00:00', '18:00:00', 6),         -- Kasnija smjena
    ('Četvrtak', NULL, NULL, 6),                    -- Zatvoreno
    ('Petak', '08:00:00', '16:00:00', 6),           -- Jutarnja smjena
    ('Subota', NULL, NULL, 6),                      -- Zatvoreno
    ('Nedjelja', NULL, NULL, 6);                    -- Zatvoreno
    
-- Menza Medicine
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '07:00:00', '15:00:00', 7),    -- Rano jutro
    ('Utorak', '08:00:00', '16:00:00', 7),          -- Jutarnja smjena
    ('Srijeda', '10:00:00', '18:00:00', 7),         -- Kasnija smjena
    ('Četvrtak', NULL, NULL, 7),                    -- Zatvoreno
    ('Petak', '08:00:00', '16:00:00', 7),           -- Jutarnja smjena
    ('Subota', NULL, NULL, 7),                      -- Zatvoreno
    ('Nedjelja', NULL, NULL, 7);                    -- Zatvoreno

-- Menza FER - LINIJA 1
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '08:00:00', '16:00:00', 8),    -- Jutarnja smjena
    ('Utorak', '09:00:00', '17:00:00', 8),         -- Jutarnja smjena
    ('Srijeda', '08:00:00', '16:00:00', 8),        -- Jutarnja smjena
    ('Četvrtak', '08:00:00', '16:00:00', 8),       -- Jutarnja smjena
    ('Petak', '09:00:00', '17:00:00', 8),          -- Jutarnja smjena
    ('Subota', NULL, NULL, 8),                     -- Zatvoreno
    ('Nedjelja', NULL, NULL, 8);                   -- Zatvoreno

-- Menza FER - BRZA
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '07:30:00', '15:30:00', 9),    -- Jutarnja smjena
    ('Utorak', '08:30:00', '16:30:00', 9),          -- Jutarnja smjena
    ('Srijeda', '07:30:00', '15:30:00', 9),         -- Jutarnja smjena
    ('Četvrtak', '08:00:00', '16:00:00', 9),        -- Jutarnja smjena
    ('Petak', '07:30:00', '15:30:00', 9),           -- Jutarnja smjena
    ('Subota', NULL, NULL, 9),                      -- Zatvoreno
    ('Nedjelja', NULL, NULL, 9);                    -- Zatvoreno

-- Menza Stjepan Radić BRZA
-- Menza 10 - LINIJA 1
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '08:00:00', '16:00:00', 10),    -- Jutarnja smjena
    ('Utorak', '09:00:00', '17:00:00', 10),         -- Jutarnja smjena
    ('Srijeda', '08:00:00', '16:00:00', 10),        -- Jutarnja smjena
    ('Četvrtak', '08:00:00', '16:00:00', 10),       -- Jutarnja smjena
    ('Petak', '09:00:00', '17:00:00', 10),          -- Jutarnja smjena
    ('Subota', NULL, NULL, 10),                     -- Zatvoreno
    ('Nedjelja', NULL, NULL, 10);                   -- Zatvoreno

-- Menza 11 - LINIJA 1
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '07:00:00', '15:00:00', 11),    -- Rano jutro
    ('Utorak', '08:30:00', '16:30:00', 11),          -- Jutarnja smjena
    ('Srijeda', '09:00:00', '17:00:00', 11),         -- Standardna smjena
    ('Četvrtak', '08:00:00', '16:00:00', 11),        -- Jutarnja smjena
    ('Petak', '07:30:00', '15:30:00', 11),           -- Jutarnja smjena
    ('Subota', NULL, NULL, 11),                      -- Zatvoreno
    ('Nedjelja', NULL, NULL, 11);                    -- Zatvoreno

-- Menza 12 - LINIJA 1
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '08:00:00', '16:00:00', 12),    -- Jutarnja smjena
    ('Utorak', '09:00:00', '17:00:00', 12),         -- Jutarnja smjena
    ('Srijeda', '08:00:00', '16:00:00', 12),        -- Jutarnja smjena
    ('Četvrtak', '08:00:00', '16:00:00', 12),       -- Jutarnja smjena
    ('Petak', '09:00:00', '17:00:00', 12),          -- Jutarnja smjena
    ('Subota', NULL, NULL, 12),                     -- Zatvoreno
    ('Nedjelja', NULL, NULL, 12);                   -- Zatvoreno

    
   -- Menza Građevinski fakultet
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '08:00:00', '16:00:00', 13),   -- Jutarnja smjena
    ('Utorak', '08:00:00', '16:00:00', 13),         -- Jutarnja smjena
    ('Srijeda', '08:30:00', '16:30:00', 13),        -- Jutarnja smjena
    ('Četvrtak', NULL, NULL, 13),                   -- Zatvoreno
    ('Petak', '08:00:00', '16:00:00', 13),          -- Jutarnja smjena
    ('Subota', NULL, NULL, 13),                     -- Zatvoreno
    ('Nedjelja', NULL, NULL, 13);                   -- Zatvoreno

-- Menza Fakultet elektrotehnike i računarstva
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '08:00:00', '16:00:00', 14),   -- Jutarnja smjena
    ('Utorak', '08:30:00', '16:30:00', 14),         -- Jutarnja smjena
    ('Srijeda', '09:00:00', '17:00:00', 14),        -- Jutarnja smjena
    ('Četvrtak', '08:30:00', '16:30:00', 14),       -- Jutarnja smjena
    ('Petak', '09:00:00', '17:00:00', 14),          -- Jutarnja smjena
    ('Subota', NULL, NULL, 14),                     -- Zatvoreno
    ('Nedjelja', NULL, NULL, 14);                   -- Zatvoreno

-- Menza Prirodoslovno-matematički fakultet
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '08:00:00', '16:00:00', 15),   -- Jutarnja smjena
    ('Utorak', '08:00:00', '16:00:00', 15),         -- Jutarnja smjena
    ('Srijeda', '08:30:00', '16:30:00', 15),        -- Jutarnja smjena
    ('Četvrtak', '08:00:00', '16:00:00', 15),       -- Jutarnja smjena
    ('Petak', '08:30:00', '16:30:00', 15),          -- Jutarnja smjena
    ('Subota', NULL, NULL, 15),                     -- Zatvoreno
    ('Nedjelja', NULL, NULL, 15);                   -- Zatvoreno

-- Menza Kineziološki fakultet
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '08:00:00', '16:00:00', 16),   -- Jutarnja smjena
    ('Utorak', '08:00:00', '16:00:00', 16),         -- Jutarnja smjena
    ('Srijeda', '08:30:00', '16:30:00', 16),        -- Jutarnja smjena
    ('Četvrtak', '08:00:00', '16:00:00', 16),       -- Jutarnja smjena
    ('Petak', '08:00:00', '16:00:00', 16),          -- Jutarnja smjena
    ('Subota', NULL, NULL, 16),                     -- Zatvoreno
    ('Nedjelja', NULL, NULL, 16);                   -- Zatvoreno

-- Menza Agronomski fakultet
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '08:00:00', '16:00:00', 17),   -- Jutarnja smjena
    ('Utorak', '08:30:00', '16:30:00', 17),         -- Jutarnja smjena
    ('Srijeda', '09:00:00', '17:00:00', 17),        -- Jutarnja smjena
    ('Četvrtak', '08:00:00', '16:00:00', 17),       -- Jutarnja smjena
    ('Petak', '08:00:00', '16:00:00', 17),          -- Jutarnja smjena
    ('Subota', NULL, NULL, 17),                     -- Zatvoreno
    ('Nedjelja', NULL, NULL, 17);                   -- Zatvoreno

-- Menza PMF
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '08:00:00', '16:00:00', 18),   -- Jutarnja smjena
    ('Utorak', '08:00:00', '16:00:00', 18),         -- Jutarnja smjena
    ('Srijeda', '08:30:00', '16:30:00', 18),        -- Jutarnja smjena
    ('Četvrtak', '08:00:00', '16:00:00', 18),       -- Jutarnja smjena
    ('Petak', '08:00:00', '16:00:00', 18),          -- Jutarnja smjena
    ('Subota', NULL, NULL, 18),                     -- Zatvoreno
    ('Nedjelja', NULL, NULL, 18);            

-- Tablica za jelovnike (kategorije: Doručak, Ručak, Večera)
INSERT INTO jelo (kategorija, cijena, naziv_jela, id_menza) VALUES
-- Menza Lašćina - LINIJA 1 (ID: 1)
('Doručak', 1.5, 'Jaja s pancetom', 1),
('Doručak', 1.2, 'Pecivo s maslacem i džemom', 1),
('Doručak', 1.0, 'Čokolino', 1),
('Ručak', 2.5, 'Pečena piletina s povrćem', 1),
('Ručak', 2.2, 'Rižoto s gljivama', 1),
('Ručak', 2.0, 'Pasta Primavera', 1),
('Večera', 2.3, 'Sendvič s tunjevinom', 1),
('Večera', 2.5, 'Pečena riba s blitvom', 1),
('Večera', 1.8, 'Pizza Margherita', 1),

-- Menza Lašćina - LINIJA 2 (ID: 2)
('Doručak', 1.5, 'Kajgana s povrćem', 2),
('Doručak', 1.0, 'Kroasan s čokoladom', 2),
('Doručak', 1.2, 'Gris s kakaom', 2),
('Ručak', 3.0, 'Pohana piletina s pomfritom', 2),
('Ručak', 2.5, 'Punjene paprike', 2),
('Ručak', 2.8, 'Lasagne', 2),
('Večera', 2.3, 'Špageti Carbonara', 2),
('Večera', 2.7, 'Burger s pomfritom', 2),
('Večera', 2.0, 'Vegetarijanski rižoto', 2),

-- Menza Borongaj - LINIJA 1 (ID: 3)
('Doručak', 1.3, 'Palačinke s medom', 3),
('Doručak', 1.0, 'Sendvič sa sirom i šunkom', 3),
('Doručak', 1.2, 'Žitarice s mlijekom', 3),
('Ručak', 3.2, 'Grah s kobasicom', 3),
('Ručak', 2.8, 'Zapečeni krumpir s mesom', 3),
('Ručak', 2.5, 'Pileći medaljoni s rižom', 3),
('Večera', 2.3, 'Salata s tunjevinom', 3),
('Večera', 2.7, 'Pizza s povrćem', 3),
('Večera', 2.2, 'Ćevapi s lepinjom', 3),

-- Menza Borongaj - LINIJA 2 (ID: 4)
('Doručak', 1.3, 'Omelette sa šunkom', 4),
('Doručak', 1.2, 'Jogurt s muslijem', 4),
('Doručak', 1.0, 'Kiflica s maslacem', 4),
('Ručak', 2.9, 'Bečki odrezak s krumpirom', 4),
('Ručak', 3.0, 'Punjena pileća prsa', 4),
('Ručak', 2.8, 'Šunka u tijestu', 4),
('Večera', 2.4, 'Tuna salata s jajima', 4),
('Večera', 2.7, 'Hot dog s prilozima', 4),
('Večera', 2.1, 'Pohane tikvice s krumpir salatom', 4),

-- Menza Ekonomija (ID: 5)
('Doručak', 1.0, 'Muesli s jogurtom', 5),
('Doručak', 1.2, 'Tost sa sirom', 5),
('Doručak', 1.3, 'Kukuruzna kaša', 5),
('Ručak', 3.5, 'Svinjski kotlet s prilogom', 5),
('Ručak', 3.0, 'Punjeni lignji s povrćem', 5),
('Ručak', 2.5, 'Gulaš s njokima', 5),
('Večera', 2.2, 'Sendvič s piletinom', 5),
('Večera', 2.7, 'Zapečeni grah s kobasicom', 5),
('Večera', 2.0, 'Vegetarijanski wrap', 5),

-- Menza Medicine (ID: 6)
('Doručak', 1.2, 'Palačinke s marmeladom', 6),
('Doručak', 1.0, 'Čokoladno pecivo', 6),
('Doručak', 1.1, 'Kukuruzni kruh s maslacem', 6),
('Ručak', 3.0, 'Lazanje s mljevenim mesom', 6),
('Ručak', 2.8, 'Zapečena tjestenina s povrćem', 6),
('Ručak', 2.6, 'Grah s kobasicom', 6),
('Večera', 2.3, 'Pizza Capricciosa', 6),
('Večera', 2.7, 'Riblji file s povrćem', 6),
('Večera', 2.1, 'Pohana riba s tartarom', 6);

-- Menza Veterina (ID: 7)
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

-- Menza FER - LINIJA 1 (ID: 8)
('Doručak', 1.5, 'Kajgana sa špekom', 8),
('Doručak', 1.0, 'Jogurt s pahuljicama', 8),
('Doručak', 1.2, 'Kruh s maslacem i medom', 8),
('Ručak', 3.2, 'Bečki odrezak s pomfritom', 8),
('Ručak', 3.0, 'Piletina u umaku od gljiva', 8),
('Ručak', 2.8, 'Zapečene lazanje', 8),
('Večera', 2.4, 'Salata s feta sirom', 8),
('Večera', 2.5, 'Pizza Funghi', 8),
('Večera', 2.2, 'Sendvič s povrćem', 8),

-- Menza FER - BRZA (ID: 9)
('Doručak', 1.3, 'Pecivo sa sirom', 9),
('Doručak', 1.0, 'Sendvič s maslacem', 9),
('Doručak', 1.2, 'Zobena kaša s voćem', 9),
('Ručak', 3.0, 'Pečeni losos s povrćem', 9),
('Ručak', 2.7, 'Rižoto od kozica', 9),
('Ručak', 2.8, 'Pohana puretina s pireom', 9),
('Večera', 2.5, 'Burger s BBQ umakom', 9),
('Večera', 2.3, 'Špageti Bolonjez', 9),
('Večera', 2.1, 'Vegetarijanski wrap', 9),

-- Menza Stjepan Radić BRZA (ID: 10)
('Doručak', 1.5, 'Omlet s gljivama', 10),
('Doručak', 1.2, 'Kiflica sa šunkom i sirom', 10),
('Doručak', 1.0, 'Jogurt s medom', 10),
('Ručak', 3.5, 'Punjeni odrezak u umaku od vrganja', 10),
('Ručak', 3.0, 'Pileći file s povrćem na žaru', 10),
('Ručak', 2.9, 'Njoki u pestu', 10),
('Večera', 2.5, 'Pizza s mozzarellom', 10),
('Večera', 2.7, 'Pileći wok s rezancima', 10),
('Večera', 2.3, 'Salata s jajima', 10),

-- Menza Stjepan Radić RESTORAN 1 (ID: 11)
('Doručak', 1.5, 'Palačinke s nutellom', 11),
('Doručak', 1.3, 'Sendvič s puretinom', 11),
('Doručak', 1.0, 'Kiflica s margarinom', 11),
('Ručak', 3.2, 'Pohana teletina s krumpir salatom', 11),
('Ručak', 2.8, 'Rižoto s piletinom', 11),
('Ručak', 3.0, 'Zapečeni grah s mesom', 11),
('Večera', 2.4, 'Burger s povrćem', 11),
('Večera', 2.5, 'Špageti s umakom od rajčice', 11),
('Večera', 2.3, 'Pizza Vegetariana', 11);

-- Menza Stjepan Radić RESTORAN 2 (ID: 12)
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

-- Menza Građevinski fakultet (ID: 13)
('Doručak', 1.4, 'Sendvič s tunjevinom', 13),
('Doručak', 1.2, 'Kroasan s marmeladom', 13),
('Doručak', 1.0, 'Žitarice s mlijekom', 13),
('Ručak', 3.0, 'Ćevapi s ajvarom i lepinjom', 13),
('Ručak', 2.7, 'Pohana piletina s blitvom', 13),
('Ručak', 2.8, 'Pečena puretina s pireom', 13),
('Večera', 2.3, 'Salata od tune', 13),
('Večera', 2.7, 'Pasta Carbonara', 13),
('Večera', 2.0, 'Sendvič s avokadom', 13),

-- Menza Fakultet elektrotehnike i računarstva (ID: 14)
('Doručak', 1.4, 'Sendvič s pršutom i sirom', 14),
('Doručak', 1.3, 'Kiflica s maslacem', 14),
('Doručak', 1.1, 'Zobena kaša s grožđicama', 14),
('Ručak', 3.5, 'Beef Stroganoff s rižom', 14),
('Ručak', 3.2, 'Grilana piletina s povrćem', 14),
('Ručak', 3.0, 'Njoki u umaku od rajčice', 14),
('Večera', 2.6, 'Pizza Pepperoni', 14),
('Večera', 2.7, 'Taco s piletinom i salsom', 14),
('Večera', 2.4, 'Salata od tune s tjesteninom', 14);


-- Menza Prirodoslovno-matematički fakultet (ID: 15)
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

-- Menza Kineziološki fakultet (ID: 16)
('Doručak', 1.3, 'Pecivo s maslacem i džemom', 16),
('Doručak', 1.2, 'Jogurt s granolom', 16),
('Doručak', 1.0, 'Kruh s maslinovim uljem', 16),
('Ručak', 3.4, 'Pileći batak s rižom', 16),
('Ručak', 3.0, 'Bečki odrezak s krumpirima', 16),
('Ručak', 2.7, 'Povrtni curry s rižom', 16),
('Večera', 2.5, 'Pizza Capricciosa', 16),
('Večera', 2.6, 'Burger s cheddar sirom', 16),
('Večera', 2.4, 'Zapečena tjestenina', 16);



-- Menza Agronomski fakultet (ID: 17)
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

-- Menza PMF (ID: 18)
('Doručak', 1.4, 'Zobena kaša s borovnicama', 18),
('Doručak', 1.3, 'Pecivo s jogurtom', 18),
('Doručak', 1.0, 'Kruh s namazom od lješnjaka', 18),
('Ručak', 3.2, 'Osso buco s povrćem', 18),
('Ručak', 3.0, 'Pileći file s umakom od gljiva', 18),
('Ručak', 2.9, 'Vegetarijanske tortilje', 18),
('Večera', 2.5, 'Burger s umakom od avokada', 18),
('Večera', 2.6, 'Pizza Prosciutto', 18),
('Večera', 2.4, 'Tuna salata s tjesteninom', 18),

-- Menza Muzička akademija (ID: 19)
('Doručak', 1.3, 'Kiflica sa sirom', 19),
('Doručak', 1.2, 'Sendvič s povrćem i feta sirom', 19),
('Doručak', 1.0, 'Jogurt s medom', 19),
('Ručak', 3.0, 'Lasagne Bolognese', 19),
('Ručak', 2.8, 'Zapečena piletina s povrćem', 19),
('Ručak', 2.7, 'Rižoto od povrća', 19),
('Večera', 2.5, 'Pizza Margherita', 19),
('Večera', 2.6, 'Pileći kebab', 19),
('Večera', 2.4, 'Tjestenina Carbonara', 19);
