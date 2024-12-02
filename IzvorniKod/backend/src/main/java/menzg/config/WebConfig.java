package menzg.config;

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

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOrigins("https://frontendservice-l0s1.onrender.com")
				.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS").allowedHeaders("*");
	}
}