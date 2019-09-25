export default function (state = [], action = {}) {
  switch (action.type) {
    case 'LOGIN_PENDING':
      return {
        ...state,
        isLoading: true,
        error: false,
      };

    case 'LOGIN_FULFILLED':
      return {
        ...state,
        isLoading: false,
        success: true,
        data: action.payload.data,
        error: false,
      };

    case 'LOGIN_REJECTED':
      return {
        ...state,
        isLoading: false,
        error: true,
      };

    default:
      return {
        ...state,
      };
  }
}
