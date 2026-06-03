const subjectForm =
    document.getElementById("subjectForm");

const message =
    document.getElementById("message");

subjectForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const subjectName =
            document.getElementById("subjectName").value;

        const description =
            document.getElementById("description").value;

        const { data: userData } =
            await supabaseClient.auth.getUser();

        const teacherId =
            userData.user.id;

        const { error } =
            await supabaseClient
                .from("subjects")
                .insert([
                    {
                        teacher_id: teacherId,
                        subject_name: subjectName,
                        description: description
                    }
                ]);

        if (error) {

            message.textContent =
                error.message;

            return;
        }

        window.location.href =
            "subjects.html";
    }
);