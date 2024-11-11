package menzg.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import menzg.model.Korisnik;
import menzg.repo.KorisnikRepository;

@Service
public class KorisnikService {

	@Autowired
	KorisnikRepository repo;

	public Korisnik save(Korisnik korisnik) {
		return repo.save(korisnik);
	}

}
