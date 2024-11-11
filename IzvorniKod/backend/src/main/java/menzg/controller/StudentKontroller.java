package menzg.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import menzg.model.Student;
import menzg.service.StudentService;

@RestController
@RequestMapping("/api")
public class StudentKontroller {

	@Autowired
	private StudentService studentService;

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

//	@PostMapping("")
//	public Korisnik createKorisnik(Korisnik korisnik) {
//		return korisnikService.createKorisnik(korisnik);
//	}

}
