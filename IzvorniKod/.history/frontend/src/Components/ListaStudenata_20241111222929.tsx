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
  return <div>ListaStudenata</div>;
};

export default ListaStudenata;
