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

	// ovdje ce nas vodit nakon autentifikacije
	@Value("${progi.fronted.url:/menze}")
	private String frontendUrl;  // Dodana default vrijednost za frontendUrl ako varijabla nije postavljena

	private final CustomOAuth2UserService customOAuth2UserService;

	private final CorsConfigurationSource corsConfigurationSource;

	// Constructor Injection za CustomOAuth2UserService i CorsConfigurationSource
	public SecurityConfig(CustomOAuth2UserService customOAuth2UserService, CorsConfigurationSource corsConfigurationSource) {
		this.customOAuth2UserService = customOAuth2UserService;
		this.corsConfigurationSource = corsConfigurationSource;
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.cors().configurationSource(corsConfigurationSource);  // Omogućava CORS

		return http.csrf(csrf -> csrf.ignoringRequestMatchers("/h2-console/**"))  // Onemogućava CSRF za /h2-console
				.authorizeHttpRequests(auth -> {
					auth.requestMatchers("/home").permitAll();  // Dozvoljava pristup /home bez autentifikacije
					auth.anyRequest().authenticated();  // Sve ostale rute zahtijevaju autentifikaciju
				})
				.headers(headers -> {
					headers.frameOptions().sameOrigin();  // Omogućava iframe učitavanje s iste domene
				})
				.oauth2Login(oauth2 -> {
					oauth2.userInfoEndpoint(
									userInfoEndpoint -> userInfoEndpoint.userAuthoritiesMapper(this.authorityMapper()))  // Mapira autoritete korisnika
							.successHandler((request, response, authentication) -> {
								response.sendRedirect("https://frontendmain-2wh3.onrender.com/menze");  // Preusmjerava na frontend nakon uspješne prijave
							});
				})
				.build();
	}

	// Definiramo mapper za autoritete korisnika (ROLE_USER kao default)
	private GrantedAuthoritiesMapper authorityMapper() {
		final SimpleAuthorityMapper authorityMapper = new SimpleAuthorityMapper();
		authorityMapper.setDefaultAuthority("ROLE_USER");
		return authorityMapper;
	}

	// umjesto Customizer.withDefaults()
	// moze i ovo
	/*
	 * oauth2 -> { oauth2 .userInfoEndpoint( userInfoEndpoint ->
	 * userInfoEndpoint.userAuthoritiesMapper(this.authorityMapper()))
	 * .successHandler( (request, response, authentication) -> {
	 * response.sendRedirect(frontendUrl); }); }
	 */
	// objasnjenje drugog
	/*
	 * Konfigurira OAuth2 autentifikaciju kada se korisnik prijavljuje putem OAuth2
	 * protokola.
	 * 
	 * userInfoEndpoint(userInfoEndpoint ->
	 * userInfoEndpoint.userAuthoritiesMapper(this.authorityMapper())): Postavlja
	 * mapiranje korisničkih prava (userAuthoritiesMapper). Metoda authorityMapper()
	 * je metoda iz trenutne klase koja prilagođava prava korisnika prema
	 * informacijama koje pruža OAuth2 provajder (npr. Google).
	 * 
	 * successHandler((request, response, authentication) -> { ... }): Definira
	 * ponašanje nakon uspješne autentifikacije. U ovom slučaju, nakon uspješne
	 * prijave korisnik se preusmjerava na određeni frontendUrl.
	 */

	// kad se zatrazi ...../ ne trazi login, ali kad se zatraze bilo koe druge rute
	// trazi se login

	/*
	 * oauth2 -> oauth2 .userInfoEndpoint(userInfo ->
	 * userInfo.userService(customOAuth2UserService)
	 */
}
