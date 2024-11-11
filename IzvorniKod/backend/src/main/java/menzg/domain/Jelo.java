package menzg.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "jelo") // Naziv tablice u bazi podataka
@Data // Generira gettere, settere, toString, equals, hashCode
@NoArgsConstructor // Generira prazan konstruktor
@AllArgsConstructor // Generira konstruktor sa svim parametrima
public class Jelo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // Automatski generirani ID
	@Column(name = "idJela") // Ime kolone u tablici
	private Long idJela; // Primarni ključ, tipičan ID entiteta

	@Column(name = "kategorija", nullable = false) // Kategorija jela, ne može biti NULL
	private String kategorija;

	@Column(name = "cijena", nullable = false) // Cijena jela, ne može biti NULL
	private Integer cijena;

	@Column(name = "nazivJela", nullable = false, unique = true) // Naziv jela, ne može biti NULL i mora biti
																	// jedinstveno
	private String nazivJela;

	// Getteri, setteri i ostale metode automatski generirani s Lombokom
}