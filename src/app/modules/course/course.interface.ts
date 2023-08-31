export type ICourseData = {
  title: string;
  code: string;
  credits: number;
  preRequisiteCourses: IPreRequisiteCourseRequest[];
};

export type ICourseFilterRequest = {
  searchTerm?: string;
};
export type IPreRequisiteCourseRequest = {
  courseId: string;
  isDeleted?: null;
};
