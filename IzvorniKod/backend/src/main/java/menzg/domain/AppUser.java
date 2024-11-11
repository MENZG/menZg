package menzg.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import menzgenums.Role;


@Entity
@Table(name = "appuser") // Ova anotacija mapira klasu na tabelu "appuser" u bazi podataka.
@Inheritance(strategy = InheritanceType.JOINED) // Strategija za nasledstvo; omogućava da nasleđene klase budu smeštene u zasebnim tabelama, a da zadrže zajednička polja iz osnovne klase.
@d // Lombok anotacija koja automatski generira gettere, settere, kao i toString, equals, i hashCode metode za sva polja klase.
@NoArgsConstructor // Lombok anotacija koja generira prazan konstruktor (bez argumenata).
@AllArgsConstructor // Lombok anotacija koja generira konstruktor sa svim poljima klase.
public class AppUser {

    @Id // Ova anotacija označava primarni ključ tabele.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Generira vrednost primarnog ključa automatski u bazi (koristi se AUTO_INCREMENT).
    @Column(name = "idAppUser") // Mapira ovo polje na kolonu "idAppUser" u tabeli.
    private Long idUser; // Identifikator korisnika (primarni ključ).

    @Column(name = "passwordAppUser", nullable = false) // Mapira polje na kolonu "passwordAppUser" koja mora biti popunjena (ne može biti null).
    private String passwordUser; // Lozinka korisnika.

    @Column(name = "usernameAppUser", nullable = false, unique = true) // Mapira polje na kolonu "usernameAppUser", koja mora biti jedinstvena i popunjena.
    private String usernameUser; // Korisničko ime korisnika.

    private Role userType; // Tip korisnika (koristi enumeraciju "Role" za specificiranje tipova korisnika).

    
    
    // Specifično za tip korisnika student
    @Column(name = "jmbag", unique = true) // Mapira polje na kolonu "jmbag" koja mora biti jedinstvena (koristi se samo za studente).
    private String jmbag; // JMBAG studenta (identifikacijski broj specifičan za studente).

    @Column(name = "genderStudent") // Mapira polje na kolonu "genderStudent" (opcionalno).
    private String genderStudent; // Pol korisnika studenta.

    @Column(name = "ageStudent") // Mapira polje na kolonu "ageStudent" (opcionalno).
    private Integer ageStudent; // Starost korisnika studenta.

    // Specifično za tip korisnika zaposlenik
    @ManyToOne // Postavlja vezu "many-to-one" između korisnika i menze (canteen).
    @JoinColumn(name = "canteen_id_canteen") // Određuje da će se ovo polje mapirati na kolonu "canteen_id_canteen" u tabeli.
    private Canteen canteen; // Menza (canteen) u kojoj korisnik zaposlenik radi.
}
