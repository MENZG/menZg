package menzg.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "djelatnik")
@Data // Generira settere za sve atribute
@NoArgsConstructor // Generira prazan konstruktor
@AllArgsConstructor // Generira konstruktor sa svim parametrima
// Generira toString metodu
public class Djelatnik {

	@Id
	@Column(name = "idKorisnik")
	private Long idKorisnik; // Ovo je strani ključ koji referencira Korisnika

	// Relacija jedan na jedan između Student i Korisnik entiteta
	@OneToOne
	@JoinColumn(name = "idKorisnik", insertable = false, updatable = false)
	@MapsId
	private Korisnik korisnik; // Povezujemo sa `Korisnik` entitetom

	@ManyToOne
	@JoinColumn(name = "idMenza", nullable = false)
	private Menza menza; // Povezivanje sa menzom gdje djelatnik radi

}