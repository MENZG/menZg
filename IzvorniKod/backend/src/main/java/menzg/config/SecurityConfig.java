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
	@Value("${progi.frontend.url}/menze")
	private String frontendUrl;

	private final CustomOAuth2UserService customOAuth2UserService;

	private CorsConfigurationSource corsConfigurationSource;

	// Constructor Injection za CorsConfigurationSource
	public SecurityConfig(CustomOAuth2UserService customOAuth2UserService,
						  CorsConfigurationSource corsConfigurationSource) {
		this.customOAuth2UserService = customOAuth2UserService;
		this.corsConfigurationSource = corsConfigurationSource;
	}

	// @Profile({"oauth-security"})
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.cors().configurationSource(corsConfigurationSource);

		return http.csrf(csrf -> csrf.ignoringRequestMatchers("/h2-console/**")).authorizeHttpRequests(auth -> {
					auth.requestMatchers("/home").permitAll();
					/* auth.requestMatchers("/h2-console/**").permitAll(); */
					auth.anyRequest().authenticated();
				}).headers(headers -> {
					headers.frameOptions().sameOrigin();
				}) // Omogućuje učitavanje u iframeu s iste domene

				// .headers(headers ->
				// headers.frameOptions().sameOrigin())//.frameOptions().sameOrigin()
				.oauth2Login(oauth2 -> {
					oauth2.userInfoEndpoint(
									userInfoEndpoint -> userInfoEndpoint.userAuthoritiesMapper(this.authorityMapper()))
							.successHandler((request, response, authentication) -> {
								response.sendRedirect("https://frontendmain-2wh3.onrender.com/menze");

							});
				})
				// .exceptionHandling(handling -> handling.authenticationEntryPoint(new
				// Http403ForbiddenEntryPoint()))
				// .formLogin(Customizer.withDefaults()) /*ovo cemo kasnije koristit kad budemo
				// imali vise profila */
				.build();
	}

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