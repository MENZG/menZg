package menzg.domain;


import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "canteen")
public class Canteen {

    public Canteen() {
    }

    public Canteen(long idCanteen, String imeMenze, String location, List<AppUser> employees) {
        this.idCanteen = idCanteen;
        this.nameCanteen = imeMenze;
        this.location = location;
        //this.employees = employees;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idCanteen")
    private long idCanteen;

    @Column(name = "nameCanteen", nullable = false, unique = true)
    private String nameCanteen;

    @Column(name = "location", nullable = false)
    private String location;

   // @ManyToOne()
    //private List<AppUser> employees;


    public long getIdCanteen() {
        return idCanteen;
    }

    public void setIdCanteen(long idCanteen) {
        this.idCanteen = idCanteen;
    }

    public String getNameCanteen() {
        return nameCanteen;
    }

    public void setNameCanteen(String imeMenze) {
        this.nameCanteen = imeMenze;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    @Override
    public String toString() {
        return "Canteen{" +
                "idCanteen=" + idCanteen +
                ", imeMenze='" + nameCanteen + '\'' +
                ", location='" + location + '\'' +
                ", employees="  +
                '}';
    }
}
