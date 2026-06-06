let grades = [];

const tableBody =
    document.querySelector("#gradesTable tbody");


// DISPLAY GRADES
function renderGrades(gradeList) {

    tableBody.innerHTML = "";

    gradeList.forEach(grade => {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>
                ${grade.students.first_name}
                ${grade.students.last_name}
            </td>

            <td>
                ${grade.subjects.subject_name}
            </td>

            <td>
                ${grade.grade}
            </td>
            <td>${grade.term}</td>

            <td>
                <div class="action-buttons">

                    <button
                        class="view-btn"
                        onclick="viewGrade('${grade.id}')">
                        View
                    </button>

                    <button
                        class="edit-btn"
                        onclick="editGrade('${grade.id}')">
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteGrade('${grade.id}')">
                        Delete
                    </button>

                </div>
            </td>
        `;

        tableBody.appendChild(row);
    });
}


// LOAD GRADES
async function loadGrades() {

    const { data, error } =
        await supabaseClient
            .from("grades")
            .select(`
                *,
                students (
                    first_name,
                    last_name
                ),
                subjects (
                    subject_name
                )
            `);

    if (error) {
        console.error(error);
        return;
    }

    grades = data;

    renderGrades(grades);
}

loadGrades();


// SEARCH
const searchInput =
    document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener(
        "input",
        (e) => {

            const search =
                e.target.value.toLowerCase();

            const filteredGrades =
                grades.filter(grade =>

                    `${grade.students.first_name}
                     ${grade.students.last_name}`
                        .toLowerCase()
                        .includes(search)

                    ||

                    grade.subjects.subject_name
                        .toLowerCase()
                        .includes(search)
                );

            renderGrades(filteredGrades);
        }
    );
}


// DELETE
async function deleteGrade(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this grade?"
        );

    if (!confirmDelete) return;

    const { error } =
        await supabaseClient
            .from("grades")
            .delete()
            .eq("id", id);

    if (error) {

        alert(error.message);

        return;
    }

    loadGrades();
}


// VIEW
function viewGrade(id) {

    window.location.href =
        `grade-details.html?id=${id}`;
}


// EDIT
function editGrade(id) {

    window.location.href =
        `edit-grade.html?id=${id}`;
}