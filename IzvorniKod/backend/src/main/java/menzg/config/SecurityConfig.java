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

	private final CustomOAuth2UserService customOAuth2UserService;

	public SecurityConfig(CustomOAuth2UserService customOAuth2UserService) {
		this.customOAuth2UserService = customOAuth2UserService;
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.cors(cors -> cors.configurationSource(
				request -> new org.springframework.web.cors.CorsConfiguration().applyPermitDefaultValues())) // You can
																												// customize
																												// the
																												// CORS
																												// configuration
																												// here
				.csrf(csrf -> csrf.ignoringRequestMatchers("/h2-console/**")).authorizeRequests(auth -> {
					auth.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll();
					auth.requestMatchers("/home").permitAll();
					auth.anyRequest().authenticated();
				})
				.oauth2Login(oauth2 -> oauth2
						.userInfoEndpoint(
								userInfoEndpoint -> userInfoEndpoint.userAuthoritiesMapper(this.authorityMapper()))
						.successHandler((request, response, authentication) -> response
								.sendRedirect("https://frontendservice-l0s1.onrender.com/menze")));
		return http.build();
	}

	private GrantedAuthoritiesMapper authorityMapper() {
		final SimpleAuthorityMapper authorityMapper = new SimpleAuthorityMapper();
		authorityMapper.setDefaultAuthority("ROLE_USER");
		return authorityMapper;
	}
}
