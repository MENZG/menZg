package menzg.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "favorit")
@Data // Generira gettere, settere, equals, hashCode i toString metodu
@NoArgsConstructor // Generira prazan konstruktor
@AllArgsConstructor // Generira konstruktor sa svim parametrima
public class Favorit {

	@Id
	@ManyToOne
	@JoinColumn(name = "idKorisnik", nullable = false)
	private Student korisnik;

	@Id
	@ManyToOne
	@JoinColumn(name = "idMenza", nullable = false)
	private Menza menza; // Veza s Menza entitetom (Menza koja je izabrana)

}