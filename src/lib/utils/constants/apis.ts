// const API_URL = "http://localhost:3002/api/v1"; //local
const API_URL = "https://koleshwardhambackend-1.onrender.com/api/v1"; //live

const APIs = {
  // auth
  LOGIN: `${API_URL}/admin/login`,

  // user
  CREATE_USER: `${API_URL}/users/createUser`,

  // payment
  PAYMENT_COLLECTION_METHOD: `${API_URL}/paymentCollectionMethod`,
  CREATE_ORDER_IN_RAZORPAY: `${API_URL}/payment/razorpay/createOrderInRazorpay`,
  PAYMENT_RESPONSE_CALLBACK: `${API_URL}/payment/razorpay/handleCallbackForEcommerce`,

  // contact us
  CONTACT_US: `${API_URL}/contact-us/create`,

  // carousel
  CAROUSEL: `${API_URL}/carousel`,

  //events
  GET_ALL_EVENTS: `${API_URL}/events`,
  GET_EVENT_BY_ID: `${API_URL}/events/getEventById`,
  UPDATE_EVENT: `${API_URL}/events/update`,
  CREATE_EVENT: `${API_URL}/events/create`,
  DELETE_EVENT: `${API_URL}/events/delete`,
};

export default APIs;
