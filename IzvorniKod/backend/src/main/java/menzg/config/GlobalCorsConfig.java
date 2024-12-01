//disablani CORS
/*package menzg.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class GlobalCorsConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		// Omogućava CORS zahtjeve sa frontend domena
		registry.addMapping("/**") // Primjenjuje pravila na sve rute
				.allowedOrigins("https://frontendservice-l0s1.onrender.com") // Dopušta samo zahtjeve sa ove frontend
																			// domene
				.allowedMethods("GET", "POST", "PUT", "DELETE") // Dopuštene HTTP metode
				.allowedHeaders("*") // Dopušta sva zaglavlja
				.allowCredentials(true); // Omogućava kolačiće (ako je potrebno za autentifikaciju)
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.addAllowedOrigin("https://frontendservice-l0s1.onrender.com"); // Dozvoli zahtjeve sa frontenda
		configuration.addAllowedMethod("*"); // Dozvoli sve metode
		configuration.addAllowedHeader("*"); // Dozvoli sva zaglavlja
		configuration.setAllowCredentials(true); // Omogući kolačiće

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

}
*/