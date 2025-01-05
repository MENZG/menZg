package menzg.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import menzg.model.Korisnik;

@Repository
public interface KorisnikRepository extends JpaRepository<Korisnik, Long> {

	// Metoda koja vraća korisnika ili Optional.empty() ako korisnik nije pronađen
	Optional<Korisnik> findByUsername(String username);

	// Metoda koja vraća korisnika po ID-u ili Optional.empty() ako korisnik nije
	// pronađen
	Optional<Korisnik> findById(Long id);

}
