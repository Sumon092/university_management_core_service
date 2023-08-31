export type ICourseData = {
  title: string;
  code: string;
  credits: number;
  preRequisiteCourses: {
    courseId: string;
    isDeleted?: null;
  }[];
};

export type ICourseFilterRequest = {
  searchTerm?: string;
};