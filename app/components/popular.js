/**
 * Created by bipuk on 5/17/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import apis from '../utils/api';

let SelectLanguage = (props) =>{
    let languages = ['All','JavaScript','Ruby','Java','CSS','Python'];

    return(
        <ul className="languages">
            {languages.map((lang)=> {
                return <li key={lang}
                           style={lang === props.selectedLanguage ? {color: 'red'} : null}
                           onClick={props.updateLanguage.bind(null, lang)}>{lang}</li>
            })}
        </ul>
    );
};

let RepoGrid = (props) => {
    return(
        <ul className="popular-list">
            {props.repos.map((repo, index) => {
                return (
                    <li key={repo.name} className="popular-item">
                        <div className="popular-rank">
                            <ul className="space-list-items">
                                <li>#{index+1}</li>
                                <li>
                                    <img
                                        className="avatar"
                                        src={repo.owner.avatar_url}
                                        alt={'Avatar for'+ repo.owner.login}
                                    />
                                </li>
                                <li><a href={repo.html_url}>{repo.name}</a></li>
                                <li>@{repo.owner.login}</li>
                                <li>{repo.stargazers_count} stars</li>
                            </ul>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
};
RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired,

};

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    updateLanguage: PropTypes.func.isRequired
};

export class Popular extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: null
        };
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    componentDidMount(){
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage(lang){
        this.setState({
           selectedLanguage: lang,
            repos: null
        });
        apis.fetchPopularRepos(lang)
            .then(function (res) {
                this.setState(function () {
                    return {
                        repos: res
                    }
                })
            }.bind(this))
    }

    render(){
        return(
            <div>
                <SelectLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    updateLanguage={this.updateLanguage}/>

                {!this.state.repos ? 'loading' : <RepoGrid repos={this.state.repos}/>}
            </div>
        );
    }
}