package menzg.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
	@PreAuthorize("hasRole('ROLE_STUDENT') or hasRole('ROLE_ADMIN') or hasRole('ROLE_DJELATNIK')") // Ova ruta će biti
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
}
