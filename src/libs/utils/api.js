import axios from 'axios';

export const callApi = async (url, userMethod, emailid, pass) => {
  try {
    const res = await axios({
      method: userMethod,
      url: `https://express-training.herokuapp.com/api${url}`,
      data: {
        email: emailid,
        password: pass,
      },
    });
    return res.data;
  } catch (err) {
    return err;
  }
};
