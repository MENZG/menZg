package menzg.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import menzg.DTO.KorisnikDTO;
import menzg.model.Korisnik;
import menzg.model.Menza;
import menzg.service.KorisnikService;
import menzg.service.MenzaService;
import menzg.service.OcjenaService;

@RestController
@RequestMapping("/korisnici")
// @CrossOrigin(origins = "http://localhost:5173")

public class KorisnikController {

	@Autowired
	private KorisnikService korisnikService;

	@Autowired
	private MenzaService menzaService;

	@Autowired
	private OcjenaService ocjenaService;
//	@GetMapping("")
//	public List<Korisnik> listKorisnici() {
//		return korisnikService.listAll();

//	}
	// GET: Dohvaća sve korisnike
	@GetMapping
	// @PreAuthorize("hasRole('ROLE_ADMIN')") // NEKA U RAZVOJU OVO BUDE DOSTUPNO
	// SVIMA
	public ResponseEntity<List<KorisnikDTO>> getAllKorisnici() {
		List<Korisnik> korisnici = korisnikService.findAll();

		// Pretvaranje svih korisnika u osnovne informacije (DTO)
		List<KorisnikDTO> korisniciBasicInfo = korisnici.stream()
				.map(korisnik -> new KorisnikDTO(korisnik.getIdKorisnik(), korisnik.getLozinka(),
						korisnik.getUsername(), korisnik.getRole(), korisnik.getGodine(), korisnik.getSpol(),
						korisnik.getBlocked()))
				.collect(Collectors.toList());

		return ResponseEntity.ok(korisniciBasicInfo);
	}

	@PutMapping("/{id}/newRole/{brojNoveRole}")
	// @PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<String> promijeniRoluKorisniku(@PathVariable Long id, @PathVariable int brojNoveRole) {
		Optional<Korisnik> korisnikOpt = korisnikService.findById(id);

		if (!korisnikOpt.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Korisnik s ID-em " + id + " nije pronađen.");
		}

		Korisnik korisnik = korisnikOpt.get();

		String novaRola = mapirajBrojNaRolu(brojNoveRole);

		korisnik.setRole(brojNoveRole);

		System.out.println("mijenjam rolu korisniku " + korisnik.getUsername() + " na " + novaRola);

		// ovime mu se spremaju nove ovlasti
		korisnikService.save(korisnik);

		// MORA GOOGLE ZNATI ZA NOVE OVLASTI
		List<SimpleGrantedAuthority> noveOvlasti = korisnikService.getAuthorities(korisnik);

		System.out.println("nove ovlasti su " + noveOvlasti);

		Authentication trenutnaAutentikacija = SecurityContextHolder.getContext().getAuthentication();

		Authentication novaAutentikacija = new UsernamePasswordAuthenticationToken(trenutnaAutentikacija.getPrincipal(),
				null, noveOvlasti);

		SecurityContextHolder.getContext().setAuthentication(novaAutentikacija);

