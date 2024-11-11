package menzg.dao;

import menzg.domain.Menza;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CanteenRepository extends JpaRepository<Menza, Long> {
}
