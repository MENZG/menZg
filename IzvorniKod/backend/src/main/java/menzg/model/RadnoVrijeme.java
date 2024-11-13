package menzg.model;

import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

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
@Table(name = "RadnoVrijeme")
@Data // Generira settere za sve atribute
@NoArgsConstructor // Generira prazan konstruktor
@AllArgsConstructor // Generira konstruktor sa svim parametrima
public class RadnoVrijeme {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idRadnoVrijeme;

	@Column(name = "dan")
	private String dan;

	@Column(name = "pocetak") // Dozvoljava NULL vrednost
	private LocalTime pocetak;

	@Column(name = "kraj") // Dozvoljava NULL vrednost
	private LocalTime kraj;

	@ManyToOne
	@JoinColumn(name = "idMenza") // Ovdje je strani ključ prema Menza tablici
	@JsonBackReference
	private Menza menza; // Svako radno vrijeme je povezano s jednom menzom

	@Override
	public String toString() {
		return "RadnoVrijeme [idRadnoVrijeme=" + idRadnoVrijeme + ", dan=" + dan + ", pocetak=" + pocetak + ", kraj="
				+ kraj + "]";
	}

}
