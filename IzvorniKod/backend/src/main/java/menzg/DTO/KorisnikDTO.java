package menzg.DTO;

import lombok.Data;

@Data
public class KorisnikDTO {
	private Long idKorisnik;
	private String lozinka;
	private String username;
	private Integer role;
	private Integer godine;
	private String spol;

	// Konstruktor
	public KorisnikDTO(Long idKorisnik, String lozinka, String username, Integer role, Integer godine, String spol) {
		this.idKorisnik = idKorisnik;
		this.lozinka = lozinka;
		this.username = username;
		this.role = role;
		this.godine = godine;
		this.spol = spol;
	}
}