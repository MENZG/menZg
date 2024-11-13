package menzg.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import menzg.model.AppAdmin;
import menzg.model.Korisnik;
import menzg.model.Student;
import menzg.service.AppAdminService;
import menzg.service.KorisnikService;
import menzg.service.StudentService;

@Profile({"oauth-security"})
@RestController
@RequestMapping("")
@CrossOrigin(origins = "http://localhost:5173")
public class KorisnikController {

	@Autowired
	private StudentService studentService;

	@Autowired
	private AppAdminService appAdminService;

	@Autowired
	private KorisnikService korisnikService;

//	@GetMapping("")
//	public List<Korisnik> listKorisnici() {
//		return korisnikService.listAll();
//	}

	@GetMapping("/student/{id}")
	public ResponseEntity<Student> getStudentData(@PathVariable Long id) {

		Student st = studentService.getStudentData(id);

		System.out.println("iz baze sam izvukao " + st);

		if (st == null) {
			System.out.println("nisam pronasao trazenog studenta");
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(st, HttpStatus.OK);
	}

	@PostMapping("/student")
	public ResponseEntity<String> createStudent(@RequestBody Map<String, Object> studentRequest) {

		// Ispisivanje svih podataka iz request bodyja
		System.out.println("Podaci o studentu: " + studentRequest);

		// primjer post metode

		/*
		 * 
		 * 
		 * 
		 * OVO JE OBLIK KOJI FRONTEND SALJE! { "username": "newStudent1",
		 *  "lozinka": "newPassword1",  "spol": "M",  "dob": 21 }
		 * 
		 * 
		 * 
		 * 
		 */
		// Pristup svakom svojstvu pomoću ključeva

		try {

			String username;
			String lozinka;
			String spol;
			Integer dob;

			username = (String) studentRequest.get("username");
			lozinka = (String) studentRequest.get("lozinka");
			spol = (String) studentRequest.get("spol");
			dob = (Integer) studentRequest.get("dob");

			// Ispisivanje svakog svojstva
			System.out.println("Username: " + username);
			System.out.println("Lozinka: " + lozinka);
			System.out.println("Spol: " + spol);
			System.out.println("Dob: " + dob);

			// Kreiranje korisnika
			Korisnik korisnik = new Korisnik();
			korisnik.setUsername(username);
			korisnik.setLozinka(lozinka);

			System.out.println("prvi print");

			System.out.println(korisnik);

			Korisnik savedKorisnik = korisnikService.save(korisnik);

			System.out.println("drugi print");
			System.out.println(savedKorisnik);

			if (savedKorisnik != null) {
				System.out.println("korisnik je spremljen");
			}
			// Kreiranje studenta
			Student student = new Student();
			student.setKorisnik(savedKorisnik);
			student.setSpol(spol);
			student.setDob(dob);

			// Spremanje studenta u bazu podataka
			Student savedStudent = studentService.save(student); // Pretpostavljam da imate servis za studenta

			System.out.println("treci print ");
			System.out.println(savedStudent);
			if (savedStudent != null) {
				System.out.println("student je spremljen u bazu");
			}

		} catch (Exception e) {
			System.out.println("ne mogu parsirati podatke s frontenda o studentu");
		}

		return new ResponseEntity<>("Student je uspješno spremljen u bazu podataka", HttpStatus.CREATED);
	}

	// Putanja za dohvat admina
	@GetMapping("/admin/{id}")
	public ResponseEntity<AppAdmin> getAdminData(@PathVariable Long id) {

		// Dohvati podatke o adminu iz servisa
		AppAdmin admin = appAdminService.getAdminData(id);

		// Ako admin nije pronađen, vraćamo NOT_FOUND
		if (admin == null) {
			System.out.println("Nisam pronašao traženog admina.");
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		// Ako je admin pronađen, vraćamo podatke s HTTP statusom OK
		return new ResponseEntity<>(admin, HttpStatus.OK);
	}

//	@PostMapping("")
//	public Korisnik createKorisnik(Korisnik korisnik) {
//		return korisnikService.createKorisnik(korisnik);
//	}

}
