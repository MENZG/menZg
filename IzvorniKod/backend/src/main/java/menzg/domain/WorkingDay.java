package menzg.domain;

import jakarta.persistence.*;

import java.sql.Time;

@Entity
@Table(name = "working_day")
public class WorkingDay {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "day_of_the_week", nullable = false)
    private String day_of_the_week;

    @Column(nullable = true)
    private Time breakfastOpeningTime;
    @Column(nullable = true)
    private Time breakfastClosingTime;
    @Column(nullable = true)
    private Time lunchOpeningTime;
    @Column(nullable = true)
    private Time lunchClosingTime;
    @Column(nullable = true)
    private Time dinnerOpeningTime;
    @Column(nullable = true)
    private Time dinnerClosingTime;

    @ManyToOne
    @JoinColumn(name = "restaurant_id_restaurant")
    private  Restaurant restaurant;

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public WorkingDay() {
    }

    public WorkingDay(long id, String day, Time openingTime, Time closingTime) {
        this.id = id;
        this.day_of_the_week = day;
       // this.openingTime = openingTime;
        //this.closingTime = closingTime;
    }

    @Override
    public String toString() {
        return "WorkingTime{" +
                "idWT=" + id +
                ", day='" + day_of_the_week + '\'' +
                ", opening="  +
                ", closing="  +
                '}';
    }
}
