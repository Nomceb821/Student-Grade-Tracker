const form =
    document.getElementById("editGradeForm");

const message =
    document.getElementById("message");

const studentSelect =
    document.getElementById("studentSelect");

const subjectSelect =
    document.getElementById("subjectSelect");

const params =
    new URLSearchParams(window.location.search);

const gradeId =
    params.get("id");


// LOAD STUDENTS
async function loadStudents() {

    const { data } =
        await supabaseClient
            .from("students")
            .select("*")
            .order("first_name");

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

    const { data } =
        await supabaseClient
            .from("subjects")
            .select("*")
            .order("subject_name");

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


// LOAD CURRENT GRADE
async function loadGrade() {

    const { data, error } =
        await supabaseClient
            .from("grades")
            .select("*")
            .eq("id", gradeId)
            .single();

    if (error) {
        console.error(error);
        return;
    }

    studentSelect.value =
        data.student_id;

    subjectSelect.value =
        data.subject_id;

    document.getElementById("grade").value =
        data.grade;
}


async function initialize() {

    await loadStudents();

    await loadSubjects();

    await loadGrade();
}

initialize();


// UPDATE GRADE
form.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const { error } =
            await supabaseClient
                .from("grades")
                .update({
                    student_id:
                        studentSelect.value,

                    subject_id:
                        subjectSelect.value,

                    grade:
                        document.getElementById("grade").value
                })
                .eq("id", gradeId);

        if (error) {

            message.textContent =
                error.message;

            return;
        }

        window.location.href =
            "grades.html";
    }
);