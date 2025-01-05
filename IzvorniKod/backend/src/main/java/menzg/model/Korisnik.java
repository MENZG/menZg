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

	@Column(name = "lozinka", nullable = true)
	private String lozinka;

	@Column(name = "username", nullable = false, unique = true)
	private String username;

	@Column(name = "role", nullable = false)
	private Integer role = 1; // možeš inicijalno dodijeliti ulogu "ROLE_USER"
	// 1 je user, 2 je teta u menzi, 3 je admin

	@Column(name = "godine", nullable = true)
	private Integer godine; // Spremanje godina korisnika

	@Column(name = "spol", nullable = true)
	private String spol; // Spremanje spola korisnika (M/F ili ne

	// Utility method to get role name
	public String getRoleName() {
		switch (role) {
		case 1:
			return "ROLE_STUDENT";
		case 2:
			return "ROLE_DJELATNIK";
		case 3:
			return "ROLE_ADMIN";
		default:
			return "UNKNOWN_ROLE";
		}
	}

}