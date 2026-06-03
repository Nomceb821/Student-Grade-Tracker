let subjects = [];

const tableBody =
    document.querySelector("#subjectsTable tbody");


// DISPLAY SUBJECTS
function renderSubjects(subjectList) {

    tableBody.innerHTML = "";

    subjectList.forEach(subject => {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>${subject.subject_name}</td>

            <td>${subject.description || ""}</td>

            <td>
                <div class="action-buttons">

                    <button
                        class="view-btn"
                        onclick="viewSubject('${subject.id}')">
                        View
                    </button>

                    <button
                        class="edit-btn"
                        onclick="editSubject('${subject.id}')">
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteSubject('${subject.id}')">
                        Delete
                    </button>

                </div>
            </td>
        `;

        tableBody.appendChild(row);
    });
}


// LOAD SUBJECTS
async function loadSubjects() {

    const { data, error } =
        await supabaseClient
            .from("subjects")
            .select("*")
            .order("subject_name");

    if (error) {
        console.error(error);
        return;
    }

    subjects = data;

    renderSubjects(subjects);
}

loadSubjects();


// SEARCH SUBJECTS
const searchInput =
    document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener(
        "input",
        (e) => {

            const search =
                e.target.value.toLowerCase();

            const filteredSubjects =
                subjects.filter(subject =>

                    subject.subject_name
                        .toLowerCase()
                        .includes(search)

                    ||

                    (subject.description || "")
                        .toLowerCase()
                        .includes(search)
                );

            renderSubjects(filteredSubjects);
        }
    );
}


// DELETE SUBJECT
async function deleteSubject(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this subject?"
        );

    if (!confirmDelete) return;

    const { error } =
        await supabaseClient
            .from("subjects")
            .delete()
            .eq("id", id);

    if (error) {

        alert(error.message);

        return;
    }

    loadSubjects();
}


// VIEW SUBJECT
function viewSubject(id) {

    alert(
        "Subject Details page coming soon!"
    );
}


// EDIT SUBJECT
function editSubject(id) {

    alert(
        "Edit Subject page coming soon!"
    );
}