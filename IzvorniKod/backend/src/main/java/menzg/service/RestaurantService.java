package menzg.service;

import menzg.domain.Restaurant;

import java.util.List;

public interface RestaurantService {
    List<Restaurant> listAll();

    Restaurant createRestaurant(Restaurant restaurant);
}
