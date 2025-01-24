package menzg.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/*
 * @Override public void addCorsMappings(CorsRegistry registry) { // Omogućava
 * CORS zahtjeve sa frontend domena registry.addMapping("/**") // Primjenjuje
 * pravila na sve rute
 * .allowedOrigins("https://frontendservice-l0s1.onrender.com") // Dopušta samo
 * zahtjeve sa ove frontend // domene .allowedMethods("GET", "POST", "PUT",
 * "DELETE","OPTIONS") // Dopuštene HTTP metode .allowedHeaders("*") // Dopušta
 * sva zaglavlja .allowCredentials(true) // Omogućava kolačiće (ako je potrebno
 * za autentifikaciju) .maxAge(3600); // Caching preflight odgovora
 * 
 * }
 */

//	@Bean
//	public WebMvcConfigurer corsConfigurationSource() {
//		WebMvcConfigurer configuration = new WebMvcConfigurer();
//		configuration.addAllowedOrigin("https://frontendservice-l0s1.onrender.com"); // Dozvoli zahtjeve sa frontenda
//		configuration.addAllowedMethod("*"); // Dozvoli sve metode
//		configuration.addAllowedHeader("*"); // Dozvoli sva zaglavlja
//		// configuration.setAllowedOrigins(List.of("https://frontendservice-l0s1.onrender.com"));
//		// configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE",
//		// "OPTIONS"));
//		// configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
//
//		configuration.setAllowCredentials(true); // Omogući kolačiće
//
//		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//		source.registerCorsConfiguration("/**", configuration);
//		return source;
//	}
@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Value("${progi.frontend.url}")
	private String frontendUrl; // Dinamički učitani frontend URL iz application.properties

	@Override
	public void addCorsMappings(CorsRegistry registry) {

		System.out.println(frontendUrl + " opala \n");

		registry.addMapping("/**").allowedOrigins(frontendUrl) // Koristi dinamički učitani URL
				.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Dozvoljene metode
				.allowedHeaders("*") // Dozvoljeni svi zaglavlja
				.allowCredentials(true); // Ako koristiš kolačiće
	}
}