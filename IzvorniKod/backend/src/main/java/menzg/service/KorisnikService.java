package menzg.service;

import menzg.domain.Korisnik;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface KorisnikService {

    List<Korisnik> listAll();

    Korisnik createKorisnik(Korisnik korisnik);

}
