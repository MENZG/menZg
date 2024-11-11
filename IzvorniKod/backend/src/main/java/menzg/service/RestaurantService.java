package menzg.service;

import menzg.domain.Restoran;

import java.util.List;

public interface RestaurantService {
    List<Restoran> listAll();

    Restoran createRestaurant(Restoran restaurant);
}
