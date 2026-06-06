const form =
    document.getElementById("editSubjectForm");

const message =
    document.getElementById("message");

const params =
    new URLSearchParams(window.location.search);

const subjectId =
    params.get("id");

async function loadSubject() {

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

    document.getElementById("subjectName").value =
        data.subject_name;

    document.getElementById("description").value =
        data.description || "";
}

loadSubject();

form.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const { error } =
            await supabaseClient
                .from("subjects")
                .update({
                    subject_name:
                        document.getElementById("subjectName").value,

                    description:
                        document.getElementById("description").value
                })
                .eq("id", subjectId);

        if (error) {

            message.textContent =
                error.message;

            return;
        }

        window.location.href =
            "subjects.html";
    }
);