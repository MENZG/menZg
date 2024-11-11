package menzg.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ocjena")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Ocjena {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idOcjena;

	@Column(name = "rating", nullable = false)
	private int rating;

	@Column(name = "kategorija", nullable = false)
	private String kategorija; // Kategorija ocjene (npr. "hrana", "usluga" itd.)

	@ManyToOne
	@JoinColumn(name = "idKorisnik", nullable = false)
	private Student korisnik; // Veza s entitetom Student (strani ključ)

	@ManyToOne
	@JoinColumn(name = "idMenza", nullable = false)
	private Menza menza; // Veza s entitetom Menza (strani ključ)

}
