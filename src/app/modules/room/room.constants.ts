export const roomRelationalFields: string[] = ['buildingId'];
export const roomRelationalFieldsMapper: { [key: string]: string } = {
  buildingId: 'building',
};

export const roomsFilterableFields: string[] = [
  'searchTerm',
  'room_number',
  'id',
  'floor',
  'building.title',
];

export const roomsSearchableFields: string[] = [
  'room_number',
  'buildingId',
  'floor',
];
