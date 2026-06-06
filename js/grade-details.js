const gradeDetails =
    document.getElementById("gradeDetails");

const params =
    new URLSearchParams(window.location.search);

const gradeId =
    params.get("id");

async function loadGradeDetails() {

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
            `)
            .eq("id", gradeId)
            .single();

    if (error) {
        console.error(error);
        return;
    }

    gradeDetails.innerHTML = `
        <p>
            <strong>Student:</strong>
            ${data.students.first_name}
            ${data.students.last_name}
        </p>

        <br>

        <p>
            <strong>Subject:</strong>
            ${data.subjects.subject_name}
        </p>

        <br>

        <p>
            <strong>Grade:</strong>
            ${data.grade}
        </p>
    `;
}

loadGradeDetails();