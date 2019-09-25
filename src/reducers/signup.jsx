export default function (state = [], action = {}) {
  switch (action.type) {
    case 'SIGNUP_PENDING':
      return {
        ...state,
        isLoading: true,
        error: false,
      };

    case 'SIGNUP_FULFILLED':
      return {
        ...state,
        isLoading: false,
        success: true,
        data: action.payload.data,
        error: false,
      };

    case 'SIGNUP_REJECTED':
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
