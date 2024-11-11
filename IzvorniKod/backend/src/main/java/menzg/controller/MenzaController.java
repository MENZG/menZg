package menzg.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import menzg.model.Menza;
import menzg.service.MenzaService;

@RestController
@RequestMapping("/menza")
public class MenzaController {

	@Autowired
	private MenzaService menzaService;


	//vraca sve menze
	@GetMapping("")
	public List<Menza> listMenzas() {
		return menzaService.listAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Menza> getMenzaData(@PathVariable Long id){
		Menza mz = menzaService.getMenzaData(id);

		System.out.println("iz baze sam izvukao " + mz);

		if (mz == null) {
			System.out.println("nisam pronasao trazenu manzu");
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(mz, HttpStatus.OK);

	}
}
