import axios from "axios";
import { useEffect, useState } from "react";

interface Student {
  username: string;
  lozinka: string;
  spol: string;
  dob: number;
}

const ListaStudenata = () => {
  const [student, setStudent] = useState<Student[]>([]);

  useEffect(() => {
    axios
      .get("/api/student/1")
      .then((response) => {
        console.log("Full response:", response);
        console.log("response.data:", response.data);
        setStudent(response.data || []);
      })
      .catch((error) => {
        console.error("Greška prilikom dohvaćanja menzi:", error);
        setStudent([]);
      });
  }, []);
  return (
    <div>
      {student.length > 0 ? (
        student.map((stud, index) => (
          <div key={index}>
            <p>Username: {stud.username}</p>
            <p>Lozinka: {stud.lozinka}</p>
            <p>Spol: {stud.spol}</p>
            <p>Dob: {stud.dob}</p>
          </div>
        ))
      ) : (
        <p>Nema dostupnih podataka o studentima.</p>
      )}
    </div>
  );
};

export default ListaStudenata;
