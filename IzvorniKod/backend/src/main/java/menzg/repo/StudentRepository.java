package menzg.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import menzg.model.Student;

@Repository
public interface StudentRepository  extends JpaRepository<Student, Long> {


}
