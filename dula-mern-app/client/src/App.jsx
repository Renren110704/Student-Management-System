import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");

  const [edit, setEdit] = useState(null);

  const startEdit = (student) => {
    setEdit(student._id);
    setName(student.name);
    setCourse(student.course);
    setAge(student.age);
  };

  const cancelEdit = () => {
    setEdit(null);
    setName("");
    setCourse("");
    setAge("");
  };

  const fetchStudents = () => {
    axios
      .get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.log("Error fetching students:", error);
      });
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = (event) => {
    event.preventDefault

    axios
      .post("http://localhost:5000/students", {
        name: name,
        course: course,
        age: age
      })
      .then((response) => {
        setStudents([...students, response.data]);
        setName("");
        setCourse("");
        setAge("");
      })
      .catch((error) => {
        console.log("Error adding student:", error)
      });
  }

  const updateStudent = () => {
    axios
      .put(`http://localhost:5000/students/${edit}`, {
        name: name,
        course: course,
        age: age
      })
      .then(() => {
        setEdit(null);
        setName("");
        setCourse("");
        setAge("");
        fetchStudents();
      })
      .catch((error) => {
        console.log("Error updating student:", error);
      });
  }

  return (
    <div>
      <h1>Student Management System</h1>

      <h2>Students</h2>

      <form onSubmit={addStudent}>
        <input type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} required />
        <input type="text" placeholder="Course" value={course} onChange={(event) => setCourse(event.target.value)} required />
        <input type="text" placeholder="Age" value={age} onChange={(event) => setAge(event.target.value)} required />

        {edit ? (
          <>
            <button type="button" onClick={updateStudent}>Update Student</button>
            <button type="button" onClick={cancelEdit}>Cancel</button>
          </>
        ) : (
          <button type="submit">Add Student</button>
        )}
      </form>

      {students.map((student) => (
        <div key={student._id}>
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>
          <button onClick={() => startEdit(student)}>Edit</button>
        </div>
      ))}

    </div>
  );
}

export default App; 