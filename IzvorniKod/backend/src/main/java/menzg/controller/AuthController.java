package menzg.controller;

import java.io.IOException;
import java.util.Base64;
import java.util.UUID;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.client.RestTemplate;

//  https://backendservice-xspx.onrender.com
@RestController
@RequestMapping("/auth")
//@CrossOrigin(origins = "*")
@CrossOrigin(origins = "https://frontendservice-l0s1.onrender.com")
public class AuthController {

	// frontend https://frontendservice-l0s1.onrender.com
	// backend https://backendservice-xspx.onrender.com

	private final String clientId = "${GOOGLE_CLIENT_ID}";
	private  final String clientSecret = "${GOOGLE_CLIENT_SECRET}";

	private final String redirectUri = "https://backendservice-xspx.onrender.com/api/login/oauth2/code/google";
	private final String authorizationEndpoint = "https://accounts.google.com/o/oauth2/v2/auth";
	private final String scope = "profile email";


	@GetMapping("/google")
	public ResponseEntity<String> getGoogleAuthUrl() {
		String state = generateState(); // generirajte sigurnosni state token
		String url = authorizationEndpoint +
				"?response_type=code" +
				"&client_id=" + clientId +
				"&redirect_uri=" + redirectUri +
				"&scope=" + scope +
				"&state=" + state;
		return ResponseEntity.ok(url);
	}

	private String generateState() {
		// Implementirajte sigurnosni generator za state token
		return Base64.getEncoder().encodeToString(UUID.randomUUID().toString().getBytes());
	}




	@PostMapping("/login/oauth2/code/google")
	public ResponseEntity<?> handleGoogleCallback(@RequestParam String code, @RequestParam String state) {
		// Potvrdite state (CSRF zaštita)
		// Pošaljite zahtjev za razmjenu koda za token
		RestTemplate restTemplate = new RestTemplate();

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

		MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
		body.add("code", code);
		body.add("client_id", clientId);
		body.add("client_secret", clientSecret);
		body.add("redirect_uri", "https://backendservice-xspx.onrender.com/api/login/oauth2/code/google");
		body.add("grant_type", "authorization_code");

		HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

		String tokenEndpoint = "https://oauth2.googleapis.com/token";
		ResponseEntity<String> response = restTemplate.postForEntity(tokenEndpoint, request, String.class);

		// Obradite odgovor, izvucite tokene i pošaljite odgovor frontend-u
		return ResponseEntity.ok(response.getBody());
	}


	@GetMapping("")
	public void googleAuth(HttpServletResponse response) throws IOException {
		//response.sendRedirect("/api/login/oauth2/code/google");
		 response.sendRedirect("https://backendservice-xspx.onrender.com/api/login/oauth2/code/google");
		// // Pazi da koristiš
		// https://backendservice-xspx.onrender.com/login/oauth2/code/google // pravi URL
	}

	@GetMapping("/google/callback")
	public ResponseEntity<String> googleCallback(OAuth2AuthenticationToken authentication) {
		// Ovdje možeš dohvatiti korisničke podatke
		String userEmail = authentication.getPrincipal().getAttributes().get("email").toString();
		return ResponseEntity.ok("Authenticated as: " + userEmail);
	}
}