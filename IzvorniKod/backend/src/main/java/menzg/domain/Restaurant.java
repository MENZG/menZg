package menzg.domain;


import jakarta.persistence.*;

import java.sql.Time;

@Entity
@Table(name = "restaurant")
public class Restaurant {

    public Restaurant() {
    }

    public Restaurant(long idRestaurant, String nameRestaurant, Canteen canteen) {
        this.idRestaurant = idRestaurant;
        this.nameRestaurant = nameRestaurant;
        this.canteen = canteen;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idRestaurant")
    private long idRestaurant;

    @Column(name = "nameRestaurant", nullable = false, unique = true)
    private String nameRestaurant;

    @ManyToOne
    @JoinColumn(name = "idCanteen", nullable = false)
    private Canteen canteen;


    @Override
    public String toString() {
        return "Restaurant{" +
                "idRestaurant=" + idRestaurant +
                ", nameRestaurant='" + nameRestaurant + '\'' +
                ", canteen=" + canteen +
                '}';
    }
}
