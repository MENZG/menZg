package menzg.domain;

import jakarta.persistence.*;
import menzgenums.Role;

@Entity
@Table(name =  "appuser")
@Inheritance(strategy = InheritanceType.JOINED)
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idAppUser")
    private Long idUser;

    @Column(name = "passwordAppUser", nullable = false)
    private String passwordUser;

    @Column(name = "usernameAppUser", nullable = false, unique = true)
    private String usernameUser;

    private Role userType;

    //za tip usera student
    @Column(name = "jmbag" ,unique=true, nullable=true)
    private String jmbag;

    @Column(name = "genderStudent", nullable = true)
    private String genderStudent;

    @Column(name = "ageStudent", nullable= true)
    private Integer ageStudent;

    //za tip usera employee
    @ManyToOne
    @JoinColumn(name = "canteen_id_canteen", nullable = true)
    private  Canteen canteen;

    public Canteen getCanteen() {
        return canteen;
    }

    public void setCanteen(Canteen canteen) {
        this.canteen = canteen;
    }


    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public String getUsernameUser() {
        return usernameUser;
    }

    public void setUsernameUser(String usernameUser) {
        this.usernameUser = usernameUser;
    }

    public String getPasswordUser() {
        return passwordUser;
    }

    public void setPasswordUser(String passwordUser) {
        this.passwordUser = passwordUser;
    }

    public Role getUserType() {
        return userType;
    }

    public void setUserType(Role userType) {
        this.userType = userType;
    }

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

    public Integer getAgeStudent() {
        return ageStudent;
    }

    public void setAgeStudent(Integer ageStudent) {
        this.ageStudent = ageStudent;
    }

    public AppUser() {
    }

    public AppUser(long idUser, String passwordUser, String usernameUser, Role userType, String jmbag, String genderStudent, int ageStudent) {
        this.idUser = idUser;
        this.passwordUser = passwordUser;
        this.usernameUser = usernameUser;
        this.userType = userType;
        this.jmbag = jmbag;
        this.genderStudent = genderStudent;
        this.ageStudent = ageStudent;
    }

    public AppUser(long idUser, String passwordUser, String usernameUser, Role userType) {
        this.idUser = idUser;
        this.passwordUser = passwordUser;
        this.usernameUser = usernameUser;
        this.userType = userType;
    }

    public AppUser(long idUser, String passwordUser, String usernameUser, Role userType, Canteen canteen) {
        this.idUser = idUser;
        this.passwordUser = passwordUser;
        this.usernameUser = usernameUser;
        this.userType = userType;
        this.canteen = canteen;
    }

    @Override
    public String toString() {
        return "AppUser{" +
                "idUser=" + idUser +
                ", passwordUser='" + passwordUser + '\'' +
                ", usernameUser='" + usernameUser + '\'' +
                ", userType=" + userType +
                ", jmbag='" + jmbag + '\'' +
                ", genderStudent='" + genderStudent + '\'' +
                ", ageStudent=" + ageStudent +
                '}';
    }
}
