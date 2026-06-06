const studentSelect =
    document.getElementById("studentSelect");

const subjectSelect =
    document.getElementById("subjectSelect");

const gradeForm =
    document.getElementById("gradeForm");

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

    data.forEach(subject => {

        const option =
            document.createElement("option");

        option.value =
            subject.id;

        option.textContent =
            subject.subject_name;

        subjectSelect.appendChild(option);
    });
}

loadStudents();
loadSubjects();


// SAVE GRADE
gradeForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();
         const term =
            document.getElementById("term").value;

        const { data: userData } =
            await supabaseClient.auth.getUser();

        const teacherId =
            userData.user.id;

        console.log("Student ID:", studentSelect.value);
        console.log("Subject ID:", subjectSelect.value);

        const { error } =
            await supabaseClient
                .from("grades")
                .insert([
                    {
                        teacher_id: teacherId,
                        student_id: studentSelect.value,
                        subject_id: subjectSelect.value,
                        grade: document.getElementById("grade").value,
                        term: term
                    }
                ]);

        if (error) {

            message.textContent =
                error.message;

            return;
        }

        window.location.href =
            "grades.html";
    }
);