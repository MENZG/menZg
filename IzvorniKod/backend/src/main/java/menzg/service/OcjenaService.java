package menzg.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import menzg.model.Ocjena;
import menzg.repo.OcjenaRepository;

@Service
public class OcjenaService {

	@Autowired
	private OcjenaRepository ocjenaRepo;

	public List<Ocjena> listAll() {

		return ocjenaRepo.findAll();

	};

	public Ocjena getOcjenaData(Long id) {
		return ocjenaRepo.findById(id).orElse(null);
	}

	public Optional<Ocjena> findById(Long id) {
		// TODO Auto-generated method stub
		return ocjenaRepo.findById(id);
	}

	public void saveOcjena(Ocjena ocjena) {
		ocjenaRepo.save(ocjena);
	}

}
