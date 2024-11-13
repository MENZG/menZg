
-- Unos podataka u tablicu korisnik
INSERT INTO korisnik (lozinka, username)
VALUES ('password1', 'student1'),
       ('password2', 'student2'),
       ('password3', 'student3'),
       ('password4', 'student4');

INSERT INTO student (id_korisnik, spol, dob)
VALUES (1, 'M', 20), 
       (2, 'F', 22), 
       (3, NULL, 21),  -- Ovde je spol NULL
       (4, 'F', 23);
       
       
       INSERT INTO korisnik (lozinka, username)
VALUES 
    ('123', 'admin1'),
    ('123', 'admin2'),
    ('123', 'admin3'),
    ('123', 'admin4');
    
    
    
    -- Unos admina u tablicu appadmin
INSERT INTO appadmin (id_Korisnik, admin_status)
VALUES
    (1, 'superadmin'),  -- 'admin1' je sada povezan sa 'superadmin' statusom
    (2, 'admin'),       -- 'admin2' je sada povezan sa 'admin' statusom
    (3, 'admin'),       -- 'admin3' je sada povezan sa 'admin' statusom
    (4, 'superadmin');  -- 'admin4' je sada povezan sa 'superadmin' statusom
    
    
    
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
    ('Menza Lašćina - LINIJA 1', 'Laščinska cesta 32, Zagreb'),
    ('Menza Lašćina - LINIJA 2', 'Laščinska cesta 35, Zagreb'),
    ('Menza Borongaj - LINIJA 1', 'Borongajska cesta 83f, Zagreb'),
    ('Menza Borongaj - LINIJA 2', 'Borongajska cesta 85, Zagreb'),
    ('Menza Ekonomija', 'Trg Johna Kennedyja 6, Zagreb'),
    ('Menza Medicine', 'Šalata 3b, Zagreb'),
    ('Menza Veterina', 'Heinzelova 55, Zagreb'),
    ('Menza FER - LINIJA 1', 'Unska 16, Zagreb'),
    ('Menza FER - BRZA', 'Kačićeva 26, Zagreb'),
    ('Menza Stjepan Radić BRZA', 'Trg Stjepana Radića 2, Zagreb'),
    ('Menza Stjepan Radić RESTORAN 1', 'Trg Stjepana Radića 2, Zagreb'),
    ('Menza Stjepan Radić RESTORAN 2', 'Trg Stjepana Radića 2, Zagreb'),
    ('Menza Građevinski fakultet', 'Kačićeva 26, Zagreb'),
    ('Menza Fakultet elektrotehnike i računarstva', 'Unska 3, Zagreb'),
    ('Menza Prirodoslovno-matematički fakultet', 'Horvatovac 102a, Zagreb'),
    ('Menza Kineziološki fakultet', 'Horvaćanska 14, Zagreb'),
    ('Menza Agronomski fakultet', 'Svetošimunska 25, Zagreb'),
    ('Menza PMF', 'Bijenička cesta 30, Zagreb'),
    ('Menza Muzička akademija', 'Trg Republike Hrvatske 12, Zagreb');

    
    
    --- RADNA VREMENA
    
    
    -- Menza Lašćina - LINIJA 1
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '08:00:00', '16:00:00', 1),  -- Jutarnja smjena
    ('Ponedjeljak', '16:00:00', '22:00:00', 1),  -- Popodnevna smjena
    ('Utorak', '08:00:00', '16:00:00', 1),        -- Jutarnja smjena
    ('Utorak', '16:00:00', '22:00:00', 1),        -- Popodnevna smjena
    ('Srijeda', '08:00:00', '16:00:00', 1),        -- Jutarnja smjena
    ('Srijeda', '16:00:00', '22:00:00', 1),        -- Popodnevna smjena
    ('Četvrtak', '08:00:00', '16:00:00', 1),       -- Jutarnja smjena
    ('Četvrtak', '16:00:00', '22:00:00', 1),       -- Popodnevna smjena
    ('Petak', '08:00:00', '16:00:00', 1),          -- Jutarnja smjena
    ('Petak', '16:00:00', '22:00:00', 1),          -- Popodnevna smjena
    ('Subota', '08:00:00', '16:00:00', 1),         -- Jutarnja smjena
    ('Subota', '16:00:00', '22:00:00', 1),         -- Popodnevna smjena
    ('Nedjelja', '08:00:00', '16:00:00', 1),       -- Jutarnja smjena
    ('Nedjelja', '16:00:00', '22:00:00', 1);       -- Popodnevna smjena

