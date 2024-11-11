


-- Unos podataka u tablicu korisnik
INSERT INTO korisnik (lozinka, username)
VALUES ('password1', 'student1'),
       ('password2', 'student2'),
       ('password3', 'student3'),
       ('password4', 'student4');

INSERT INTO student (id_korisnik, spol, dob) 
VALUES (1, 'M', 20), 
       (2, 'F', 22), 
       (3, 'M', 21), 
       (4, 'F', 23);