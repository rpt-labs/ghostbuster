CREATE TABLE IF NOT EXISTS cohorts (
  id SERIAL PRIMARY KEY,
  cohort_name text NOT NULL UNIQUE,
  phase text,
  status text
);

CREATE TABLE IF NOT EXISTS enrollments (
  id SERIAL PRIMARY KEY,
  cohort_id integer REFERENCES cohorts ON DELETE CASCADE,
  student_id integer,
  status text
);

CREATE TABLE IF NOT EXISTS students (
  enrollment_id integer REFERENCES enrollments,
  first_name text NOT NULL,
  last_name text NOT NULL,
  zoom_name text,
  github text UNIQUE NOT NULL,
  status text NOT NULL,
  cohort_id integer REFERENCES cohorts ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS teams (
  id SERIAL PRIMARY KEY,
  team_name text NOT NULL,
  team_type text NOT NULL,
  github text NOT NULL UNIQUE,
  cohort_id integer REFERENCES cohorts ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS team_student (
  id SERIAL PRIMARY KEY,
  team_id integer REFERENCES teams ON DELETE CASCADE,
  enrollment_id integer REFERENCES enrollments ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sprints (
  id SERIAL PRIMARY KEY,
  sprint_name text NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  message_text text NOT NULL,
  sprint_id integer REFERENCES sprints ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS student_sprints (
  id SERIAL PRIMARY KEY,
  enrollment_id integer REFERENCES enrollments,
  sprint_id integer REFERENCES sprints ON DELETE CASCADE,
  fork boolean NOT NULL,
  bmr boolean NOT NULL,
  percent_complete integer
);

CREATE TABLE IF NOT EXISTS student_sprints_commits (
  id SERIAL PRIMARY KEY,
  commit_text text NOT NULL,
  is_master boolean,
  is_milestone boolean,
  branch_name text,
  student_sprints_id integer REFERENCES student_sprints ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS team_student_weekly_contributions (
  id SERIAL PRIMARY KEY,
  team_student_id integer REFERENCES team_student,
  date_checked date NOT NULL,
  num_changes integer NOT NULL,
  num_commits integer NOT NULL
);

CREATE TABLE IF NOT EXISTS student_attendance (
    id SERIAL PRIMARY KEY,
    enrollment_id integer REFERENCES enrollments,
    zoom_id text NOT NULL,
    user_id integer NOT NULL,
    user_name text NOT NULL,
    device text,
    LOCATION text,
    data_center text,
    join_time date NOT NULL,
    leave_time date NOT NULL,
    recording boolean,
    pc_name text,
    first_name text,
    last_name text,
    room text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS students_staff_comments (
  id SERIAL PRIMARY KEY,
  enrollment_id integer REFERENCES enrollments,
  comment text NOT NULL,
  staff_name text NOT NULL,
  comment_type text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS student_absences (
    id SERIAL PRIMARY KEY,
    enrollment_id integer REFERENCES enrollments,
    first_name text,
    last_name text,
    user_name text NOT NULL,
    cohort text,
    type text,
    is_absent boolean,
    is_late boolean,
    data_center text,
    notes_id integer REFERENCES students_staff_comments,
    is_excused boolean,
    points integer NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS toyproblems (
  id SERIAL PRIMARY KEY,
  name text NOT NULL
);

CREATE TABLE IF NOT EXISTS cohorts_toyproblems (
  id SERIAL PRIMARY KEY,
  release_date date,
  cohort_id integer REFERENCES cohorts ON DELETE CASCADE,
  toyproblem_id integer REFERENCE toyproblems ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS toyproblem_completions (
  id SERIAL PRIMARY KEY,
  pr_date date NOT NULL,
  student_id integer REFERENCES students ON DELETE CASCADE,
  cohorts_toyproblems_id integer REFERENCES cohorts_toyproblems ON DELETE CASCADE
);
