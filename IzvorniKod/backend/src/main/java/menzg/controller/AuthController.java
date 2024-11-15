package menzg.controller;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse;

//  https://backendmain-dyod.onrender.com/api/auth
@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

	// frontend https://frontendmain-2wh3.onrender.com
	// backend https://backendmain-i5ve.onrender.com

	@GetMapping("")
	public void googleAuth(HttpServletResponse response) throws IOException {
		response.sendRedirect("/api/login/oauth2/code/google");
		// response.sendRedirect("https://backendmain-i5ve.onrender.com/api/login/oauth2/code/google");
		// // Pazi da koristiš
		// https://backendmain-dyod.onrender.com/login/oauth2/code/google // pravi URL
	}

	@GetMapping("/google/callback")
	public ResponseEntity<String> googleCallback(OAuth2AuthenticationToken authentication) {
		// Ovdje možeš dohvatiti korisničke podatke
		String userEmail = authentication.getPrincipal().getAttributes().get("email").toString();
		return ResponseEntity.ok("Authenticated as: " + userEmail);
	}
}