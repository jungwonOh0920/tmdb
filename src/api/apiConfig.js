const TMDB_AUTHORIZATION = process.env.REACT_APP_TMDB_AUTHORIZATION

const OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_AUTHORIZATION}`
    }
};

export default OPTIONS;