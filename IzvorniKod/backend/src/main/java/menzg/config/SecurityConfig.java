
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

	@Value("${progi.frontend.url}") // cisti frontend --> dalje slat
	private String frontendUrl;

	private final CustomOAuth2UserService customOAuth2UserService;

	public SecurityConfig(CustomOAuth2UserService customOAuth2UserService) {
		this.customOAuth2UserService = customOAuth2UserService;
	}

	@SuppressWarnings("deprecation")

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.cors(cors -> cors.configurationSource(
				request -> new org.springframework.web.cors.CorsConfiguration().applyPermitDefaultValues()))
				.csrf(csrf -> csrf.ignoringRequestMatchers("/h2-console/**")) // Isključi CSRF za H2 konzolu
				.authorizeRequests(auth -> {
					auth.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll(); // Dozvoli OPTIONS zahteve za CORS
					auth.requestMatchers("/api/auth/google", "/h2-console/**").permitAll(); // Javne rute
					auth.requestMatchers("/api/**").authenticated(); // Sve rute pod /api zahtevaju autentifikaciju
				})
				.oauth2Login(oauth2 -> oauth2
						.userInfoEndpoint(
								userInfoEndpoint -> userInfoEndpoint.userAuthoritiesMapper(this.authorityMapper()))
						.successHandler((request, response, authentication) -> response.sendRedirect(frontendUrl)));
		return http.build();
	}

	private GrantedAuthoritiesMapper authorityMapper() {
		final SimpleAuthorityMapper authorityMapper = new SimpleAuthorityMapper();
		authorityMapper.setDefaultAuthority("ROLE_USER");
		return authorityMapper;
	}
}
