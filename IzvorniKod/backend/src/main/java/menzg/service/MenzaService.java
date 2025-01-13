package menzg.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import menzg.model.Menza;
import menzg.model.RadnoVrijeme;
import menzg.repo.MenzaRepository;

@Service
public class MenzaService {

	@Autowired
	MenzaRepository menzaRepo;

	public List<Menza> listAll() {

		return menzaRepo.findAll();

	};

	public Menza getMenzaData(Long id) {
		return menzaRepo.findById(id).orElse(null);
	}

	public Optional<Menza> findById(Long menzaId) {
		// TODO Auto-generated method stub
		return menzaRepo.findById(menzaId);
	}

	public void saveMenza(Menza menza) {
		menzaRepo.save(menza);
	}

	public boolean azurirajRadnoVrijeme(Long idMenze, RadnoVrijeme radnoVrijeme) {
		// Pronađi menzu prema ID-ju
		Menza menza = menzaRepo.findById(idMenze).orElse(null);

		if (menza == null) {
			return false; // Menza s navedenim ID-jem ne postoji
		}

		// Provjeri postoji li već radno vrijeme za isti dan
		RadnoVrijeme postojeceRadnoVrijeme = menza.getRadnaVremena().stream()
				.filter(rv -> rv.getDan().equalsIgnoreCase(radnoVrijeme.getDan())).findFirst().orElse(null);

		if (postojeceRadnoVrijeme != null) {
			// Ažuriraj postojeće radno vrijeme
			postojeceRadnoVrijeme.setPocetak(radnoVrijeme.getPocetak());
			postojeceRadnoVrijeme.setKraj(radnoVrijeme.getKraj());
		} else {
			// Kreiraj novo radno vrijeme i dodaj ga u menzu
			RadnoVrijeme novoRadnoVrijeme = new RadnoVrijeme();
			novoRadnoVrijeme.setDan(radnoVrijeme.getDan());
			novoRadnoVrijeme.setPocetak(radnoVrijeme.getPocetak());
			novoRadnoVrijeme.setKraj(radnoVrijeme.getKraj());
			novoRadnoVrijeme.setMenza(menza);

			menza.getRadnaVremena().add(novoRadnoVrijeme);
		}

		// Spremi promjene u bazi
		menzaRepo.save(menza);

		System.out.println("Radno vrijeme ažurirano ili dodano u listu radnog vremena za menzu " + idMenze + " .");
		return true;
	}

}
