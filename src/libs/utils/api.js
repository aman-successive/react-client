import axios from 'axios';

export const callApi = async (url, userMethod, userData) => {
  try {
    const res = await axios({
      method: userMethod,
      url: `https://express-training.herokuapp.com${url}`,
      data: userData,
      headers: { Authorization: localStorage.getItem('Admin') },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
