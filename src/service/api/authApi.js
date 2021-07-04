import axiosInstance from ".";


export const loginApi = async (username, password) => {
  const data = await axiosInstance.post('/account/login/', {
  username,
  password
  });
  return data;
  // setTimeout(() => {
  // }, 1000);
};
export const signupApi = async (username, password, email, role) => {
  console.log(username, password, email, role)
  const data = await axiosInstance.post('/account/register/', {
  username,
  password,
  email,
  role
  });
  return data;
  // setTimeout(() => {

  // }, 1000);
};