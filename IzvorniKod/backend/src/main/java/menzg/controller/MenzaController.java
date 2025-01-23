package menzg.controller;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

import menzg.DTO.JeloDTO;
import menzg.DTO.OcjenaDTO;
import menzg.DTO.OcjenaDohvatDTO;
import menzg.model.Jelo;
import menzg.model.Korisnik;
import menzg.model.Menza;
import menzg.model.Ocjena;
import menzg.model.RadnoVrijeme;
import menzg.service.JeloService;
import menzg.service.KorisnikService;
import menzg.service.MenzaService;
import menzg.service.OcjenaService;

@RestController
@RequestMapping("/menza")
// @CrossOrigin(origins = "http://localhost:5173")
//@CrossOrigin(origins = "*")
//@CrossOrigin(origins = "https://frontendservice-l0s1.onrender.com")
public class MenzaController {

	private static final Logger logger = LoggerFactory.getLogger(MenzaController.class); // Definirajte logger

	@Autowired
	private MenzaService menzaService;
	@Autowired
	private KorisnikService korisnikService;
	@Autowired
	private OcjenaService ocjenaService;

	@Autowired
	private JeloService jeloService;

	// vraca sve menze
	@GetMapping("")
	// @PreAuthorize("hasRole('ROLE_STUDENT') or hasRole('ROLE_ADMIN') or
	// hasRole('ROLE_DJELATNIK')")
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
	// @PreAuthorize("hasRole('ROLE_STUDENT') or hasRole('ROLE_ADMIN') or
	// hasRole('ROLE_DJELATNIK')") // Ova ruta će biti
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

	// @PreAuthorize("hasRole('ROLE_STUDENT') or hasRole('ROLE_ADMIN') or
	// hasRole('ROLE_DJELATNIK')") // Ova ruta će biti
	@GetMapping("/radnovrime/{id}")
	public ResponseEntity<List<RadnoVrijeme>> getRadnoVrijeme(@PathVariable Long id) {
		// Fetch the working hours for the given Menza id
		Menza mz = menzaService.getMenzaData(id);

		List<RadnoVrijeme> radnoVrijemeList = mz.getRadnaVremena();

		return ResponseEntity.ok(radnoVrijemeList);
	}

