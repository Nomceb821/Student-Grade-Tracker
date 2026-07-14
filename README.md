# Student-Grade-Tracker

Student Grade Tracker

A web-based Student Grade Tracker designed to help teachers efficiently manage students, subjects, grades, attendance, and academic reports. The application provides a simple and intuitive interface for recording student performance while automatically generating professional report cards.

Overview

Student Grade Tracker is a full-stack web application that streamlines academic record management in schools. Teachers can securely log in, manage student information, record grades by term, track attendance, and generate downloadable PDF report cards.

The system is built using HTML, CSS, JavaScript, and Supabase, providing secure authentication and cloud database storage.

**Features**

**Teacher Authentication**
Secure login using Supabase Authentication
Teacher-specific data management
Logout functionality

**Student Management**
Add new students
Edit student information
Delete students
View student profiles
Search and manage student records

**Subject Management**
Add subjects
Edit subjects
Delete subjects
Assign subjects to students

**Grade Management**
Record grades
View grades
Edit grades
Delete grades
Organize grades by academic term
Automatic learner average calculation
Automatic class average calculation

**Attendance Management**
Record student absences
Store absence date
Record absence reason
Organize attendance by term
Display total absent days on report cards

**Academic Report Cards**
Professional report card layout
School logo and branding
Learner information
Subject grades
Class averages
Learner average
Attendance summary
Teacher comments
Pass/Fail status
Teacher and Principal signature sections
Download report as PDF

**Dashboard**
Total students
Total subjects
Total grades recorded
Total absence records
Overall average grade

**Technologies Used**
HTML5
CSS3
JavaScript (ES6)
Supabase
Authentication
PostgreSQL Database
Row Level Security (RLS)
html2pdf.js
Git
GitHub

**Database Structure**

The project uses the following tables:

students
subjects
grades
attendance

Relationships include:

Students → Grades
Subjects → Grades
Students → Attendance
Teachers → Students
Teachers → Subjects
Teachers → Grades
Teachers → Attendance
