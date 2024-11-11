package menzg.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "student")
@Data // Generira settere za sve atribute
@NoArgsConstructor // Generira prazan konstruktor
@AllArgsConstructor // Generira konstruktor sa svim parametrima
// Generira toString metodu
public class Student {

	@Id
	@Column(name = "idKorisnik")
	private Long idKorisnik; // Ovo je strani ključ koji referencira Korisnika

	// Relacija jedan na jedan između Student i Korisnik entiteta
	@OneToOne
	@JoinColumn(name = "idKorisnik")
	private Korisnik korisnik; // Povezujemo sa `Korisnik` entitetom

	@Column(name = "spol") // Spol je tipično jedan znak (M/F ili sl.)
	private String spol;

	@Column(name = "dob")
	private Integer dob; // Dob studenta
}
