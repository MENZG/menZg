package menzg.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "kamera")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Kamera {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // Automatsko generiranje id-a, identičan s auto_increment u //
	// SQL-u
	@Column(name = "idKamera") // Ovdje specificiramo naziv kolone
	private Long idKamera; // Jedinstveni identifikator za Kameru

	@Column(name = "URL", nullable = false) // Kolona za URL kamere, koja ne može biti NULL
	private String URL; // URL kamere

	@OneToOne
	@JoinColumn(name = "idRestoran", nullable = false) // Spoljni ključ koji referencira Restoran
	private Restoran restoran; // Povezivanje s entitetom Restoran

}
