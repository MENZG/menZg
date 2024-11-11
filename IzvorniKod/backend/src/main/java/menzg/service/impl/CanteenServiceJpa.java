package menzg.service.impl;

import menzg.dao.CanteenRepository;
import menzg.dao.RestaurantRepository;
import menzg.domain.Canteen;
import menzg.domain.Restaurant;
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


    public List<Restaurant> restaurantList(Canteen canteen){
        return restaurantRepo.findByCanteen(canteen);
    }

    @Override
    public List<Canteen> listAll() {
        return canteenRepo.findAll();
    }
}
