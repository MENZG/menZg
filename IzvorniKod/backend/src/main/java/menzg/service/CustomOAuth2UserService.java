package menzg.service;

import menzg.model.Korisnik;
import menzg.repo.KorisnikRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class CustomOAuth2UserService  extends DefaultOAuth2UserService {

    private final KorisnikRepository korisnikRepo;

    private static final Logger logger = LoggerFactory.getLogger(CustomOAuth2UserService.class);


    public CustomOAuth2UserService(KorisnikRepository userRepository) {
        this.korisnikRepo = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        Map<String, Object> attributes = oAuth2User.getAttributes();
        // Dohvat korisničkih podataka
        String email = (String) oAuth2User.getAttribute("email");
        String name = (String) oAuth2User.getAttribute("given_name");
        //System.out.println(attributes);

        Optional<Korisnik> existingUser = korisnikRepo.findByEmail(email);
        // Spremanje korisnika u bazu podataka ako ne postoji
        if (existingUser.isEmpty()) {
            Korisnik korisnik = new Korisnik();
            korisnik.setEmail(email);
            korisnik.setUsername(name);
            korisnik.setRole("ROLE_USER");
            korisnik.setLozinka("");
            korisnikRepo.save(korisnik);

            //logger.info("korisnicki podaci " + attributes);
            // Logiranje da se korisnik pohranio
           // System.out.println("Korisnik spremljen u bazu: " + korisnik.getEmail());
        } else {
            // Logiranje da korisnik već postoji
            //System.out.println("Korisnik već postoji u bazi: " + email);
        }

        return oAuth2User;
    }
}
