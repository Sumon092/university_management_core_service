export const academicSemesterSearchAbleFields = [
  'title',
  'code',
  'startMonth',
  'endMonth',
];

export const academicSemesterFilterAbleFields = [
  'searchTerm',
  'startMonth',
  'code',
  'endMonth',
];

export const academicSemesterOptions = ['page', 'limit', 'sortBy', 'sortOrder'];

export const academicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
export const EVENT_ACADEMIC_SEMESTER_CREATED = 'Academic semester created';
