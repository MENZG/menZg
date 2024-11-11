package menzg.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import menzg.model.Menza;
import menzg.repo.MenzaRepository;

@Service
public class MenzaService {

	@Autowired
	MenzaRepository repo;

	public List<Menza> listAll() {

		return repo.findAll();

	};
}
