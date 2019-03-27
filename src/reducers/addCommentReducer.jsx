export default function (state = [], action = {}) {
  switch (action.type) {
    case 'ADD_COMMENT_PENDING':
      return {
        ...state,
        isLoading: true,
        error: false,
      };

    case 'ADD_COMMENT_FULFILLED':
      return {
        ...state,
        isLoading: false,
        success: true,
        data: action.payload.data,
        error: false,
      };

    case 'ADD_COMMENT_REJECTED':
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
