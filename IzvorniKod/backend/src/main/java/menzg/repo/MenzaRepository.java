package menzg.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import menzg.model.Menza;

@Repository
public interface MenzaRepository extends JpaRepository<Menza, Long> {
}
