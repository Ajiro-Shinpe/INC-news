import * as types from "./constant";
export const getNewsAPIArticles = (payload) => ({
    type:types.GET_NEWS_API_ARTICLES,
    payload
});

export const getNewsAPIArticlesSuccess = (payload) => ({
    type:types.GET_NEWS_API_ARTICLES_SUCCESS,
    payload
});


export const getNewsAPIArticlesFailure = (error) => ({
    type:types.GET_NEWS_API_ARTICLES_FAILURE,
    error
});