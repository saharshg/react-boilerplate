export default function (state = [], action = {}) {
  switch (action.type) {
    case 'GET_COMMENTS_PENDING':
      return {
        ...state,
        isLoading: true,
        error: false,
      };

    case 'GET_COMMENTS_FULFILLED':
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        error: false,
      };

    case 'GET_COMMENTS_REJECTED':
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
