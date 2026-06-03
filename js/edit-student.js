const form =
    document.getElementById("editStudentForm");

const message =
    document.getElementById("message");

const params =
    new URLSearchParams(window.location.search);

const studentId =
    params.get("id");


async function loadStudent() {

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

    document.getElementById("firstName").value =
        data.first_name;

    document.getElementById("lastName").value =
        data.last_name;

    document.getElementById("grade").value =
        data.grade;

    document.getElementById("studentEmail").value =
        data.email || "";
}

loadStudent();


form.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const { error } =
            await supabaseClient
                .from("students")
                .update({
                    first_name:
                        document.getElementById("firstName").value,

                    last_name:
                        document.getElementById("lastName").value,

                    grade:
                        document.getElementById("grade").value,

                    email:
                        document.getElementById("studentEmail").value
                })
                .eq("id", studentId);

        if (error) {

            message.textContent =
                error.message;

            return;
        }

        window.location.href =
            "students.html";
    }
);