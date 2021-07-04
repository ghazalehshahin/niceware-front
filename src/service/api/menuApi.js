import axiosInstance from ".";

export const menuApi = async (id) => {
    const data = await axiosInstance.get(`/shop/get-categories/${id}/`);
    // console.log(data.data);
    return data.data;
    // setTimeout(() => {
  
    // }, 1000);
  };