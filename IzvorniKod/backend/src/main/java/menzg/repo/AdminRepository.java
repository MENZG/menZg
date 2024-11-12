package menzg.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import menzg.model.AppAdmin;

public interface AdminRepository extends JpaRepository<AppAdmin, Long> {

}
