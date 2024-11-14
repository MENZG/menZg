package menzg.controller;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @GetMapping("")
    public void googleAuth(HttpServletResponse response) throws IOException {
        response.sendRedirect("/api/login/oauth2/code/google");
    }

    @GetMapping("/google/callback")
    public ResponseEntity<String> googleCallback(OAuth2AuthenticationToken authentication) {
        // Ovdje možeš dohvatiti korisničke podatke
        String userEmail = authentication.getPrincipal().getAttributes().get("email").toString();
        return ResponseEntity.ok("Authenticated as: " + userEmail);
    }
}