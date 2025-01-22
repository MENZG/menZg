package menzg.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import menzg.model.Korisnik;
import menzg.repo.KorisnikRepository;

@Service
public class KorisnikService {

	@Autowired
	private KorisnikRepository repo;

	public Korisnik saveOrUpdateGoogleUser(OAuth2User oAuth2User) {

		System.out.println("novi korisnik je ulogiran");

		String username = oAuth2User.getAttribute("email");

		Optional<Korisnik> existingUser = repo.findByUsername(username);

		if (existingUser.isPresent()) {

			Korisnik us = existingUser.get();

			System.out.println("Mail vec postoji u bazi podataka ---------------------");
			System.out.println("postojeca uloga je " + us.getRoleName());

			Korisnik korisnik = existingUser.get();

			return korisnik;

		} else {

			// Ako korisnik ne postoji, stvaramo novog korisnika
			System.out.print("korisnik ne POSTOJI U BAZI PODATAKA-------------STVARAM NOVOG KORISNIKA");

			// Kreiranje novog korisnika s podacima dobivenim iz OAuth2
			Korisnik newUser = new Korisnik();
			newUser.setUsername(username); // Postavljanje username (email korisnika)
			newUser.setLozinka("LOZINKU_NEMOZEMO_ZNAT?");
			newUser.setRole(1); // Postavljanje uloge (osnovna uloga je korisnik, tj. 1)
			// newUser.setSomeOtherField(oAuth2User.getAttribute("someAttribute")); //
			// Postavljanje drugih podataka ako su dostupni

			// Spremanje novog korisnika u bazu
			return repo.save(newUser); // automatski mu se generira ID

		}

	}

	// metoda koja se bavi ulogama kako bi anotacije lijepo radile
	public List<SimpleGrantedAuthority> getAuthorities(Korisnik korisnik) {
		List<SimpleGrantedAuthority> authorities = new ArrayList<>();

		// Na temelju role korisnika, mapiramo brojeve u ROLE_ prefiksirane uloge
		if (korisnik.getRole() == 1) {
			authorities.add(new SimpleGrantedAuthority("ROLE_STUDENT"));
		} else if (korisnik.getRole() == 2) {
			authorities.add(new SimpleGrantedAuthority("ROLE_DJELATNIK"));
		} else if (korisnik.getRole() == 3) {
			authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
		}

		return authorities;
	}

	// Metoda za čuvanje korisnika u bazi
	public Korisnik save(Korisnik korisnik) {
		if (korisnik.getBlocked() == null) {
			korisnik.setBlocked(false);
		}
		return repo.save(korisnik);
	}

	// Metoda za pronalaženje svih korisnika
	public List<Korisnik> findAll() {
		return repo.findAll(); // JpaRepository nudi findAll() metodu
	}

	// Metoda za pronalaženje korisnika po ID-ju
	public Optional<Korisnik> findById(Long id) {
		return repo.findById(id); // JpaRepository nudi findById() metodu
	}

	// Metoda za brisanje korisnika po ID-ju
	public void deleteById(Long id) {
		repo.deleteById(id); // JpaRepository nudi deleteById() metodu
	}

	// Metoda za pronalaženje korisnika po korisničkom imenu
	public Optional<Korisnik> findByUsername(String username) {
		return repo.findByUsername(username); // Pretpostavka: Ova metoda je definisana u KorisnikRepository
	}

	public Korisnik promijeniBlockedStatus(Long idKorisnik, boolean blocked) {

		// Pronađi korisnika u bazi
		Korisnik korisnik = repo.findById(idKorisnik)
				.orElseThrow(() -> new RuntimeException("Korisnik s ID-em " + idKorisnik + " nije pronađen"));

		// Postavi novi status
		korisnik.setBlocked(blocked);

		//treba li biti korisnik .save??
		//repo.save(korisnik);
		// Spremi promjenu u bazu
		return korisnik;
	}
}