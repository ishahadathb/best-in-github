/**
 * Created by bipuk on 6/3/2017.
 */
const clientId = 'CLIENT_ID';
const clientSecret = 'CLIENT_SECRET';

const auth = `?client_id=${clientId}&client_secret=${clientSecret}`;
import axios from "axios";

export const Api = {
    getTopUserBasedOnLocation(location) {
        var query = window.encodeURI(
            `https://api.github.com/search/users?q=type:user+location:${location}+repos:>5+followers:>10`
        );

        return axios
            .get(query)
            .then(function (res) {
                return res.data.items;
            })
            .then(items => {
                return items.map((item, index) => {
                    return {
                        ranking: index + 1,
                        username: item.login,
                        avatar: item.avatar_url,
                        repos_url: item.repos_url,
                        githubUrl: item.html_url,
                        starCount: this.getStarCounts.call(Api, item.repos_url)
                    };
                });
            });
    },

    getPageCount(link){
        /* get the number of page for each given repos url
        * to fetch all the repos */
        /* get the second part of headers.link string (separated by comma)*/

        console.log(getPageCount);
        //let getCurrentPage= link.split(',')[0].match(/&per_page=\d+/)[0];
        return getPageCount;
    },

    getStarCounts(repos) {
        let repoCount = repos + auth + '&per_page=100';
        return axios.get(repoCount).then(repo => {
            if (repo.headers.hasOwnProperty('link')) {
                let pagC = repo.headers.link.match(/&page=\d+/g)[1];
                let totalPageCount = pagC.substr( pagC.length - 1 );
                console.log(totalPageCount);
            }
            return repo.data.reduce((acc, curr) => {
                //console.log(acc+curr.stargazers_count);
                return acc + curr.stargazers_count;
            }, 0);
        })
    },

    fetchPopularRepos(language) {
        let encodedURI = window.encodeURI(
            "https://api.github.com/search/repositories?q=stars:>1+language:" +
            language +
            "&sort=stars&order=desc&type=Repositories"
        );

        return axios.get(encodedURI).then(function (response) {
            return response.data.items;
        });
    }
};
