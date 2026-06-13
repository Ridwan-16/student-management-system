let students = [];

const showStudentData = async () => {
  const res = await fetch('data.json');
  const data = await res.json();

  students = data;
  renderTable(students);
};

const renderTable = (data) => {
  const studentTable = document.getElementById("studentTableBody");
  studentTable.innerHTML = "";

  data.forEach(student => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td class="px-6 py-3">${student.student_name}</td>
      <td class="px-6 py-3">${student.roll}</td>
      <td class="px-6 py-3">${student.cgpa}</td>
    `;

    studentTable.appendChild(row);
  });
};

showStudentData();

//sort roll wise

const sortRollAsc = () => {
  let n = students.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1; j++) {
      if (students[j].roll > students[j + 1].roll) {
        let temp = students[j];
        students[j] = students[j + 1];
        students[j + 1] = temp;
      }
    }
  }

  renderTable(students);
}

const sortRollDesc = () => {
  let n = students.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1; j++) {
      if (students[j].roll < students[j + 1].roll) {
        let temp = students[j];
        students[j] = students[j + 1];
        students[j + 1] = temp;
      }
    }
  }

  renderTable(students);
}

document.getElementById("sortSelect").addEventListener("change", () => {
  if (event.target.value === "rollNumber-asc") {
    sortRollAsc();
  }
})

document.getElementById("sortSelect").addEventListener("change", () => {
  if (event.target.value === "rollNumber-desc") {
    sortRollDesc();
  }
})

//sort cgpa wise
const sortCgpaAsc = () => {
  let n = students.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1; j++) {
      if (students[j].cgpa < students[j + 1].cgpa) {
        let temp = students[j];
        students[j] = students[j + 1];
        students[j + 1] = temp;
      }
    }
  }

  renderTable(students);
}

const sortCgpaDesc = () => {
  let n = students.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1; j++) {
      if (students[j].cgpa > students[j + 1].cgpa) {
        let temp = students[j];
        students[j] = students[j + 1];
        students[j + 1] = temp;
      }
    }
  }

  renderTable(students);
}

document.getElementById("sortSelect").addEventListener("change", () => {
  if (event.target.value === "cgpa-asc") {
    sortCgpaAsc();
  }
})

document.getElementById("sortSelect").addEventListener("change", () => {
  if (event.target.value === "cgpa-desc") {
    sortCgpaDesc();
  }
})

// Searching by roll
const searchByRoll = (roll) => {
  for (let i = 0; i < students.length; i++) {
    if (students[i].roll == roll) {
      return students[i];
    }
  }
  return null;
};

document.getElementById("searchInput_roll").addEventListener("input", function (e) {
  const value = e.target.value.trim();

  if (value === "") {
    renderTable(students);
    return;
  }

  const result = searchByRoll(value);

  if (result) {
    renderTable([result]);
  }
  else {
    document.getElementById("studentTableBody").innerHTML =
      `<tr>
        <td colspan="3" class="text-center py-4 text-red-500">
          No student found
        </td>
      </tr>`;
  }
});

// new student data 
let newStudents = JSON.parse(localStorage.getItem("students")) || [];

const showNewStudentData = async () => {
  if (students.length === 0) {
    const res = await fetch('data.json');
    students = await res.json();
  }

  renderTable(students);
};

const addStudent = () => {
  const name = document.getElementById("nameInput").value;
  const roll = document.getElementById("rollInput").value;
  const cgpa = document.getElementById("cgpaInput").value;

  if (!name || !roll || !cgpa) {
    alert("Please fill all fields");
    return;
  }

  const newStudent = {
    student_name: name,
    roll: Number(roll),
    cgpa: Number(cgpa)
  };

  students.push(newStudent);

  renderTable(students);

  // clear inputs
  document.getElementById("nameInput").value = "";
  document.getElementById("rollInput").value = "";
  document.getElementById("cgpaInput").value = "";
};

document.getElementById("addStudentBtn").addEventListener("click", addStudent);