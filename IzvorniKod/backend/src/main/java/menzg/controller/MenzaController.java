package menzg.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import menzg.model.Menza;
import menzg.service.MenzaService;

@RestController
@RequestMapping("/menza")
public class MenzaController {

	@Autowired
	private MenzaService menzaService;

	@GetMapping("")
	public List<Menza> listCantens() {
		return menzaService.listAll();
	}
}
