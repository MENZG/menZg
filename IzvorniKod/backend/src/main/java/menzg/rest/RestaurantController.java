package menzg.rest;

import menzg.domain.Restoran;
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
    public List<Restoran> listRestaurants(){
        return  restaurantService.listAll();
    }

    @PostMapping("")
    public Restoran createRestaurant(@RequestBody Restoran restaurant){
        return restaurantService.createRestaurant(restaurant);
    }
}
