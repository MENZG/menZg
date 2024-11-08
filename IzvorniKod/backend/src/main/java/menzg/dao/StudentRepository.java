package menzg.dao;

import menzg.domain.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByIdStudent(Long idStudent);
    Optional<Student> findByJmbag(String jmbag);
}
