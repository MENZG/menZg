package menzg.rest;

import menzg.domain.Korisnik;
import menzg.service.KorisnikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/korsnici")
public class KorisnikContoller {

    @Autowired
    private KorisnikService korisnikService;

    @GetMapping("")
    public List<Korisnik> listKorisnici(){
        return  korisnikService.listAll();
    }

    @PostMapping("")
    public Korisnik createKorisnik(Korisnik korisnik) {
        return korisnikService.createKorisnik(korisnik);
    }

}
