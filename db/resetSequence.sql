SELECT pg_catalog.setval(pg_get_serial_sequence('cohorts', 'id'), MAX(id)) FROM cohorts;
SELECT pg_catalog.setval(pg_get_serial_sequence('students', 'id'), MAX(id)) FROM students;
SELECT pg_catalog.setval(pg_get_serial_sequence('teams', 'id'), MAX(id)) FROM teams;
SELECT pg_catalog.setval(pg_get_serial_sequence('team_student', 'id'), MAX(id)) FROM team_student;
SELECT pg_catalog.setval(pg_get_serial_sequence('sprints', 'id'), MAX(id)) FROM sprints;
SELECT pg_catalog.setval(pg_get_serial_sequence('messages', 'id'), MAX(id)) FROM messages;
