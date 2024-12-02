package menzg.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.authority.mapping.SimpleAuthorityMapper;
import org.springframework.security.web.SecurityFilterChain;


import menzg.service.CustomOAuth2UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	// Ovdje se definiraju frontend URL-i gdje se korisnik preusmjerava nakon
	// uspješne prijave
	@Value("${progi.frontend.url}/menze")
	private String frontendUrl;

	private final CustomOAuth2UserService customOAuth2UserService;

	private final GlobalCorsConfig globalCorsConfig;

	public SecurityConfig(CustomOAuth2UserService customOAuth2UserService, GlobalCorsConfig globalCorsConfig) {
		this.customOAuth2UserService = customOAuth2UserService;
		this.globalCorsConfig = globalCorsConfig;
	}

	// Constructor Injection za CorsConfigurationSource i CustomOAuth2UserService


	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		// Omogućavanje CORS-a
		//http.cors(cors -> cors.configurationSource(corsConfigurationSource));
		//http.cors(cors ->cors.disable());

	 http
				.cors(cors -> cors.configurationSource(globalCorsConfig.corsConfigurationSource()))

			.csrf(csrf -> csrf.ignoringRequestMatchers("/h2-console/**"))
				.authorizeRequests(auth -> {
			// Definiramo da su svi zahtjevi zaštićeni, osim home rute
			auth.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll(); // Dopušta OPTIONS zahtjeve
			auth.requestMatchers("/home").permitAll();
			auth.anyRequest().authenticated(); // Zaštita svih drugih ruta
		})
				//.headers(header -> header.disable())
				//.headers(headers -> headers.frameOptions(frameOptionsConfig -> frameOptionsConfig.sameOrigin())) // Omogućava iframe učitavanje sa iste domene
				.oauth2Login(oauth2 -> {
			// Konfiguriramo OAuth2 login putem Google-a
			oauth2.userInfoEndpoint(userInfoEndpoint -> userInfoEndpoint.userAuthoritiesMapper(this.authorityMapper()))
					.successHandler((request, response, authentication) -> {
						// Nakon uspješne prijave korisnik se preusmjerava na frontend URL
						response.sendRedirect(frontendUrl);
					});
		});
			return http.build();
	}

	// Metoda koja postavlja mapiranje korisničkih prava nakon autentifikacije
	private GrantedAuthoritiesMapper authorityMapper() {
		final SimpleAuthorityMapper authorityMapper = new SimpleAuthorityMapper();
		authorityMapper.setDefaultAuthority("ROLE_USER"); // Definiramo osnovnu ulogu za korisnika
		return authorityMapper;
	}
}
