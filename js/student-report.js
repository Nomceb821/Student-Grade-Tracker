const params =
    new URLSearchParams(window.location.search);

const studentId =
    params.get("id");

const tableBody =
    document.querySelector("#reportTable tbody");

const averageGrade =
    document.getElementById("averageGrade");


async function loadReportCard() {

    const selectedTerm =
        document.getElementById("termFilter").value;

    // STUDENT INFO
    const { data: student, error: studentError } =
        await supabaseClient
            .from("students")
            .select("*")
            .eq("id", studentId)
            .single();

    if (studentError) {
        console.error(studentError);
        return;
    }

    document.getElementById("studentName").textContent =
        `${student.first_name} ${student.last_name}`;

    document.getElementById("studentGrade").textContent =
        student.grade;

    document.getElementById("teacherComment").textContent =
        student.teacher_comment ||
        "No teacher comment available.";

    // STUDENT GRADES FOR SELECTED TERM
    const { data: grades, error } =
        await supabaseClient
            .from("grades")
            .select(`
                subject_id,
                grade,
                subjects (
                    subject_name
                )
            `)
            .eq("student_id", studentId)
            .eq("term", selectedTerm);

    if (error) {
        console.error(error);
        return;
    }

    tableBody.innerHTML = "";

    let total = 0;

    for (const record of grades) {

        total += Number(record.grade);

        // CLASS AVERAGE FOR THIS SUBJECT IN THIS TERM
        const { data: subjectGrades, error: subjectError } =
            await supabaseClient
                .from("grades")
                .select("grade")
                .eq("subject_id", record.subject_id)
                .eq("term", selectedTerm);

        if (subjectError) {
            console.error(subjectError);
            continue;
        }

        let classAverage = 0;

        if (subjectGrades.length > 0) {

            const classTotal =
                subjectGrades.reduce(
                    (sum, item) =>
                        sum + Number(item.grade),
                    0
                );

            classAverage =
                (
                    classTotal /
                    subjectGrades.length
                ).toFixed(1);
        }

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>
                ${record.subjects.subject_name}
            </td>

            <td>
                ${classAverage}%
            </td>

            <td>
                ${record.grade}%
            </td>
        `;

        tableBody.appendChild(row);
    }

    // LEARNER AVERAGE
    let average = 0;

    if (grades.length > 0) {

        average =
            (
                total /
                grades.length
            ).toFixed(1);
    }

    averageGrade.textContent =
        `${average}%`;

    // PASS / FAIL
    const resultStatus =
        document.getElementById("resultStatus");

    if (average >= 50) {

        resultStatus.textContent =
            "PASSED";

    } else {

        resultStatus.textContent =
            "NOT PASSED";
    }
}

loadReportCard();

document
    .getElementById("termFilter")
    .addEventListener(
        "change",
        loadReportCard
    );