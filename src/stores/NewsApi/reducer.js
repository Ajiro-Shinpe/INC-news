import * as types from "./constant";

export const initialState = {
    isNewsApiArticlesFetching: false,
    newsAPIArticles: [],
    newsAPIArticleError: null,
}

const NewsAPIReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_NEWS_API_ARTICLES:
            return {
                ...state,
                isNewsApiArticlesFetching: true,
                newsAPIArticleError: null,
            };
        case types.GET_NEWS_API_ARTICLES_SUCCESS:
            return {
                ...state,
                isNewsApiArticlesFetching: false,
                newsAPIArticles: action.payload,
                newsAPIArticleError: null,
            };
        case types.GET_NEWS_API_ARTICLES_FAILURE:
            return {
                ...state,
                isNewsApiArticlesFetching: false,
                newsAPIArticleError: action.error,
            };

        default:
            return state;
    }
}

export default NewsAPIReducer;