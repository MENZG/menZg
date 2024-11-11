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
@Table(name = "restoran") // Veza s tablicom "RESTORAN"
@Data // Lombok anotacija koja generira gettere, settere, toString, equals, hashCode
@NoArgsConstructor // Generira prazan konstruktor
@AllArgsConstructor // Generira konstruktor sa svim parametrima

public class Restoran {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idRestoran")
	private long idRestaurant;

	@Column(name = "imeRestorana", nullable = false, unique = true) // Ime restorana mora biti jedinstveno i ne može //
																	// biti NULL
	private String imeRestorana;

	@ManyToOne
	@JoinColumn(name = "idMenza", nullable = false) // Vanjski ključ prema tablici MENZA
	private Menza menza; // Povezivanje s entitetom Menza
}
