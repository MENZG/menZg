package menzg.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import menzg.model.Korisnik;
import menzg.repo.KorisnikRepository;

@Service
public class KorisnikService {

	@Autowired
	private KorisnikRepository repo;

	// Metoda za čuvanje korisnika u bazi
	public Korisnik save(Korisnik korisnik) {
		return repo.save(korisnik);
	}

	// Metoda za pronalaženje svih korisnika
	public List<Korisnik> findAll() {
		return repo.findAll(); // JpaRepository nudi findAll() metodu
	}

	// Metoda za pronalaženje korisnika po ID-ju
	public Optional<Korisnik> findById(Long id) {
		return repo.findById(id); // JpaRepository nudi findById() metodu
	}

	// Metoda za brisanje korisnika po ID-ju
	public void deleteById(Long id) {
		repo.deleteById(id); // JpaRepository nudi deleteById() metodu
	}

	// Metoda za pronalaženje korisnika po korisničkom imenu
	public Optional<Korisnik> findByUsername(String username) {
		return repo.findByUsername(username); // Pretpostavka: Ova metoda je definisana u KorisnikRepository
	}
}