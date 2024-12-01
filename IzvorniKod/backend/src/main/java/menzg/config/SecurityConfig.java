package menzg.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.authority.mapping.SimpleAuthorityMapper;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;

import menzg.service.CustomOAuth2UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	// Ovdje se definiraju frontend URL-i gdje se korisnik preusmjerava nakon
	// uspješne prijave
	@Value("${progi.frontend.url}/menze")
	private String frontendUrl;

	private final CustomOAuth2UserService customOAuth2UserService;
	private final CorsConfigurationSource corsConfigurationSource;

	// Constructor Injection za CorsConfigurationSource i CustomOAuth2UserService
	public SecurityConfig(CustomOAuth2UserService customOAuth2UserService,
			CorsConfigurationSource corsConfigurationSource) {
		this.customOAuth2UserService = customOAuth2UserService;
		this.corsConfigurationSource = corsConfigurationSource;
	}

	@Bean
<<<<<<< HEAD
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		return http.csrf(csrf -> csrf.ignoringRequestMatchers("/login/oauth2/", "/callback", "/h2-console/")).authorizeHttpRequests(auth -> {
			auth.requestMatchers("/home").permitAll();
			/* auth.requestMatchers("/h2-console/**").permitAll(); */
			auth.anyRequest().authenticated();
		}).headers(headers -> {
			headers.frameOptions().sameOrigin();
		}) // Omogućuje učitavanje u iframeu s iste domene
=======
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		// Omogućavanje CORS-a
		http.cors().configurationSource(corsConfigurationSource);
>>>>>>> 2e9a278e8f540b543f08b47a027683e3532f8f23

		return http.csrf(csrf -> csrf.ignoringRequestMatchers("/h2-console/**")).authorizeRequests(auth -> {
			// Definiramo da su svi zahtjevi zaštićeni, osim home rute
			auth.requestMatchers("/home").permitAll();
			auth.anyRequest().authenticated(); // Zaštita svih drugih ruta
		}).headers(headers -> {
			headers.frameOptions().sameOrigin(); // Omogućava iframe učitavanje sa iste domene
		}).oauth2Login(oauth2 -> {
			// Konfiguriramo OAuth2 login putem Google-a
			oauth2.userInfoEndpoint(userInfoEndpoint -> userInfoEndpoint.userAuthoritiesMapper(this.authorityMapper()))
					.successHandler((request, response, authentication) -> {
						// Nakon uspješne prijave korisnik se preusmjerava na frontend URL
						response.sendRedirect(frontendUrl);
					});
		}).build();
	}

	// Metoda koja postavlja mapiranje korisničkih prava nakon autentifikacije
	private GrantedAuthoritiesMapper authorityMapper() {
		final SimpleAuthorityMapper authorityMapper = new SimpleAuthorityMapper();
		authorityMapper.setDefaultAuthority("ROLE_USER"); // Definiramo osnovnu ulogu za korisnika
		return authorityMapper;
	}
}
