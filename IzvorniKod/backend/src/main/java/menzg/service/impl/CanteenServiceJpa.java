package menzg.service.impl;

import menzg.dao.CanteenRepository;
import menzg.dao.RestaurantRepository;
import menzg.domain.Menza;
import menzg.domain.Restoran;
import menzg.service.CanteenService;
import menzg.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CanteenServiceJpa implements CanteenService {
    @Autowired
    private CanteenRepository canteenRepo;
    @Autowired
    private RestaurantRepository restaurantRepo;


    public List<Restoran> restaurantList(Menza canteen){
        return restaurantRepo.findByCanteen(canteen);
    }

    @Override
    public List<Menza> listAll() {
        return canteenRepo.findAll();
    }
}
