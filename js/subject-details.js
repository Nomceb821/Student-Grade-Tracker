const subjectDetails =
    document.getElementById("subjectDetails");

const params =
    new URLSearchParams(window.location.search);

const subjectId =
    params.get("id");

async function loadSubjectDetails() {

    const { data, error } =
        await supabaseClient
            .from("subjects")
            .select("*")
            .eq("id", subjectId)
            .single();

    if (error) {
        console.error(error);
        return;
    }

    subjectDetails.innerHTML = `
        <p><strong>Subject:</strong> ${data.subject_name}</p>

        <p><strong>Description:</strong>
        ${data.description || "No description"}</p>
    `;
}

loadSubjectDetails();