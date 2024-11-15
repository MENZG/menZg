package menzg.model;

import java.security.Timestamp;

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
@Table(name = "poruka") // Tablica 'PORUKA' u bazi podataka
@Data // Lombok anotacija koja generira gettere, settere, toString, equals, hashCode
@NoArgsConstructor // Generira prazan konstruktor
@AllArgsConstructor // Generira konstruktor sa svim parametrima
public class Poruka {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idPoruka")
	private Long idPoruka; // Jedinstveni identifikator za poruku

	@Column(name = "tekst", nullable = false)
	private String tekst; // Tekst poruke

	@Column(name = "timestamp", nullable = false)
	private Timestamp timestamp; // Vrijeme kada je poruka poslana

	@ManyToOne
	@JoinColumn(name = "idChat", nullable = false)
	private Chat chat; // Povezivanje s entitetom Chat (relacija ManyToOne)

	@ManyToOne
	@JoinColumn(name = "idStudent", nullable = true)
	private Student student;

	@ManyToOne
	@JoinColumn(name = "idAdmin", nullable = true)
	private AppAdmin admin;

	// NAPOMENA, U ZAVISNOSTI KO JE POSLA PORUKU JEDNO OD OVOGA DVOJE CE BITI NULL

}