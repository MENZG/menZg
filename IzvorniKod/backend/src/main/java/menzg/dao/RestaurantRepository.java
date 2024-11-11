package menzg.dao;

import menzg.domain.Menza;
import menzg.domain.Restoran;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface RestaurantRepository extends JpaRepository<Restoran, Long> {

    @Query("select r from Restaurant r where r.canteen = ?1")
    List<Restoran> findByCanteen(Menza canteen);
}
