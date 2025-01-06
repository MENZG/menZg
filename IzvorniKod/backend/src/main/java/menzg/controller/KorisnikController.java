package menzg.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import menzg.model.Korisnik;
import menzg.service.KorisnikService;

@RestController
@RequestMapping("/korisnici")
// @CrossOrigin(origins = "http://localhost:5173")
public class KorisnikController {

	@Autowired
	private KorisnikService korisnikService;

//	@GetMapping("")
//	public List<Korisnik> listKorisnici() {
//		return korisnikService.listAll();

//	}

	// GET: Dohvaća sve korisnike
	@GetMapping
	public List<Korisnik> getAllKorisnici() {
		return korisnikService.findAll();
	}

	// najzajebanija metoda
	@PreAuthorize("hasRole('ROLE_STUDENT') or hasRole('ROLE_ADMIN') or hasRole('ROLE_DJELATNIK')")
	@GetMapping("/user")
	public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {

		System.out.println("op op op - trazimo principala ");
		return principal.getAttributes();
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_STUDENT') or hasRole('ROLE_ADMIN') or hasRole('ROLE_DJELATNIK')")
	public ResponseEntity<Object> getKorisnikById(@PathVariable Long id) {
		Optional<Korisnik> korisnik = korisnikService.findById(id);
		if (korisnik.isPresent()) {
			return ResponseEntity.ok(korisnik.get());
		} else {
			String errorMessage = "Korisnik s ID-jem " + id + " nije pronađen. - NIKOLA";
			return ResponseEntity.status(404).body(errorMessage);
		}
	}

	// POST: Kreira novog korisnika
	@PostMapping
	public ResponseEntity<Korisnik> createKorisnik(@RequestBody Korisnik korisnik) {
		Korisnik savedKorisnik = korisnikService.save(korisnik);
		return ResponseEntity.ok(savedKorisnik);
	}

	// PUT: Ažurira korisnika po ID-u
	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_STUDENT') or hasRole('ROLE_ADMIN') or hasRole('ROLE_DJELATNIK')")
	public ResponseEntity<Korisnik> updateKorisnik(@PathVariable Long id, @RequestBody Korisnik updatedKorisnik) {
		Optional<Korisnik> existingKorisnik = korisnikService.findById(id);
		if (existingKorisnik.isPresent()) {

			System.out.println("KORISNIK S TIM IDIJEM KOJEG ZELIS AZURIRAT POSTOJI :)");
			Korisnik korisnik = existingKorisnik.get();

			// Ažurirati podatke koji se mogu mijenjati
			korisnik.setUsername(updatedKorisnik.getUsername());
			korisnik.setGodine(updatedKorisnik.getGodine()); // Ažuriramo godine
			korisnik.setSpol(updatedKorisnik.getSpol()); // Ažuriramo spol

			Korisnik savedKorisnik = korisnikService.save(korisnik);
			return ResponseEntity.ok(savedKorisnik);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// DELETE: Briše korisnika po ID-u
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<String> deleteKorisnik(@PathVariable Long id) {
		if (korisnikService.findById(id).isPresent()) {
			korisnikService.deleteById(id);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Korisnik uspješno obrisan.");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Korisnik s ID-em " + id + " nije pronađen.");
		}
	}

	// GET: Dohvaća korisnika po mailu
	@GetMapping("/username/{username}")
	public ResponseEntity<Korisnik> getKorisnikByUsername(@PathVariable String username) {
		Optional<Korisnik> korisnik = korisnikService.findByUsername(username);
		if (korisnik.isPresent()) {
			return ResponseEntity.ok(korisnik.get());
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// GET: Dohvaća naziv uloge korisnika po ID-u
	@GetMapping("/{id}/role")
	public ResponseEntity<String> getRoleNameById(@PathVariable Long id) {
		Optional<Korisnik> korisnik = korisnikService.findById(id);
		if (korisnik.isPresent()) {
			String roleName = korisnik.get().getRoleName();
			return ResponseEntity.ok(roleName);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

//	@PostMapping("")
//	public Korisnik createKorisnik(Korisnik korisnik) {
//		return korisnikService.createKorisnik(korisnik);
//	}

}