-- Menza Lašćina - LINIJA 2
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '08:00:00', '16:00:00', 2),  -- Jutarnja smjena
    ('Ponedjeljak', '16:00:00', '22:00:00', 2),  -- Popodnevna smjena
    ('Utorak', '08:00:00', '16:00:00', 2),        -- Jutarnja smjena
    ('Utorak', '16:00:00', '22:00:00', 2),        -- Popodnevna smjena
    ('Srijeda', '08:00:00', '16:00:00', 2),        -- Jutarnja smjena
    ('Srijeda', '16:00:00', '22:00:00', 2),        -- Popodnevna smjena
    ('Četvrtak', '08:00:00', '16:00:00', 2),       -- Jutarnja smjena
    ('Četvrtak', '16:00:00', '22:00:00', 2),       -- Popodnevna smjena
    ('Petak', '08:00:00', '16:00:00', 2),          -- Jutarnja smjena
    ('Petak', '16:00:00', '22:00:00', 2),          -- Popodnevna smjena
    ('Subota', '08:00:00', '16:00:00', 2),         -- Jutarnja smjena
    ('Subota', '16:00:00', '22:00:00', 2),         -- Popodnevna smjena
    ('Nedjelja', '08:00:00', '16:00:00', 2),       -- Jutarnja smjena
    ('Nedjelja', '16:00:00', '22:00:00', 2);       -- Popodnevna smjena

-- Menza Borongaj - LINIJA 1
INSERT INTO radno_vrijeme (dan, pocetak, kraj, id_Menza)
VALUES
    ('Ponedjeljak', '08:00:00', '16:00:00', 3),  -- Jutarnja smjena
    ('Ponedjeljak', '16:00:00', '22:00:00', 3),  -- Popodnevna smjena
    ('Utorak', '08:00:00', '16:00:00', 3),        -- Jutarnja smjena
    ('Utorak', '16:00:00', '22:00:00', 3),        -- Popodnevna smjena
    ('Srijeda', '08:00:00', '16:00:00', 3),        -- Jutarnja smjena
    ('Srijeda', '16:00:00', '22:00:00', 3),        -- Popodnevna smjena
    ('Četvrtak', '08:00:00', '16:00:00', 3),       -- Jutarnja smjena
    ('Četvrtak', '16:00:00', '22:00:00', 3),       -- Popodnevna smjena
    ('Petak', '08:00:00', '16:00:00', 3),          -- Jutarnja smjena
    ('Petak', '16:00:00', '22:00:00', 3),          -- Popodnevna smjena
    ('Subota', '08:00:00', '16:00:00', 3),         -- Jutarnja smjena
    ('Subota', '16:00:00', '22:00:00', 3),         -- Popodnevna smjena
    ('Nedjelja', '08:00:00', '16:00:00', 3),       -- Jutarnja smjena
    ('Nedjelja', '16:00:00', '22:00:00', 3);       -- Popodnevna smjena

-- Repeat the same process for all the other canteens

-- Menza Borongaj - LINIJA 2
-- Similar entries with `idMenza` set to 4
-- Menza Ekonomija
-- Menza Medicine
-- Menza Veterina
-- Menza FER - LINIJA 1
-- Menza FER - BRZA
-- Menza Stjepan Radić BRZA
-- Menza Stjepan Radić RESTORAN 1
-- Menza Stjepan Radić RESTORAN 2
-- Menza Građevinski fakultet
-- Menza Fakultet elektrotehnike i računarstva
-- Menza Prirodoslovno-matematički fakultet
-- Menza Kineziološki fakultet
-- Menza Agronomski fakultet
-- Menza PMF
-- Menza Muzička akademija

  
