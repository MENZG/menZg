package menzg.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import menzg.model.Jelo;

@Repository
public interface JeloRepository extends JpaRepository<Jelo, Long> {
}
