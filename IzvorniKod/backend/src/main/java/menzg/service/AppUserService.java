package menzg.service;

import menzg.domain.AppUser;

import java.util.List;

public interface AppUserService {
    List<AppUser> listAll();
    AppUser createAppUser(AppUser appUser);
}
