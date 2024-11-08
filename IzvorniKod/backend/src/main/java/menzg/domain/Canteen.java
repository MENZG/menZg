package menzg.domain;


import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "canteen")
public class Canteen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idCanteen")
    private long idCanteen;

    @Column(name = "imeMenze", nullable = false, unique = true)
    private String imeMenze;

    @Column(name = "location", nullable = false)
    private String location;

    @OneToMany(mappedBy = "canteen")
    private List<Employee> employees;
}
