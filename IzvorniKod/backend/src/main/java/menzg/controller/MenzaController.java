package menzg.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@CrossOrigin(origins = "*")
public class MenzaController {

	@Autowired
	private MenzaService menzaService;

	// vraca sve menze
	@GetMapping("")
	public ResponseEntity<List<Menza>> listMenzas() {
		List<Menza> menze = menzaService.listAll();

		// Ako nije pronasaoo nijednu menzu, vraca 404 Not Found
		if (menze.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		// Inače vraca listu menza s statusom 200 OK
		return new ResponseEntity<>(menze, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Menza> getMenzaData(@PathVariable Long id) {

		System.out.println("zatrazio si sve informacije o menzi ------ ");
		Menza mz = menzaService.getMenzaData(id);

		// System.out.println("iz baze sam izvukao " + mz);

		if (mz == null) {
			System.out.println("nisam pronasao trazenu manzu");
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>(mz, HttpStatus.OK);

	}

	@GetMapping("/radnovrime/{id}")
	public ResponseEntity<List<RadnoVrijeme>> getRadnoVrijeme(@PathVariable Long id) {
		// Fetch the working hours for the given Menza id
		Menza mz = menzaService.getMenzaData(id);

		List<RadnoVrijeme> radnoVrijemeList = mz.getRadnaVremena();

		return ResponseEntity.ok(radnoVrijemeList);
	}
}
