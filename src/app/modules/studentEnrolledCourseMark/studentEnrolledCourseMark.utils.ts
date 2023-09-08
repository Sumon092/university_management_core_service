const getGradeFromMarks = (marks: number) => {
  const result = {
    grade: '',
  };
  if (marks >= 0 && marks <= 39) {
    result.grade = 'F';
  } else if (marks >= 40 && marks <= 49) {
    result.grade = 'D';
  } else if (marks >= 50 && marks <= 54) {
    result.grade = 'C';
  } else if (marks >= 55 && marks <= 59) {
    result.grade = 'C+';
  } else if (marks >= 60 && marks <= 64) {
    result.grade = 'B';
  } else if (marks >= 65 && marks <= 69) {
    result.grade = 'B+';
  } else if (marks >= 70 && marks <= 74) {
    result.grade = 'A-';
  } else if (marks >= 75 && marks <= 79) {
    result.grade = 'A';
  } else if (marks >= 80 && marks <= 100) {
    result.grade = 'A+';
  }
  return result;
};

export const StudentEnrolledCourseMarkUtils = {
  getGradeFromMarks,
};