		return ResponseEntity.ok("Rola korisnika s ID-em " + id + " uspješno promijenjena u: " + novaRola);

	}

	private String mapirajBrojNaRolu(int broj) {
		switch (broj) {
		case 1:
			return "ROLE_STUDENT";
		case 2:
			return "ROLE_DJELATNIK";
		case 3:
			return "ROLE_ADMIN";
		default:
			return "ROLE_UNKNOWN"; // Nevažeći broj role
		}
	}

	@PreAuthorize("hasRole('ROLE_STUDENT') or hasRole('ROLE_ADMIN') or hasRole('ROLE_DJELATNIK')")
	@GetMapping("/user")
	public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {

		return principal.getAttributes();
	}

	// Endpoint za osnovne informacije o korisniku
	@GetMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_STUDENT') or hasRole('ROLE_ADMIN') or hasRole('ROLE_DJELATNIK')")
	public ResponseEntity<KorisnikDTO> getKorisnikBasicInfo(@PathVariable Long id) {
		Optional<Korisnik> korisnikOptional = korisnikService.findById(id);

		if (korisnikOptional.isPresent()) {
			System.out.println("----------------- DTO\n");

			Korisnik korisnik = korisnikOptional.get();
			// Kreirajte DTO sa osnovnim podacima
			KorisnikDTO korisnikBasicInfo = new KorisnikDTO(korisnik.getIdKorisnik(), korisnik.getLozinka(),
					korisnik.getUsername(), korisnik.getRole(), korisnik.getGodine(), korisnik.getSpol(),
					korisnik.getBlocked());
			return ResponseEntity.ok(korisnikBasicInfo);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	// POST: Kreira novog korisnika
	@PostMapping
	@PreAuthorize("hasRole('ROLE_STUDENT') or hasRole('ROLE_ADMIN') or hasRole('ROLE_DJELATNIK')")
	public ResponseEntity<Korisnik> createKorisnik(@RequestBody Korisnik korisnik) {
		if (korisnik.getBlocked() == null) {
			korisnik.setBlocked(false); // Postavljamo default vrijednost
		}
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
			korisnik.setBlocked(updatedKorisnik.getBlocked());

			System.out.println("novi citavi korisnik je " + korisnik + " \n\n\n");

			Korisnik savedKorisnik = korisnikService.save(korisnik);
			return ResponseEntity.ok(savedKorisnik);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')") // samo admin moze brisat korisnika
	// @PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<String> deleteKorisnik(@PathVariable Long id) {

		System.out.println("proces brisanja korisnika s idijem " + id);
		if (korisnikService.findById(id).isPresent()) {
			// ocjenaService.deleteByKorisnikId(id);

			System.out.println("izbrisao sam prvo ocjene toga korisnika \n\n\n");

			korisnikService.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).body("Korisnik uspješno obrisan.");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Korisnik s ID-em " + id + " nije pronađen.");
		}
	}

	// GET: Dohvaća korisnika po mailu
	@GetMapping("/username/{username}")
	// @PreAuthorize("hasRole('ROLE_STUDENT') or hasRole('ROLE_ADMIN') or
	// hasRole('ROLE_DJELATNIK')")
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
	@PreAuthorize("hasRole('ROLE_STUDENT') or hasRole('ROLE_ADMIN') or hasRole('ROLE_DJELATNIK')")
	public ResponseEntity<String> getRoleNameById(@PathVariable Long id) {
		Optional<Korisnik> korisnik = korisnikService.findById(id);
		if (korisnik.isPresent()) {
			String roleName = korisnik.get().getRoleName();
			return ResponseEntity.ok(roleName);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping("/{id}/najdraze")
	@PreAuthorize("hasRole('ROLE_STUDENT') or hasRole('ROLE_ADMIN') or hasRole('ROLE_DJELATNIK')")
	public ResponseEntity<List<Menza>> getOmiljeneMenza(@PathVariable Long id) {
		Optional<Korisnik> korisnik = korisnikService.findById(id);

		if (korisnik.isPresent()) {
			List<Menza> omiljeneMenza = korisnik.get().getOmiljeneMenza();
			return ResponseEntity.ok(omiljeneMenza);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// KorisnikController.java

	@PostMapping("/{korisnikId}/omiljenaMenza/{menzaId}")
	@PreAuthorize("hasRole('ROLE_STUDENT') or hasRole('ROLE_ADMIN') or hasRole('ROLE_DJELATNIK')")
	public ResponseEntity<String> addOmiljenaMenza(@PathVariable Long korisnikId, @PathVariable Long menzaId) {
		// Provjera postoji li korisnik
		Optional<Korisnik> korisnikOpt = korisnikService.findById(korisnikId);
		if (!korisnikOpt.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Korisnik nije pronađen.");
		}

		// Provjera postoji li menza
		Optional<Menza> menzaOpt = menzaService.findById(menzaId);

		if (!menzaOpt.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Menza nije pronađena.");
		}

		Korisnik korisnik = korisnikOpt.get();
		Menza menza = menzaOpt.get();

		/// je li vec medju omiljenim menzama
		if (korisnik.getOmiljeneMenza().contains(menza)) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Menza je već među omiljenim menzama.");
		}
		// Dodaj menzu u listu omiljenih menzi korisnika
		korisnik.getOmiljeneMenza().add(menza);
		korisnikService.save(korisnik); // Spremi korisnika s ažuriranom listom

		return ResponseEntity.status(HttpStatus.OK).body("Menza dodana u omiljene.");
	}

	@DeleteMapping("/{korisnikId}/omiljenaMenza/{menzaId}")
	@PreAuthorize("hasRole('ROLE_STUDENT') or hasRole('ROLE_ADMIN') or hasRole('ROLE_DJELATNIK')")
	// @PreAuthorize("hasRole('ROLE_STUDENT') or hasRole('ROLE_ADMIN') or
	// hasRole('ROLE_DJELATNIK')")
	public ResponseEntity<String> removeOmiljenaMenza(@PathVariable Long korisnikId, @PathVariable Long menzaId) {
		// Provjera postoji li korisnik
		Optional<Korisnik> korisnikOpt = korisnikService.findById(korisnikId);
		if (!korisnikOpt.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Korisnik s idijem " + korisnikId + "nije pronadjen");
		}

		// Provjera postoji li menza
		Optional<Menza> menzaOpt = menzaService.findById(menzaId);
		if (!menzaOpt.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Menza s tim id-jem nije pronađena u bazi podataka");
		}

		Korisnik korisnik = korisnikOpt.get();
		Menza menza = menzaOpt.get();

		// Provjera je li menza u listi omiljenih menzi korisnika
		if (!korisnik.getOmiljeneMenza().contains(menza)) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Menza nije među omiljenim menzama korisnika " + korisnikId);
		}

		// Uklanjanje menze iz liste omiljenih menzi korisnika
		korisnik.getOmiljeneMenza().remove(menza);
		korisnikService.save(korisnik); // Spremi korisnika s ažuriranom listom

		return ResponseEntity.status(HttpStatus.OK).body("Menza uklonjena iz omiljenih menzi korisnika " + korisnikId);
	}

	// PUT endpoint za promjenu statusa 'blocked'
	// PUT http://localhost:8080/api/korisnici/1/blocked?blocked=true
	// @PreAuthorize("hasRole('ROLE_ADMIN')") // Samo admin može pristupiti ovom
	// endpointu
	@PutMapping("/{idKorisnik}/blocked")
	@PreAuthorize("hasRole('ROLE_ADMIN')") // samo admin moze blokirati korisnika
	public ResponseEntity<Korisnik> promijeniBlockedStatus(@PathVariable Long idKorisnik,
			@RequestParam boolean blocked) {

		Korisnik azuriraniKorisnik = korisnikService.promijeniBlockedStatus(idKorisnik, blocked);
		return ResponseEntity.ok(azuriraniKorisnik);
	}

	@PostMapping("/odjavi")
	public ResponseEntity<String> logout(HttpServletRequest request) {
		SecurityContextHolder.getContext().setAuthentication(null);
		request.getSession().invalidate();
		return ResponseEntity.ok("Logged out successfully");
	}
//	@PostMapping("")
//	public Korisnik createKorisnik(Korisnik korisnik) {
//		return korisnikService.createKorisnik(korisnik);
//	}

}
