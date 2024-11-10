package menzg.dao;

import menzg.domain.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {

    Optional<AppUser> findByIdUser(Long idUser);
    Optional<AppUser> findByUsernameUser(String usernameUser);

    //spring ce sam implementirat
    int countByIdUser(Long idUser);
}
