package menzg.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import menzg.model.Student;
import menzg.repo.StudentRepository;

@Service
public class StudentService {

	@Autowired
	StudentRepository repo;

	public Student getStudentData(Long id) {
		return repo.findById(id).orElse(null);
	}

	public Student save(Student student) {
		return repo.save(student);
	}

}
