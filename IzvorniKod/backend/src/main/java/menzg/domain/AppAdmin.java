package menzg.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "appadmin")
@Data // Generira settere za sve atribute
@NoArgsConstructor // Generira prazan konstruktor
@AllArgsConstructor // Generira konstruktor sa svim parametrima
@ToString // Generira toString metodu
public class AppAdmin {

	@Id
	@Column(name = "idKorisnik")
	private Long idKorisnik; // Ovo je strani ključ koji referencira Korisnika

	// Relacija jedan na jedan između Admin i Korisnik entiteta
	@OneToOne
	@JoinColumn(name = "idKorisnik", insertable = false, updatable = false)
	// povezujem s drugom tablicom
	private Korisnik korisnik; // Povezujemo sa `Korisnik` entitetom

	// Specifični atributi za admina mogu se dodati ovdje
	@Column(name = "admin_status")
	private String adminStatus; // Dodatni atribut za admina, npr. status admina
}