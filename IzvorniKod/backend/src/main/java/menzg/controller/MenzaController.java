package menzg.controller;

import java.util.List;

import menzg.model.Jelo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import menzg.model.Menza;
import menzg.model.RadnoVrijeme;
import menzg.service.MenzaService;

@RestController
@RequestMapping("/menza")
// @CrossOrigin(origins = "http://localhost:5173")
//@CrossOrigin(origins = "*")
//@CrossOrigin(origins = "https://frontendservice-l0s1.onrender.com")
public class MenzaController {

	private static final Logger logger = LoggerFactory.getLogger(MenzaController.class); // Definirajte logger

	@Autowired
	private MenzaService menzaService;

	// vraca sve menze
	@GetMapping("")
	@PreAuthorize("hasRole('ROLE_STUDENT') or hasRole('ROLE_ADMIN') or hasRole('ROLE_DJELATNIK')")
	public ResponseEntity<List<Menza>> listMenzas(@AuthenticationPrincipal OAuth2User principal) {
		List<Menza> menze = menzaService.listAll();

		System.out.println("\n");
		System.out.println(principal.getAttributes() + " ------------ BACKEND PORUKA");

		// Ako nije pronasaoo nijednu menzu, vraca 404 Not Found, ne nego vraca praznu
		// listu

		// korisnikService.saveOrUpdateGoogleUser(oAuth2User);

		System.out.println("Korisnik trazi listu menzi - BACKEND PORUKA: ------------");

		if (menze.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.OK);
		}
		// Inače vraca listu menza s statusom 200 OK
		return new ResponseEntity<>(menze, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_STUDENT') or hasRole('ROLE_ADMIN') or hasRole('ROLE_DJELATNIK')") // Ova ruta će biti
	public ResponseEntity<Menza> getMenzaData(@PathVariable Long id) {

		System.out.println("zatrazio si SVE INFORMACIJE o MENZAMA ------ ");
		Menza mz = menzaService.getMenzaData(id);

		// System.out.println("iz baze sam izvukao " + mz);

		if (mz == null) {
			System.out.println("nisam pronasao trazenu manzu");
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>(mz, HttpStatus.OK);

	}

	@PreAuthorize("hasRole('ROLE_STUDENT') or hasRole('ROLE_ADMIN') or hasRole('ROLE_DJELATNIK')") // Ova ruta će biti
	@GetMapping("/radnovrime/{id}")
	public ResponseEntity<List<RadnoVrijeme>> getRadnoVrijeme(@PathVariable Long id) {
		// Fetch the working hours for the given Menza id
		Menza mz = menzaService.getMenzaData(id);

		List<RadnoVrijeme> radnoVrijemeList = mz.getRadnaVremena();

		return ResponseEntity.ok(radnoVrijemeList);
	}


	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_DJELATNIK')")
	public ResponseEntity<Menza> updateMenza(@PathVariable Long id, @RequestBody Menza menzaDetails) {
		// Pronađi postojeću menzu po ID-u
		Menza existingMenza = menzaService.getMenzaData(id);

		if (existingMenza == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		// Ažuriraj podatke o menzi
		existingMenza.setImeMenze(menzaDetails.getImeMenze());
		existingMenza.setLokacija(menzaDetails.getLokacija());

		// Radna vremena i jelovnik možete ažurirati ovisno o poslovnoj logici
		if (menzaDetails.getRadnaVremena() != null) {
			existingMenza.setRadnaVremena(menzaDetails.getRadnaVremena());
		}
		if (menzaDetails.getJelovnik() != null) {
			existingMenza.setJelovnik(menzaDetails.getJelovnik());
		}

		// Spremi ažurirane podatke
		menzaService.saveMenza(existingMenza);

		return new ResponseEntity<>(existingMenza, HttpStatus.OK);
	}
	@GetMapping("/{id}/jelovnik")
	@PreAuthorize("hasRole('ROLE_STUDENT') or hasRole('ROLE_ADMIN') or hasRole('ROLE_DJELATNIK')")
	public ResponseEntity<List<Jelo>> getJelovnik(@PathVariable Long id) {
		// Dohvaćanje menze prema ID-u
		Menza menza = menzaService.getMenzaData(id);

		if (menza == null) {
			// Ako menza nije pronađena, vraća se status 404
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		// Dohvat jelovnika za pronađenu menzu
		List<Jelo> jelovnik = menza.getJelovnik();

		// Ako jelovnik postoji, vraća se kao odgovor
		return new ResponseEntity<>(jelovnik, HttpStatus.OK);
	}

}
