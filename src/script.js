const showStudentData = async () => {
  const res = await fetch('data.json')
  const data = await res.json();

  const studentTable = document.getElementById("studentTableBody");

  data.forEach(student => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td class="px-6 py-3">${student.student_name}</td>
      <td class="px-6 py-3">${student.roll}</td>
      <td class="px-6 py-3">${student.cgpa}</td>
    `;

    studentTable.appendChild(row);
  });
}

showStudentData()