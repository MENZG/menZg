package menzg.rest;

import menzg.domain.Menza;
import menzg.service.MenzaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/canteens")
public class CanteenController {
    @Autowired
    private MenzaService menzaService;

    @GetMapping("")
    public List<Menza> listCantens(){
        return menzaService.listAll();
    }
}
