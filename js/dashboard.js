async function loadDashboardStats() {

    // STUDENTS
    const { count: studentCount } =
        await supabaseClient
            .from("students")
            .select("*", { count: "exact", head: true });

    // SUBJECTS
    const { count: subjectCount } =
        await supabaseClient
            .from("subjects")
            .select("*", { count: "exact", head: true });

    // GRADES
    const { data: gradesData, count: gradeCount } =
        await supabaseClient
            .from("grades")
            .select("*", { count: "exact" });

    const { count: attendanceCount } =
    await supabaseClient
        .from("attendance")
        .select("*", {
            count: "exact",
            head: true
        });

    document.getElementById("attendanceCount").textContent =
        attendanceCount || 0;

    document.getElementById("studentCount").textContent =
        studentCount || 0;

    document.getElementById("subjectCount").textContent =
        subjectCount || 0;

    document.getElementById("gradeCount").textContent =
        gradeCount || 0;

    let average = 0;

    if (gradesData && gradesData.length > 0) {

        const total =
            gradesData.reduce(
                (sum, grade) =>
                    sum + Number(grade.grade),
                0
            );

        average =
            (total / gradesData.length)
                .toFixed(1);
    }

    document.getElementById("averageGrade").textContent =
        `${average}%`;
}

loadDashboardStats();

document
    .getElementById("logoutBtn")
    .addEventListener(
        "click",
        async () => {

            await supabaseClient.auth.signOut();

            window.location.href =
                "index.html";
        }
    );