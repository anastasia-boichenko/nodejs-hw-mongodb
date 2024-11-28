import { contactTypeOptions } from '../constants/contacts.js';

const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;

  const validTypes = contactTypeOptions;
  return validTypes.includes(type) ? type : undefined;
};

const parseIsFavourite = (isFavourite) => {
  if (isFavourite === 'true') return true;
  if (isFavourite === 'false') return false;
  return undefined;
};

export const parseContactFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = parseType(type);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
