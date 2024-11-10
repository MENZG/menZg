package menzg.rest;

import menzg.domain.Restaurant;
import menzg.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/restaurants")
public class RestaurantController {
    @Autowired
    private RestaurantService restaurantService;

    @GetMapping("")
    public List<Restaurant> listRestaurants(){
        return  restaurantService.listAll();
    }

    @PostMapping("")
    public Restaurant createRestaurant(@RequestBody Restaurant restaurant){
        return restaurantService.createRestaurant(restaurant);
    }
}
