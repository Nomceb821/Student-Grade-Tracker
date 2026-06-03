let students = [];

const tableBody =
    document.querySelector("#studentsTable tbody");

function renderStudents(studentList) {

    tableBody.innerHTML = "";

    studentList.forEach(student => {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>${student.first_name}</td>
            <td>${student.last_name}</td>
            <td>${student.grade}</td>
            <td>
                <div class="action-buttons">
                    <button
                        class="view-btn"
                        onclick="viewStudent('${student.id}')">
                        View
                    </button>

                    <button
                        class="edit-btn"
                        onclick="editStudent('${student.id}')">
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteStudent('${student.id}')">
                        Delete
                    </button>
                </div>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

async function loadStudents() {

    const { data, error } =
        await supabaseClient
            .from("students")
            .select("*");

    if (error) {
        console.error(error);
        return;
    }

    students = data;

    renderStudents(students);
}

loadStudents();

async function deleteStudent(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this student?");

    if (!confirmDelete) return;

    const { error } =
        await supabaseClient
            .from("students")
            .delete()
            .eq("id", id);

    if (error) {
        alert(error.message);
        return;
    }

    loadStudents();
}

function editStudent(id) {

    window.location.href =
        `edit-student.html?id=${id}`;
}

function viewStudent(id) {

    window.location.href =
        `student-details.html?id=${id}`;
}

document
    .getElementById("searchInput")
    .addEventListener("input", (e) => {

        const search =
            e.target.value.toLowerCase();

        const filteredStudents =
            students.filter(student =>

                student.first_name
                    .toLowerCase()
                    .includes(search)

                ||

                student.last_name
                    .toLowerCase()
                    .includes(search)

                ||

                student.grade
                    .toLowerCase()
                    .includes(search)
            );

        renderStudents(filteredStudents);
    });

    