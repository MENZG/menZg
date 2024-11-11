package menzg.service.impl;

import menzg.dao.RestoranRepository;
import menzg.domain.Restoran;
import menzg.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantServiceJpa implements RestaurantService {
    @Autowired
    private RestoranRepository restaurantRepo;

    @Override
    public List<Restoran> listAll() {
        return restaurantRepo.findAll();
    }

    @Override
    public Restoran createRestaurant(Restoran restaurant) {
        //TODO
        return null;

    }
}
