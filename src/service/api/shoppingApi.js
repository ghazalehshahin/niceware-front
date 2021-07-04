import axiosInstance from ".";

export const addOrderApi = async (userId, productId) => {
    const data = await axiosInstance.post('/shop/buy-product/' , {
        user: userId,
        product: productId
    });
    return data.data;
};


export const deleteOrderApi = async (orderId) => {
    const data = await axiosInstance.delete(`/shop/delete-order/${orderId}/`);
    return data;
};

export const getShoppingCartApi = async (userId) => {
    const data = await axiosInstance.get(`/shop/get-orders/${userId}/`);
    return data.data;
};


export const submitOrderApi = async (user, address, phone, receive_date, orderlist) => {
    const data = await axiosInstance.post(`/shop/create-main-order/`, {
        user,
        address,
        phone,
        receive_date,
        orderlist
    });
    console.log(data);
    return data;
};

export const purchaseOrderApi = async (mainOrderId) => {
    const data = await axiosInstance.delete(`/shop/buy/${mainOrderId}/`);
    return data;
};

export const createAddress = async (about, user) => {
    const data = await axiosInstance.post(`/account/create-address/`,{
        about,
        user
    });
    return data.data;
};

export const createPhone = async (phone, user) => {
    const data = await axiosInstance.post(`/account/create-phone/`,{
        phone,
        user
    });
    return data.data;
};

export const getPhone = async (userId) => {
    const data = await axiosInstance.get(`/account/get-phones/${userId}/`);
    return data.data;
};

export const getAddress = async (userId) => {
    const data = await axiosInstance.get(`/account/get-addresses/${userId}/`);
    return data.data;
};