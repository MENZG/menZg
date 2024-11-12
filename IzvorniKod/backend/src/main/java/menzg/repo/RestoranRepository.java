package menzg.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import menzg.model.Restoran;

@Repository
public interface RestoranRepository extends JpaRepository<Restoran, Long> {

}
