package menzg.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "obrok") // Tablica 'PORUKA' u bazi podataka
@Data // Lombok anotacija koja generira gettere, settere, toString, equals, hashCode
@NoArgsConstructor // Generira prazan konstruktor
@AllArgsConstructor // Generira konstruktor sa svim parametrima
public class Obrok {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // Automatski generisani ID
	private Long idObrok; // Primarni ključ

	private String tipObroka; // doručak, ručak, večera

}
