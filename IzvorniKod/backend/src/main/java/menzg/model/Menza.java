package menzg.model;

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
@Table(name = "menza")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Menza {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // Automatski generirani ID
	@Column(name = "idMenza") // Ime kolone u tablici
	private Long idMenza; // Primarni ključ, tipičan ID entiteta

	@Column(name = "imeMenze", nullable = false, unique = true) // Ime menze, ne može biti NULL i mora biti jedinstveno
	private String imeMenze;

	@Column(name = "lokacija", nullable = false) // Lokacija menze, ne može biti NULL
	private String lokacija;

	// Getteri, setteri i ostale metode automatski generirani s Lombokom
}
