const getGradeFromMarks = (marks: number) => {
  const result = {
    grade: '',
    point: 0,
  };
  if (marks >= 0 && marks <= 39) {
    result.grade = 'F';
    result.point = 0.0;
  } else if (marks >= 40 && marks <= 49) {
    result.grade = 'D';
    result.point = 2.25;
  } else if (marks >= 50 && marks <= 54) {
    result.grade = 'C';
    result.point = 2.5;
  } else if (marks >= 55 && marks <= 59) {
    result.grade = 'C+';
    result.point = 2.75;
  } else if (marks >= 60 && marks <= 64) {
    result.grade = 'B';
    result.point = 3.0;
  } else if (marks >= 65 && marks <= 69) {
    result.grade = 'B+';
    result.point = 3.25;
  } else if (marks >= 70 && marks <= 74) {
    result.grade = 'A-';
    result.point = 3.5;
  } else if (marks >= 75 && marks <= 79) {
    result.grade = 'A';
    result.point = 3.75;
  } else if (marks >= 80 && marks <= 100) {
    result.grade = 'A+';
    result.point = 4.0;
  }
  return result;
};

export const StudentEnrolledCourseMarkUtils = {
  getGradeFromMarks,
};
