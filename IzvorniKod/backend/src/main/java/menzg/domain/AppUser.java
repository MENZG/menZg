package menzg.domain;

import jakarta.persistence.*;

@Entity
@Table(name =  "appuser")
@Inheritance(strategy = InheritanceType.JOINED)
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idAppUser")
    private long idUser;

    @Column(name = "passwordAppUser", nullable = false)
    private String passwordUser;

    @Column(name = "usernameAppUser", nullable = false, unique = true)
    private String usernameUser;


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
}
