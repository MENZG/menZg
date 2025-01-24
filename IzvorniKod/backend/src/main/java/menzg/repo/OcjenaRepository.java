package menzg.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import menzg.model.Ocjena;

@Repository
public interface OcjenaRepository extends JpaRepository<Ocjena, Long> {

}
