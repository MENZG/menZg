package menzg.domain;

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
@Table(name = "menza")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Chat {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idChat")
	private Long idChat;

	@OneToOne // Mnogi Chat-ovi mogu biti povezani s jednim Restoranom
	@JoinColumn(name = "idRestoran", nullable = false) // Spoljni ključ koji referencira Restoran
	private Restoran restoran; // Povezivanje s entitetom Restoran

}
