import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {

    axios
      .get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data);
      });

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

  return (
    <div>
      <h1>Student Management System</h1>

      <h2>Students</h2>

      <form onSubmit={addStudent}>
        <input type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} required />
        <input type="text" placeholder="Course" value={course} onChange={(event) => setCourse(event.target.value)} required />
        <input type="text" placeholder="Age" value={age} onChange={(event) => setAge(event.target.value)} required />
        <button type="submit">Add Student</button>
      </form>

      {students.map((student) => (
        <div key={student.id}>
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>
        </div>
      ))}

    </div>
  );
}

export default App; 