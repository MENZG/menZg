package menzg.domain;


import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name =  "employee")
public class Employee extends AppUser {

    @ManyToOne
    @JoinColumn(name = "idCanteen", referencedColumnName = "idCanteen", nullable = false)
    private Canteen canteen;
}
