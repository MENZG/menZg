
package menzg.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;

import menzg.model.Korisnik;
import menzg.service.KorisnikService;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true) // Zamijenjeno sa EnableMethodSecurity
public class SecurityConfig {

	@Value("${progi.frontend.url}/menze") // cisti frontend --> dalje slat
	private String redirectURLString;

	@Value("${progi.frontend.url}") // cisti frontend --> dalje slat
	private String loginPage;

	@Autowired
	private KorisnikService korisnikService;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http// Omogućava CORS
				.csrf(csrf -> csrf.disable()// Isključivanje CSRF zaštite za H2 konzolu
				).authorizeHttpRequests(

						auth -> auth.requestMatchers("/h2-console/**").permitAll()

								.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // Dozvoli OPTIONS zahtjeve za
																						// sve rute// Dopuštanje
																						// pristupa H2
								// konzoli
								//
								// .requestMatchers("/ws/**").permitAll() //
								// .requestMatchers("/menza/**").permitAll() // OVO MAKNUT U PRODUKCIJI
								// .requestMatchers("/korisnici/**").permitAll() // OVO MAKNUT U PRODUKCIJI!!!!
								// .requestMatchers("/stream/**").permitAll() // OVO STOJI OK U PRODUKCIJI

								.anyRequest().authenticated() // Sve ostale// sve
				// autentifikaciju
				).headers(headers -> headers.frameOptions().sameOrigin() // Omogućavanje iframe za H2 konzolu
				).oauth2Login(oauth -> oauth.successHandler((request, response, authentication) -> {
					// Pozovite KorisnikService da spremi ili ažurira korisnika

					OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
					Korisnik korisnik = korisnikService.saveOrUpdateGoogleUser(oAuth2User);

					List<SimpleGrantedAuthority> authorities = korisnikService.getAuthorities(korisnik);

					System.out.println("security config se obradjujeee ------------------------------- \n\n\n");

					UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
							oAuth2User, null, authorities);

					SecurityContextHolder.getContext().setAuthentication(authenticationToken);

					// Nastavite s default redirectom
					response.sendRedirect(redirectURLString);
				}));

		return http.build();
	}

}