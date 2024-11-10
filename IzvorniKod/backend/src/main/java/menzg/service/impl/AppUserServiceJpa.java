package menzg.service.impl;

import menzg.dao.AppUserRepository;
import menzg.domain.AppUser;
import menzg.service.AppUserService;
import menzg.service.RequestDeniedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;

@Service
public class AppUserServiceJpa implements AppUserService {

    @Autowired
    private  AppUserRepository appUserRepo;

  /*  public AppUserServiceJpa(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }*/

    @Override
    public List<AppUser> listAll() {
        return appUserRepo.findAll();
    }

    @Override
    public AppUser createAppUser(AppUser appUser) {
        Assert.notNull(appUser,"App user must given ");
        Assert.isNull(appUser.getIdUser(), "App user ID must be null");
        if(appUserRepo.countByIdUser(appUser.getIdUser()) > 0){
            throw new RequestDeniedException(
                    "App user with ID " + appUser.getIdUser() + " already exists"
            );
        }
        return appUserRepo.save(appUser);
    }

}
