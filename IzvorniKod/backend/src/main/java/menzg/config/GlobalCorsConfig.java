package menzg.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class GlobalCorsConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		// Omogućava CORS zahtjeve sa frontend domena
		registry.addMapping("/**") // Primjenjuje pravila na sve rute
				.allowedOrigins("https://frontendservice-l0s1.onrender.com") // Dopušta samo zahtjeve sa ove frontend
																			// domene
				.allowedMethods("GET", "POST", "PUT", "DELETE") // Dopuštene HTTP metode
				//.allowedHeaders("*") // Dopušta sva zaglavlja
				.allowCredentials(true); // Omogućava kolačiće (ako je potrebno za autentifikaciju)
	}

}
