import getDateFormatted from '../../../libs/utils/moment';

const columnData = [
  {
    field: 'name',
    label: 'Name',
    align: 'center',
  },
  {
    field: 'email',
    label: 'Email Address',
    format: value => value && value.toUpperCase(),
  },
  {
    field: 'createdAt',
    label: 'Date',
    align: 'right',
    format: getDateFormatted,
  },
];

export default columnData;
