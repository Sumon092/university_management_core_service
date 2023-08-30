export type ICourseData = {
  title: string;
  code: string;
  credits: number;
  preRequisiteCourses: {
    courseId: string;
  }[];
};

export type ICourseFilterRequest = {
  searchTerm?: string;
};
