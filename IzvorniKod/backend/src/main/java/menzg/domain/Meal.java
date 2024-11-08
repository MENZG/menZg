package menzg.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "meal")
public class Meal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idMeal")
    private  long idMeal;

    @Column(name = "category", nullable = false)
    private String category;

    @Column(name = "price", nullable = false)
    private int price;

    @Column(name = "nameMeal", nullable = false, unique = true)
    private String nameMeal;
}
