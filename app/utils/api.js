/**
 * Created by bipuk on 6/3/2017.
 */
import axios from "axios";

module.exports = {
  fetchPopularRepos: function(language) {
    let encodedURI = window.encodeURI(
      "https://api.github.com/search/repositories?q=stars:>1+language:" +
        language +
        "&sort=stars&order=desc&type=Repositories"
    );
    var query = window.encodeURI(
      "https://api.github.com/search/users?q=type:user+location:dhaka+repos:>5+followers:>10"
    );

    axios.get(query).then(function(res) {
      console.log(res);
    });

    return axios.get(encodedURI).then(function(response) {
      return response.data.items;
    });
  }
};
