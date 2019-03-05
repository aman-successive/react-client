import * as moment from 'moment';

const getDateFormatted = (date) => {
  moment.defaultFormat = 'dddd, MMMM Do YYYY, h:mm:ss a';
  const newDate = moment.utc(date).toDate().toString();
  return (moment(newDate).format(moment.defaultFormat));
};

export default getDateFormatted;
