/**
 * Created by bipuk on 6/3/2017.
 */
import axios from "axios";

module.exports = {
  getTopUserBasedOnLocation(location) {
    var query = window.encodeURI(
      `https://api.github.com/search/users?q=type:user+location:${location}+repos:>5+followers:>10`
    );

    return axios.get(query).then(function(res) {
      return res.data.items;
    });
  },

  fetchPopularRepos(language) {
    let encodedURI = window.encodeURI(
      "https://api.github.com/search/repositories?q=stars:>1+language:" +
        language +
        "&sort=stars&order=desc&type=Repositories"
    );

    return axios.get(encodedURI).then(function(response) {
      return response.data.items;
    });
  }
};
