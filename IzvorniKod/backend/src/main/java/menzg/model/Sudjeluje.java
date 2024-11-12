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
@Table(name = "sudjeluje")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Sudjeluje {

	@Id
	@ManyToOne
	@JoinColumn(name = "idKorisnik")
	private Korisnik korisnik; // Veza s korisnikom (može biti Admin ili Student)

	@Id
	@ManyToOne
	@JoinColumn(name = "idChat")
	private Chat chat; // Veza s chatom

}
