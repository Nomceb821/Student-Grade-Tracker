const studentDetails =
    document.getElementById("studentDetails");

const params =
    new URLSearchParams(window.location.search);

const studentId =
    params.get("id");

async function loadStudentDetails() {

    const { data, error } =
        await supabaseClient
            .from("students")
            .select("*")
            .eq("id", studentId)
            .single();

    if (error) {
        console.error(error);
        return;
    }

    studentDetails.innerHTML = `
        <p><strong>First Name:</strong> ${data.first_name}</p>
        <p><strong>Last Name:</strong> ${data.last_name}</p>
        <p><strong>Grade:</strong> ${data.grade}</p>
        <p><strong>Email:</strong> ${data.email || "N/A"}</p>
    `;
}

loadStudentDetails();