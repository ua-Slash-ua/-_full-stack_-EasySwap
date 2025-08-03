// import { CollectionConfig } from 'payload'
// import { PreviewSvg } from '@/plugin/sl_PreviewSvg'
//
// export  const Currencies: CollectionConfig = {
//   slug: 'currencies',
//
//   labels: {
//     singular: 'Валюта',
//     plural: 'Валюти',
//   },
//   admin: {
//     useAsTitle: 'code', // показувати в заголовку код валюти
//     defaultColumns: ['code', 'name', 'symbol'],
//   },
//   access: {
//     create: () => true,
//     read: () => true,
//     update: () => true,
//     delete: () => true,
//   },
//   fields: [
//     {
//       name: 'code',
//       label: 'Код (наприклад, USD)',
//       type: 'text',
//       required: true,
//       unique: true,
//     },
//     {
//       name: 'name',
//       label: 'Назва (наприклад, Долар США)',
//       type: 'text',
//       required: true,
//     },
//     {
//       name: 'icon',
//       type: 'upload',
//       relationTo: 'media',
//       required: true,
//       label: 'Icon',
//     },
//     {
//       name: 'ratesByCurrency',
//       label: 'Курси по валютах',
//       type: 'array',
//       labels: {
//         singular: 'Курс',
//         plural: 'Курси',
//       },
//       fields: [
//         {
//           name: 'currency',
//           label: 'Валюта',
//           type: 'relationship',
//           relationTo: 'currencies',
//           required: true,
//         },
//         {
//           name: 'buy1000',
//           label: 'Купівля (від 1000)',
//           type: 'number',
//           required: true,
//         },
//         {
//           name: 'sell1000',
//           label: 'Продаж (від 1000)',
//           type: 'number',
//           required: true,
//         },
//         {
//           name: 'buy5000',
//           label: 'Купівля (від 5000)',
//           type: 'number',
//           required: true,
//         },
//         {
//           name: 'sell5000',
//           label: 'Продаж (від 5000)',
//           type: 'number',
//           required: true,
//         },
//       ],
//     }
//
//   ],
// };
//