	@PutMapping("/{id}")
//	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_DJELATNIK')")
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
	// @PreAuthorize("hasRole('ROLE_STUDENT') or hasRole('ROLE_ADMIN') or
	// hasRole('ROLE_DJELATNIK')")
	public ResponseEntity<List<Jelo>> getJelovnik(@PathVariable Long id) {
		// Dohvaćanje menze prema ID-u
		Menza menza = menzaService.getMenzaData(id);
		logger.info("Loger radi i prikazuje se u backendu uspješno ažurirana za menzu {}", id);
		System.out.println("Dohvacam jelovnik");
		if (menza == null) {
			// Ako menza nije pronađena, vraća se status 404
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		// Dohvat jelovnika za pronađenu menzu
		List<Jelo> jelovnik = menza.getJelovnik();

		// Ako jelovnik postoji, vraća se kao odgovor
		return new ResponseEntity<>(jelovnik, HttpStatus.OK);
	}

	@PutMapping("/{idMenze}/radno-vrijeme")
	// @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_DJELATNIK')")
	public ResponseEntity<String> azurirajRadnoVrijeme(@PathVariable Long idMenze, // ID menze dolazi iz putanje
			@RequestBody RadnoVrijeme radnoVrijeme) { // Radno vrijeme dolazi iz tijela zahtjeva

		System.out.println("objekt radnog vremena je " + radnoVrijeme);

		boolean uspjeh = menzaService.azurirajRadnoVrijeme(idMenze, radnoVrijeme);

		if (uspjeh) {
			return ResponseEntity.ok("Radno vrijeme uspješno ažurirano. za menzu " + idMenze);
		} else {
			return ResponseEntity.badRequest().body("Ažuriranje nije uspjelo. Provjerite ID menze. -- " + idMenze);
		}
	}

	@PutMapping("/{idMenze}/radno-vrijeme/{dan}/{pocetak}/{kraj}")
	// @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_DJELATNIK')")
	public ResponseEntity<String> azurirajRadnoVrijeme(@PathVariable Long idMenze, @PathVariable String dan,
			@PathVariable LocalTime pocetak, @PathVariable LocalTime kraj)// ID menze do) { // Radno vrijeme dolazi iz
																			// tijela zahtjeva
	{

		RadnoVrijeme rv = new RadnoVrijeme(idMenze, dan, pocetak, kraj, null);
		System.out.println("objekt radnog vremena je " + rv);

		boolean uspjeh = menzaService.azurirajRadnoVrijeme(idMenze, rv);

		if (uspjeh) {
			return ResponseEntity.ok("Radno vrijeme uspješno ažurirano. za menzu " + idMenze);
		} else {
			return ResponseEntity.badRequest().body("Ažuriranje nije uspjelo. Provjerite ID menze. -- " + idMenze);
		}
	}

	@PutMapping("/{idMenze}/jelovnik")
	// @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_DJELATNIK')")
	public ResponseEntity<String> azurirajJelovnik(@PathVariable Long idMenze, // ID menze dolazi iz putanje
			@RequestBody Jelo novoJelo) { // Novi jelovnik dolazi iz tijela zahtjeva
		System.out.println("Stigao novi jelovnik za menzu " + idMenze + ": " + novoJelo);
		logger.info("Loger radi i prikazuje se u backendu uspješno ažurirana za menzu {}", idMenze);

		boolean uspjeh = menzaService.azurirajJelovnik(idMenze, novoJelo);

		if (uspjeh) {
			return ResponseEntity.ok("Jelovnik uspješno ažuriran za menzu " + idMenze);
		} else {
			return ResponseEntity.badRequest()
					.body("Ažuriranje jelovnika nije uspjelo. Provjerite ID menze: " + idMenze);
		}
	}

	@PutMapping("/{idMenze}/jelovnik/{idJela}/{kategorija}/{nazivJela}/{cijena}")
	// @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_DJELATNIK')")
	public ResponseEntity<String> azurirajJelovnik(@PathVariable Long idMenze, // ID menze dolazi iz putanje
			@PathVariable Long idJela, @PathVariable String kategorija, @PathVariable String nazivJela,
			@PathVariable Float cijena) {

		Jelo novoJelo = new Jelo(kategorija, cijena, nazivJela, null);

		// Novi jelovnik dolazi iz tijela zahtjeva
		System.out.println("Stigao novi jelovnik za menzu " + idMenze + ": " + novoJelo);
		logger.info("Loger radi i prikazuje se u backendu uspješno ažurirana za menzu {}", idMenze);

		boolean uspjeh = menzaService.azurirajJelovnik(idMenze, novoJelo);

		if (uspjeh) {
			return ResponseEntity.ok("Jelovnik uspješno ažuriran za menzu " + idMenze);
		} else {
			return ResponseEntity.badRequest()
					.body("Ažuriranje jelovnika nije uspjelo. Provjerite ID menze: " + idMenze);
		}
	}

	@GetMapping("/{id}/ocjene")
	// @PreAuthorize("hasRole('ROLE_STUDENT') or hasRole('ROLE_ADMIN') or
	// hasRole('ROLE_DJELATNIK')")
	public ResponseEntity<List<OcjenaDohvatDTO>> getOcjene(@PathVariable Long id) {
		// Dohvaćanje menze prema ID-u
		Menza menza = menzaService.getMenzaData(id);
		System.out.println("dohvacam sve  ocjenu");

		if (menza == null) {
			// Ako menza nije pronađena, vraća se status 404
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		// Dohvat jelovnika za pronađenu menzu
		List<Ocjena> ocjene = menza.getOcjene();
		List<OcjenaDohvatDTO> ocjeneDohvat = new ArrayList<>();
		for (Ocjena ocjena : ocjene) {
			OcjenaDohvatDTO ocjenaDohvatDTO = new OcjenaDohvatDTO(ocjena.getHranaRating(), ocjena.getLjubaznostRating(),
					ocjena.getAmbijentRating(), ocjena.getLokacijaRating(), ocjena.getKorisnik().getIdKorisnik(),
					ocjena.getMenza().getIdMenza());
			ocjeneDohvat.add(ocjenaDohvatDTO);
		}

		// Ako jelovnik postoji, vraća se kao odgovor
		return new ResponseEntity<>(ocjeneDohvat, HttpStatus.OK);
	}

	@GetMapping("/{id}/prosjecna-ocjena")
	// @PreAuthorize("hasRole('ROLE_STUDENT') or hasRole('ROLE_ADMIN') or
	// hasRole('ROLE_DJELATNIK')")
	public ResponseEntity<List<Double>> getAverageRating(@PathVariable Long id) {
		// Dohvaćanje menze prema ID-u
		Menza menza = menzaService.getMenzaData(id);
		System.out.println("dohvacam prosjecnu ocjenu");
		if (menza == null) {
			// Ako menza nije pronađena, vraća se status 404
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		// Dohvat ocjena za pronađenu menzu
		List<Ocjena> ocjene = menza.getOcjene();
		List<Double> averageRating = new ArrayList<>();

		Double averageHranaRating = ocjene.stream().mapToDouble(Ocjena::getHranaRating).average().orElse(0.0);
		Double averageLokacijaRating = ocjene.stream().mapToDouble(Ocjena::getLokacijaRating).average().orElse(0.0);
		Double averageLjubaznostRating = ocjene.stream().mapToDouble(Ocjena::getLjubaznostRating).average().orElse(0.0);
		Double averageAmbijentRating = ocjene.stream().mapToDouble(Ocjena::getAmbijentRating).average().orElse(0.0);
		averageRating.add(averageHranaRating);
		averageRating.add(averageLjubaznostRating);
		averageRating.add(averageAmbijentRating);
		averageRating.add(averageLokacijaRating);
		// Ako jelovnik postoji, vraća se kao odgovor
		return new ResponseEntity<>(averageRating, HttpStatus.OK);
	}

	// ovdje ce trebat poslat ili korisnika ili samo id korisnika !!!pitat
	// frontendase
	@GetMapping("/{idMenze}/{idKorisnik}/ocjene")
	// @PreAuthorize("hasRole('ROLE_STUDENT') or hasRole('ROLE_ADMIN') or
	// hasRole('ROLE_DJELATNIK')")
	public ResponseEntity<OcjenaDohvatDTO> getOcjeneByKorisnik(@PathVariable Long idMenze,
			@PathVariable Long idKorisnik) {
		// Dohvaćanje menze prema ID-u
		Menza menza = menzaService.getMenzaData(idMenze);
		Optional<Korisnik> korisnik = korisnikService.findById(idKorisnik);

		if (menza == null) {
			// Ako menza nije pronađena, vraća se status 404
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		if (!(korisnik.isPresent())) {
			// Ako menza nije pronađena, vraća se status 404
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		// Filtriranje ocjena
		/*
		 * Optional<Ocjena> ocjenaByUser = menza.getOcjene().stream() .filter(ocjena ->
		 * ocjena.getKorisnik().getIdKorisnik().equals(idKorisnik)) .findFirst();
		 */

		OcjenaDohvatDTO ocjenaByUser = new OcjenaDohvatDTO();
		// Dohvat jelovnika za pronađenu menzu
		List<Ocjena> ocjene = menza.getOcjene();
		for (Ocjena ocjena : ocjene) {
			if (ocjena.getKorisnik().getIdKorisnik().equals(idKorisnik)) {
				ocjenaByUser.setHranaRating(ocjena.getHranaRating());
				ocjenaByUser.setLjubaznostRating(ocjena.getLjubaznostRating());
				ocjenaByUser.setAmbijentRating(ocjena.getAmbijentRating());
				ocjenaByUser.setLokacijaRating(ocjena.getLokacijaRating());
				ocjenaByUser.setIdKorisnik(ocjena.getKorisnik().getIdKorisnik());
				ocjenaByUser.setIdMenza(ocjena.getMenza().getIdMenza());
			}
		}
		// ili ovako?
		/*
		 * Optional<Ocjena> ocjenaByUser = menza.getOcjene().stream() .filter(ocjena ->
		 * ocjena.getKorisnik().getIdKorisnik().equals(idKorisnik)) .findFirst();
		 */

		if (ocjenaByUser == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		// Ako jelovnik postoji, vraća se kao odgovor
		return new ResponseEntity<>(ocjenaByUser, HttpStatus.OK);
	}

	@PostMapping("/{idMenze}/{idKorisnik}/ocjene")
	public ResponseEntity<String> dodajOcjenu(@PathVariable Long idMenze, @PathVariable Long idKorisnik,
			@RequestBody OcjenaDTO ocjenaRequest) {
		logger.info("Primljen zahtjev za ažuriranje ocjene: idMenze={}, idKorisnik={}, ocjenaRequest={}", idMenze,
				idKorisnik, ocjenaRequest);
		System.out.println("saljem   ocjenu" + idMenze + "  " + idKorisnik);

		Menza menza = menzaService.getMenzaData(idMenze);
		Optional<Korisnik> korisnik = korisnikService.findById(idKorisnik);

		if (menza == null) {
			// Ako menza nije pronađena, vraća se status 404
			logger.warn("Menza s ID {} nije pronađena.", idMenze);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		if (!(korisnik.isPresent())) {
			// Ako menza nije pronađena, vraća se status 404
			logger.warn("Korisnik s ID {} nije pronađen.", idKorisnik);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		Korisnik korisnikObject = korisnik.get();
		Ocjena ocjenaByUser = null;

		/*
		 * List<Ocjena> ocjene = menza.getOcjene(); List<OcjenaDohvatDTO> ocjenzeDTO =
		 * new ArrayList<>(); for(Ocjena ocjena : ocjene){ OcjenaDohvatDTO
		 * ocjenaDohvatDTO = new OcjenaDohvatDTO(ocjena.getHranaRating(),
		 * ocjena.getLjubaznostRating(), ocjena.getAmbijentRating(),
		 * ocjena.getLokacijaRating(), ocjena.getKorisnik().getIdKorisnik(),
		 * ocjena.getMenza().getIdMenza()); ocjenzeDTO.add(ocjenaDohvatDTO); }
		 */

		Ocjena novaOcjena = new Ocjena(ocjenaRequest.getHranaRating(), ocjenaRequest.getLjubaznostRating(),
				ocjenaRequest.getAmbijentRating(), ocjenaRequest.getLokacijaRating(), korisnikObject, menza);

		boolean uspjeh = menzaService.azurirajOcjenu(idMenze, idKorisnik, novaOcjena);
		if (uspjeh) {
			logger.info("Ocjena uspješno ažurirana za menzu {}", idMenze);
			return ResponseEntity.ok("Osjene uspješno ažurirane za menzu " + idMenze);
		} else {
			logger.error("Ažuriranje ocjena nije uspjelo za menzu {}", idMenze);
			return ResponseEntity.badRequest().body("Ažuriranje ocjena nije uspjelo. Provjerite ID menze: " + idMenze);
		}

		// return new ResponseEntity<>("Ocjena dodana.", HttpStatus.CREATED);
	}

	@PostMapping("/{idMenze}/novoJelo")
	public ResponseEntity<String> dodajJelo(@PathVariable Long idMenze, @RequestBody JeloDTO novoJelo) {
		Menza menza = menzaService.getMenzaData(idMenze);
		if (menza == null) {
			// Ako menza nije pronađena, vraća se status 404
			logger.warn("Menza s ID {} nije pronađena.", idMenze);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		Jelo dodanoJelo = new Jelo(novoJelo.getKategorija(), novoJelo.getCijena(), novoJelo.getNazivJela(), menza);
		boolean uspjeh = menzaService.dodajJelo(idMenze, dodanoJelo);

		if (uspjeh) {
			logger.info("Jelo uspješno uneseno za menzu {}", idMenze);
			return ResponseEntity.ok("Jelo uspješno uneseno za menzu " + idMenze);
		} else {
			logger.error("Dodavanje jela nije uspjelo za menzu {}", idMenze);
			return ResponseEntity.badRequest().body("dodavanje jela nije uspjelo. Provjerite ID menze: " + idMenze);
		}
	}

	@DeleteMapping("/{idJela}")
	public ResponseEntity<String> obrisiJelo(@PathVariable Long idJela) {
		Jelo jelo = jeloService.getJeloData(idJela);
		if (jelo == null) {
			// Ako menza nije pronađena, vraća se status 404
			logger.warn("Jelo s ID {} nije pronađena.", idJela);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		boolean uspjeh = menzaService.obrisiJelo(jelo);
		if (uspjeh) {
			logger.info("Jelo uspješno obrisano za menzu {}", idJela);
			return ResponseEntity.ok("Jelo uspješno obrisano za menzu " + idJela);
		} else {
			logger.error("Brisanje jela nije uspjelo za menzu {}", idJela);
			return ResponseEntity.badRequest().body("Brisanje jela nije uspjelo. Provjerite ID menze: " + idJela);
		}
	}

}
