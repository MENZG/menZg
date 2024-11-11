package menzg.rest;

import menzg.domain.Canteen;
import menzg.service.CanteenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/canteens")
public class CanteenController {
    @Autowired
    private CanteenService canteenService;

    @GetMapping("")
    public List<Canteen> listCantens(){
        return canteenService.listAll();
    }
}
