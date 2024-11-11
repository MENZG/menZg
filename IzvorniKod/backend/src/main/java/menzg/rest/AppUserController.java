package menzg.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import menzg.domain.AppUser;
import menzg.service.AppUserService;

@RestController
@RequestMapping("/appUsers")
public class AppUserController {
	@Autowired
	private AppUserService appUserService;

	@GetMapping("")
	public List<AppUser> listAppUsers() {
		return appUserService.listAll();
	}

	@PostMapping("")
	public AppUser createAppUser(@RequestBody AppUser appUser) {
		return appUserService.createAppUser(appUser);
	}
}
