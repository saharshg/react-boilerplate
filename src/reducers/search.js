export default function (state = [], action = {}) {
  switch (action.type) {
    case 'PLANETS_PENDING':
      return {
        ...state,
        isLoading: true,
        error: false,
      };

    case 'PLANETS_FULFILLED':
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        error: false,
      };

    case 'PLANETS_REJECTED':
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
