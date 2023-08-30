export const roomRelationalFields: string[] = ['buildingId'];
export const roomRelationalFieldsMapper: { [key: string]: string } = {
  buildingId: 'buildingId',
};

export const roomsFilterableFields: string[] = [
  'searchTerm',
  'room_number',
  'id',
  'floor',
];

export const roomsSearchableFields: string[] = [
  'room_number',
  'buildingId',
  'floor',
];
