export const facultyFilterableFields: string[] = [
  'searchTerm',
  'facultyId',
  'email',
  'contactNo',
  'gender',
  'bloodGroup',
  'gender',
  'academicFacultyId',
  'academicDepartmentId',
  'designation',
];

export const facultySearchableFields: string[] = [
  'firstName',
  'lastName',
  'middleName',
  'email',
  'contactNo',
  'facultyId',
];

export const facultyRelationalFields: string[] = [
  'academicFacultyId',
  'academicDepartmentId',
];

export const facultyRelationalFieldsMapper: { [key: string]: string } = {
  academicFacultyId: 'academicFaculty',
  academicDepartmentId: 'academicDepartment',
};
