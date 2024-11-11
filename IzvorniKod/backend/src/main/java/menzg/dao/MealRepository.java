package menzg.dao;

import menzg.domain.Jelo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealRepository extends JpaRepository<Jelo, Long> {
}
