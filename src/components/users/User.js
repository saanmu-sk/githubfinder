import React, { useEffect, Fragment, useContext } from 'react'
import Spinner from '../layout/Spinner'
import Repos from '../Repos/Repos'
import GithubContext from '../../context/github/githubContext'
import { Link } from 'react-router-dom'
const User = ({  match }) => {
    const githubContext = useContext(GithubContext)
    const { getUser, loading, repos, getUserRepos, user } = githubContext
    
    useEffect(() => {
        getUser(match.params.login)
        getUserRepos(match.params.login)
        //  eslint-disable-next-line
    }, [])

        const {
            name,
            company,
            avatar_url,
            location,
            bio,
            blog,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable
        } = user

        if (loading) return <Spinner />

        return (
            <Fragment>
                <Link to="/" className="btn btn-light">Back to search</Link>
                Hireable: {' '}
                {hireable ? <i className="fas fa-check text-success"/> : <i className="fas fa-times-circle text-danger"/>}
                <div className="card grid-2">
                    <div className="all-center">
                        <img src={avatar_url} alt={name} className="round-img" style={{ width:"150px" }}/>
                        <h1>{name}</h1>
                        <p>Location: {location}</p>
                    </div>
                    <div>
                        {bio && (
                            <Fragment>
                                <h3>Bio</h3>
                                <p>{bio}</p>
                            </Fragment>
                        )}
                        <a href={html_url} className="btn btn-dark my-1" rel="noopener noreferrer" target="_blank">Visit  Github Profile</a>
                        <ul>
                            <li>
                                {login && (
                                    <Fragment>
                                        <b>Username: </b> {login}
                                    </Fragment>
                                )}
                            </li>

                            <li>
                                {company && (
                                    <Fragment>
                                        <b>Company: </b> {company}
                                    </Fragment>
                                )}
                            </li>

                            <li>
                                {blog && (
                                    <Fragment>
                                        <b>Website: </b> {blog}
                                    </Fragment>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="card text-center">
                    <div className="badge badge-primary">Followers: {followers}</div>
                    <div className="badge badge-white">Following: {following}</div>
                    <div className="badge badge-success">Public Repos: {public_repos}</div>
                    <div className="badge badge-dark">Public Gists: {public_gists}</div>
                </div>
                <Repos repos={repos}/>
            </Fragment>
        )

}


export default User