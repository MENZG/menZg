INSERT INTO korisnik (lozinka, username, role, godine, spol) VALUES
('password123', 'nikolab2609@gmail.com', 3, 35, 'Muški'),
('password123', 'blazstuzic2@gmail.com', 2, 28, 'Muški'),
('password123', 'karla.sikavica@gmail.com', 1, 24, 'Ženski'), -- IMAT CE 1 DA MOZE S NIKOM TESTIRAT
('password123', 'eugenkozomara2904@gmail.com', 3, 40, 'Muški'),
('password123', 'anteaknezovic155@gmail.com', 3, 33, 'Ženski'),
('password123', 'rimacniko0@gmail.com', 3, 29, 'Muški'),
('password123', 'dakovicvalentin@gmail.com', 3, 38, 'Muški'),

('password123', 'user2@gmail.com', 1, 22, 'Ženski'),
('password123', 'user3@gmail.com', 1, 26, 'Ženski'),
('password123', 'user4@gmail.com', 2, 32, 'Muški'),
('password123', 'user5@gmail.com', 2, 31, 'Muški'),
('password123', 'user6@gmail.com', 2, 29, 'Muški'),
('password123', 'user7@gmail.com', 3, 35, 'Muški'),
('password123', 'user8@gmail.com', 3, 28, 'Ženski'),
('password123', 'user9@gmail.com', 1, 23, 'Ženski'),
('password123', 'user10@gmail.com', 1, 27, 'Muški');

    
  -- SQL za unos podataka o zagrebačkim menzama u tablicu `menza`

INSERT INTO radno_vrijeme (dan, pocetak, kraj) VALUES 
-- Jutarnje smene
('ponedjeljak', '08:00:00', '16:00:00'),
('utorak', '08:00:00', '16:00:00'),
('srijeda', '08:00:00', '16:00:00'),
('cetvrtak', '08:00:00', '16:00:00'),
('petak', '08:00:00', '16:00:00'),
('subota', '10:00:00', '14:00:00'),
('nedjelja', NULL, NULL), -- Nedjelja zatvoreno

-- Popodnevne smene
('ponedjeljak', '17:00:00', '21:00:00'),
('utorak', '17:00:00', '21:00:00'),
('srijeda', '17:00:00', '21:00:00'),
('cetvrtak', '17:00:00', '21:00:00'),
('petak', '17:00:00', '21:00:00'),
('subota', '17:00:00', '21:00:00'),
('nedjelja', NULL, NULL); -- Nedjelja zatvoreno


INSERT INTO menza (ime_Menze, lokacija)
VALUES
    ('Menza Lašćina - LINIJA 1', 'Laščinska cesta 32, Zagreb'), --1
    ('Menza Lašćina - LINIJA 2', 'Laščinska cesta 35, Zagreb'), --2
    ('Menza Borongaj - LINIJA 1', 'Borongajska cesta 83f, Zagreb'), --3
    ('Menza Borongaj - LINIJA 2', 'Borongajska cesta 85, Zagreb'), --4
    ('Menza Ekonomija', 'Trg Johna Kennedyja 6, Zagreb'), --5
    ('Menza Medicine', 'Šalata 3b, Zagreb'), --6
    ('Menza Veterina', 'Heinzelova 55, Zagreb'), --7
    ('Menza FER - LINIJA 1', 'Unska 16, Zagreb'), --8
    ('Menza FER - BRZA', 'Kačićeva 26, Zagreb'), --9
    ('Menza Stjepan Radić BRZA', 'Trg Stjepana Radića 2, Zagreb'), --10
    ('Menza Stjepan Radić RESTORAN 1', 'Trg Stjepana Radića 2, Zagreb'), --11
    ('Menza Stjepan Radić RESTORAN 2', 'Trg Stjepana Radića 2, Zagreb'), --12
    ('Menza Građevinski fakultet', 'Kačićeva 26, Zagreb'), --13
    ('Menza Fakultet elektrotehnike i računarstva', 'Unska 3, Zagreb'), --14
    ('Menza Prirodoslovno-matematički fakultet', 'Horvatovac 102a, Zagreb'), --15
    ('Menza Kineziološki fakultet', 'Horvaćanska 14, Zagreb'), --16
    ('Menza Agronomski fakultet', 'Svetošimunska 25, Zagreb'), --17
    ('Menza PMF', 'Bijenička cesta 30, Zagreb'), --18
    ('Menza Muzička akademija', 'Trg Republike Hrvatske 12, Zagreb'); --19

    
    
    --- RADNA VREMENA
  -- Menza Lašćina - LINIJA 1
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '08:00:00', '16:00:00', 1),  -- Jutarnja smjena
    ('Utorak', '10:00:00', '18:00:00', 1),        -- Kasnija smjena
    ('Srijeda', '07:00:00', '15:00:00', 1),        -- Rano jutro
    ('Četvrtak', NULL, NULL, 1),                    -- Nema rada
    ('Petak', '09:00:00', '17:00:00', 1),          -- Standardno radno vrijeme
    ('Subota', NULL, NULL, 1),                      -- Zatvoreno
    ('Nedjelja', '08:00:00', '16:00:00', 1);       -- Jutarnja smjena

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
