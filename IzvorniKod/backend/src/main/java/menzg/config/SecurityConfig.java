/*package menzg.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity hhtp) throws Exception{
        return hhtp.authorizeHttpRequests(auth -> {
            auth.requestMatchers("/").permitAll();
            auth.anyRequest().authenticated();
        }).oauth2Login(Customizer.withDefaults()).formLogin(Customizer.withDefaults()).build();
    }
    //kad se zatrazi ...../ ne trazi login, ali kad se zatraze bilo koe druge rute trazi se login
}
*/