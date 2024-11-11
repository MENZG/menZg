package menzg.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import menzg.model.Restoran;
import menzg.repo.RestoranRepository;

@Service
public class RestaurantService {

	@Autowired
	RestoranRepository repo;

	public List<Restoran> listAll() {

		return repo.findAll();

	};
}
