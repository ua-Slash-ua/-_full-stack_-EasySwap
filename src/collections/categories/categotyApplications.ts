// src/collections/RequestCategories.js

import { CollectionConfig } from 'payload'

const RequestCategories: CollectionConfig = {
  slug: 'request-categories',
  labels: {
    plural:'Категорії заявок',
    singular:'Категорія заявки'
  },
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Назва',
    },
  ],
};

export default RequestCategories;
