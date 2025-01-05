
package menzg.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Value("${progi.frontend.url}/menze") // cisti frontend --> dalje slat
	private String frontendUrl;

//	@Bean
//	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//		http.cors(cors -> cors.configurationSource(
//				request -> new org.springframework.web.cors.CorsConfiguration().applyPermitDefaultValues()))
//				.csrf(csrf -> csrf.ignoringRequestMatchers("/h2-console/**")) // Isključi CSRF za H2 konzolu
//				.authorizeRequests(auth -> {
//					auth.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll(); // Dozvoli OPTIONS zahteve za CORS
//					auth.requestMatchers("/api/menza").permitAll();
//					auth.requestMatchers("/api/auth/google", "/h2-console/**").permitAll(); // Javne rute
//					auth.requestMatchers("/api/**").authenticated(); // Sve rute pod /api zahtevaju autentifikaciju
//				})
//				.oauth2Login(oauth2 -> oauth2
//						.userInfoEndpoint(
//								userInfoEndpoint -> userInfoEndpoint.userAuthoritiesMapper(this.authorityMapper()))
//						.successHandler((request, response, authentication) -> response.sendRedirect(frontendUrl)));
//		return http.build();
//	}

//	@Bean
//	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//		http // Isključivanje CSRF zaštite za H2 konzolu
//		).csrf(AbstractHttpConfigurer::disable)
//				.authorizeHttpRequests(AuthorizeRequests -> AuthorizeRequests.anyRequest().authenticated())
//				.oauth2Login(oauth2 -> oauth2.defaultSuccessUrl("/", true)); // Koristi frontendUrl za
//																				// redirekciju
//
//		return http.build();
//	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.ignoringRequestMatchers("/h2-console/**") // Isključivanje CSRF zaštite za H2 konzolu
		).authorizeHttpRequests(auth -> auth.requestMatchers("/h2-console/**").permitAll() // Dopuštanje pristupa H2
																							// konzoli
				.anyRequest().authenticated() // Za sve ostale rute zahtijeva autentifikaciju
		).headers(headers -> headers.frameOptions().sameOrigin() // Omogućavanje iframe za H2 konzolu
		).oauth2Login(oauth2 -> oauth2.defaultSuccessUrl(frontendUrl, true) // Redirekcija na frontendUrl nakon uspješne
		// prijave
		);

		return http.build();
	}

}
