package menzg.service.impl;

import menzg.dao.KorisnikRepository;
import menzg.domain.Korisnik;
import menzg.service.KorisnikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KorisnikServiceJpa implements KorisnikService {

    @Autowired
    private KorisnikRepository korisnikRepo;
    @Override
    public List<Korisnik> listAll() {
        return korisnikRepo.findAll();
    }

    @Override
    public Korisnik createKorisnik(Korisnik korisnik) {
        //potrebno dopuniti
        return korisnikRepo.save(korisnik);
    }
}
