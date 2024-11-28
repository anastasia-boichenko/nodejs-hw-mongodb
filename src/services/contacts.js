import { ContactsCollection } from '../db/models/contacts.js';

export const getContacts = () => ContactsCollection.find();

export const getContactById = (id) => ContactsCollection.findById(id);

export const addContact = (payload) => ContactsCollection.create(payload);

export const updateContact = async (_id, payload) => {
  const data = await ContactsCollection.findOneAndUpdate({ _id }, payload, {
    new: true,
  });
  return data;
};

export const deleteContactById = (_id) =>
  ContactsCollection.findOneAndDelete({ _id });
