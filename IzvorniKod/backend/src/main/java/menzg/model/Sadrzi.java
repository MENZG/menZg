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
@Table(name = "sadrzi")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Sadrzi {

	@Id
	@ManyToOne
	@JoinColumn(name = "idObrok")
	Obrok obrok;

	@Id
	@ManyToOne
	@JoinColumn(name = "idJela")
	private Jelo jelo; // Veza s chatom

}
