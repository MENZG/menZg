


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
