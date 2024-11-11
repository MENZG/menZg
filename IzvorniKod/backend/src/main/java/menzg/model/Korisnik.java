package menzg.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "korisnik")
@Inheritance(strategy = InheritanceType.JOINED)
@Data
public class Korisnik {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idKorisnik")

	private Long idKorisnik;

	@Column(name = "lozinka", nullable = false)
	private String lozinka;

	@Column(name = "username", nullable = false, unique = true)
	private String username;
}