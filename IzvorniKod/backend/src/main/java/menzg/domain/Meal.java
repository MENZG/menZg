package menzg.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "meal")
public class Meal {

    public Meal() {
    }

    public Meal(long idMeal, String category, int price, String nameMeal) {
        this.idMeal = idMeal;
        this.category = category;
        this.price = price;
        this.nameMeal = nameMeal;
    }

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

    @Override
    public String toString() {
        return "Meal{" +
                "idMeal=" + idMeal +
                ", category='" + category + '\'' +
                ", price=" + price +
                ", nameMeal='" + nameMeal + '\'' +
                '}';
    }
}
