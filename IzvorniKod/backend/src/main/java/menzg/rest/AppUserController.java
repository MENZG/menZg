package menzg.rest;

import menzg.domain.AppUser;
import menzg.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appUsers")
public class AppUserController {
    @Autowired
    private AppUserService appUserService;
    @GetMapping("")
    public List<AppUser> listAppUsers(){
        return appUserService.listAll();
    }

    @PostMapping("")
    public AppUser createAppUser(@RequestBody AppUser appUser){
        return appUserService.createAppUser(appUser);
    }
}
