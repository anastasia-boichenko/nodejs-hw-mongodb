import { SORT_ORDER } from '../constants/contacts.js';
import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { parseContactFilterParams } from '../utils/parseContactFilterParams.js';

export const getContacts = async ({
  page,
  perPage,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const { type, isFavourite } = parseContactFilterParams(filter);

  const contactsQuery = ContactsCollection.find();

  if (type) {
    contactsQuery.where('contactType').equals(type);
  }
  if (isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(isFavourite);
  }

  if (filter.userId) {
    contactsQuery.where('userId').equals(filter.userId);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = (id) => ContactsCollection.findById(id);

export const getContact = (filter) => ContactsCollection.findOne(filter);

export const addContact = (payload) => ContactsCollection.create(payload);

export const updateContactById = async (_id, payload) => {
  return await ContactsCollection.findOneAndUpdate({ _id }, payload, {
    new: true,
  });
};

export const updateContact = async (filter, payload) => {
  return await ContactsCollection.findOneAndUpdate(filter, payload, {
    new: true,
  });
};

export const deleteContactById = (_id) =>
  ContactsCollection.findOneAndDelete({ _id });

export const deleteContact = (filter) =>
  ContactsCollection.findOneAndDelete(filter);
