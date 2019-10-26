import _ from "lodash";
import movies from "./movies.js";

export const contains = ({ name }, query) => {
  if (name.includes(query)) {
    return true;
  }

  return false;
};

export const getMovies = (limit = 500, query = "") => {
  return new Promise((resolve, reject) => {
    if (query.length === 0) {
      resolve(_.take(movies, limit));
    } else {
      const formattedQuery = query.toLowerCase();
      const results = _.filter(movies, movie => {
        return contains(movie, formattedQuery);
      });
      resolve(_.take(results, limit));
    }
  });
};

export default getMovies;