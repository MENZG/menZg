package menzg.service.impl;

import menzg.dao.MenzaRepository;
import menzg.dao.RestoranRepository;
import menzg.domain.Menza;
import menzg.domain.Restoran;
import menzg.service.MenzaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenzaServiceJpa implements MenzaService {
    @Autowired
    private MenzaRepository canteenRepo;
    @Autowired
    private RestoranRepository restaurantRepo;


    public List<Restoran> restaurantList(Menza canteen){
        return restaurantRepo.findByCanteen(canteen);
    }

    @Override
    public List<Menza> listAll() {
        return canteenRepo.findAll();
    }
}
