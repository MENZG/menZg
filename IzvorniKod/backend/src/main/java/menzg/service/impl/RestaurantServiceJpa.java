package menzg.service.impl;

import menzg.dao.RestaurantRepository;
import menzg.domain.Restaurant;
import menzg.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantServiceJpa implements RestaurantService {
    @Autowired
    private RestaurantRepository restaurantRepo;

    @Override
    public List<Restaurant> listAll() {
        return restaurantRepo.findAll();
    }

    @Override
    public Restaurant createRestaurant(Restaurant restaurant) {
        //TODO
        return null;

    }
}
