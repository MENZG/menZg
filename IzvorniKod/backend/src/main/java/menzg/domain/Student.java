package menzg.domain;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name =  "student")
public class Student extends AppUser {

    @Column(name = "jmbag" ,unique=true, nullable=false)
    private String jmbag;

    @Column(name = "genderStudent", nullable = false)
    private String genderStudent;

    @Column(name = "ageStudent", nullable = false)
    private int ageStudent;

    public String getJmbag() {
        return jmbag;
    }

    public void setJmbag(String jmbag) {
        this.jmbag = jmbag;
    }

    public String getGenderStudent() {
        return genderStudent;
    }

    public void setGenderStudent(String genderStudent) {
        this.genderStudent = genderStudent;
    }

    public int getAgeStudent() {
        return ageStudent;
    }

    public void setAgeStudent(int ageStudent) {
        this.ageStudent = ageStudent;
    }
}
