import api from './api';

const getOrders = () => ({
  type: 'GET_ORDERS',
  payload: api.get('/admin/shop.json'),
});

export default getOrders;
