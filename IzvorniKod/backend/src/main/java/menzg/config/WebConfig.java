package menzg.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Value("${progi.frontend.url}")
	private String frontendUrl; // Dinamički učitani frontend URL iz application.properties

	@Override
	public void addCorsMappings(@SuppressWarnings("null") CorsRegistry registry) {

		System.out.println(frontendUrl + " opala \n");


		registry.addMapping("/**").allowedOrigins(frontendUrl)// Koristi dinamički učitani URL

				.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Dozvoljene metode
				.allowedHeaders("*") // Dozvoljeni svi zaglavlja
				.allowCredentials(true); // Ako koristiš kolačiće
	}
}