package menzg.domain;


import jakarta.persistence.*;

@Entity
@Table(name = "restaurant")
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idRestaurant")
    private long idRestaurant;

    @Column(name = "nameRestaurant", nullable = false, unique = true)
    private String nameRestaurant;

    @ManyToOne
    @JoinColumn(name = "idCanteen", nullable = false)
    private Canteen canteen;
}
