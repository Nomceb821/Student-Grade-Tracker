const studentSelect =
    document.getElementById("studentSelect");

const attendanceForm =
    document.getElementById("attendanceForm");

const message =
    document.getElementById("message");


// LOAD STUDENTS
async function loadStudents() {

    const { data, error } =
        await supabaseClient
            .from("students")
            .select("*")
            .order("first_name");

    if (error) {
        console.error(error);
        return;
    }

    data.forEach(student => {

        const option =
            document.createElement("option");

        option.value =
            student.id;

        option.textContent =
            `${student.first_name} ${student.last_name}`;

        studentSelect.appendChild(option);
    });
}

loadStudents();


// SAVE ABSENCE
attendanceForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const { data: userData } =
            await supabaseClient.auth.getUser();

        const teacherId =
            userData.user.id;

        const { error } =
            await supabaseClient
                .from("attendance")
                .insert([
                    {
                        teacher_id: teacherId,

                        student_id:
                            studentSelect.value,

                        date:
                            document
                                .getElementById("absenceDate")
                                .value,

                        term:
                            document
                                .getElementById("term")
                                .value,

                        reason:
                            document
                                .getElementById("reason")
                                .value
                    }
                ]);

        if (error) {

            message.textContent =
                error.message;

            return;
        }

        window.location.href =
            "attendance.html";
    }
);