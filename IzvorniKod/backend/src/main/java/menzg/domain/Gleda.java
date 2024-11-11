package menzg.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "gleda")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Gleda {

	@Id
	@ManyToOne
	@JoinColumn(name = "idKamera")
	Kamera kamera;

	@Id
	@ManyToOne
	@JoinColumn(name = "idKorisnik")
	private Korisnik korisnik; // Veza s chatom

}
