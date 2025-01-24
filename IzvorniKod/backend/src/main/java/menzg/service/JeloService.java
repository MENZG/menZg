package menzg.service;

import menzg.model.Jelo;
import menzg.repo.JeloRepository;
import menzg.repo.MenzaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JeloService {
    private static final Logger logger = LoggerFactory.getLogger(MenzaService.class);

    @Autowired
    MenzaRepository menzaRepo;
    @Autowired
    JeloRepository jeloRepo;

    public List<Jelo> listAll() {

        return jeloRepo.findAll();

    };

    public Jelo getJeloData(Long id) {
        return jeloRepo.findById(id).orElse(null);
    }

    public Optional<Jelo> findById(Long jeloId) {
        // TODO Auto-generated method stub
        return jeloRepo.findById(jeloId);
    }

    public void saveMenza(Jelo jelo) {
        jeloRepo.save(jelo);
    }

}
