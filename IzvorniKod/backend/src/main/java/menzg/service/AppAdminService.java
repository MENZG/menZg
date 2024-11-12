package menzg.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import menzg.model.AppAdmin;
import menzg.repo.AdminRepository;

@Service
public class AppAdminService {

	@Autowired
	AdminRepository repo;

	public AppAdmin getAdminData(Long id) {

		return repo.findById(id).orElse(null);

	}

}
