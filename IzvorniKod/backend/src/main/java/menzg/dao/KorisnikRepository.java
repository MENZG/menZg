package menzg.dao;

import menzg.domain.Korisnik;
import menzg.domain.Korisnik;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KorisnikRepository extends JpaRepository<Korisnik, Long> {

    Optional<Korisnik> findByIdKorisnik(Long idKorisnik);
    Optional<Korisnik> findByUsername(String username);

    //spring ce sam implementirat
    int countByIdKorisnik(Long idKorisnik);
}
