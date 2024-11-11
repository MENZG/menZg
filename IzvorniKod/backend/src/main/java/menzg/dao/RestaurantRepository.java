package menzg.dao;

import menzg.domain.Canteen;
import menzg.domain.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    @Query("select r from Restaurant r where r.canteen = ?1")
    List<Restaurant> findByCanteen(Canteen canteen);
}
