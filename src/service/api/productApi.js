import axiosInstance from ".";

export const createproductApi = async (formData) => {
    const data = await axiosInstance.post('/shop/create-product/' , formData);
    // console.log(data);
    return data;
    // setTimeout(() => {
  
    // }, 1000);
  };
  
export const getproductlistApi = async (cat1, cat2) => {
  if(cat1 && !cat2) {
    const data = await axiosInstance.get(`/shop/get-product-category1/${cat1}/`);
    return data.data;
  }
  if(cat1 && cat2) {
    const data = await axiosInstance.get(`/shop/get-product-category1-category2/${cat1}/${cat2}/`);
    return data.data;
  }
  // console.log(data);
  // setTimeout(() => {

  // }, 1000);
};

  
export const getproductApi = async (productId) => {
  const data = await axiosInstance.get(`/shop/get-product/${productId}/`);
  return data.data;
};

export const setCommentApi = async (user, product, text) => {
  console.log(user, product, text);
  const data = await axiosInstance.post('/shop/create-comment/',{
  user,
  product, 
  text
  });
  return data.data;
};

export const getCommentApi = async (productId) => {
  const data = await axiosInstance.get(`/shop/get-comments/${productId}/`);
  return data.data;
};