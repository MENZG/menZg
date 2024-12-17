package menzg.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("")
@CrossOrigin(origins = "*")
@RestController
public class HomeController {

	@GetMapping("/")
	public String home() {
		return "BACKEND RADI U REDU";
	}

	@GetMapping("/secured")
	public String secured() {
		return "Home, secured";
	}
}
