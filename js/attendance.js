let attendanceRecords = [];

const tableBody =
    document.querySelector("#attendanceTable tbody");


function renderAttendance(records) {

    tableBody.innerHTML = "";

    records.forEach(record => {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>
                ${record.students.first_name}
                ${record.students.last_name}
            </td>

            <td>
                ${record.date}
            </td>

            <td>
                ${record.term}
            </td>

            <td>
                ${record.reason || ""}
            </td>

            <td>
                <button
                    class="delete-btn"
                    onclick="deleteAttendance('${record.id}')">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}


async function loadAttendance() {

    const { data, error } =
        await supabaseClient
            .from("attendance")
            .select(`
                *,
                students (
                    first_name,
                    last_name
                )
            `)
            .order("date", {
                ascending: false
            });

    if (error) {
        console.error(error);
        return;
    }

    attendanceRecords =
        data;

    renderAttendance(
        attendanceRecords
    );
}

loadAttendance();


// SEARCH
document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        (e) => {

            const search =
                e.target.value.toLowerCase();

            const filtered =
                attendanceRecords.filter(
                    record =>

                        `${record.students.first_name}
                        ${record.students.last_name}`
                        .toLowerCase()
                        .includes(search)

                        ||

                        record.term
                            .toLowerCase()
                            .includes(search)
                );

            renderAttendance(
                filtered
            );
        }
    );


// DELETE
async function deleteAttendance(id) {

    const confirmDelete =
        confirm(
            "Delete this absence record?"
        );

    if (!confirmDelete) return;

    const { error } =
        await supabaseClient
            .from("attendance")
            .delete()
            .eq("id", id);

    if (error) {

        alert(
            error.message
        );

        return;
    }

    loadAttendance();
}