const studentForm =
    document.getElementById("studentForm");

const message =
    document.getElementById("message");

studentForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const firstName =
            document.getElementById("firstName").value;

        const lastName =
            document.getElementById("lastName").value;

        const grade =
            document.getElementById("grade").value;

        const email =
            document.getElementById("studentEmail").value;

        const { data: userData } =
            await supabaseClient.auth.getUser();

        const teacherId =
            userData.user.id;

        const { error } =
            await supabaseClient
                .from("students")
                .insert([
                    {
                        teacher_id: teacherId,
                        first_name: firstName,
                        last_name: lastName,
                        grade: grade,
                        email: email
                    }
                ]);

        if (error) {

            message.textContent =
                error.message;

            return;
        }

        window.location.href =
            "students.html";
    }
);