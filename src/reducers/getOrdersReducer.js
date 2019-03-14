export default function (state = [], action = {}) {
  switch (action.type) {
    case 'GET_ORDERS_LOADING':
      return {
        ...state,
        isLoading: true,
        success: false,
        error: false,
      };

    case 'GET_ORDERS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        success: true,
        ordersData: action.payload.data,
        error: false,
      };

    case 'GET_ORDERS_ERROR':
      return {
        ...state,
        isLoading: false,
        success: false,
        error: true,
      };

    default:
      return {
        ...state,
      };
  }
}
