import React, { useEffect, useState } from 'react'
import Link from '../components/Link/Link'
import List from '../components/List/List'
import styled from 'styled-components'

const ProfileWrapper = styled.div`
    width: 50%;
    margin: 10px auto;
`

const Avatar = styled.img`
    width: 150px;
`


const Profile = () => {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [repos, setRepos] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        fetch('https://api.github.com/users/NewDekart')
            .then(response => response.json())
            .then(data => {
                setData(data)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
                setError(true)
            })
    }, [])

    useEffect(() => {
        if (data) {
            setLoading(true)
            fetch(data.repos_url)
                .then(response => response.json())
                .then(data => {
                    setRepos(data)
                    setLoading(false)
                })
                .catch(() => {
                    setLoading(false)
                    setError(true)
                })
        }
    }, [data])

    if (loading) {
        return (
            <>Loading...</>
        )
    }

    if (error) {
        return (
            <>Network Error</>
        )
    }

    const items = data && [
        { label: 'html_url', value: <Link url={data.html_url}
            title='Github URL' /> },
        { label: 'repos_url', value: data.repos_url },
        { label: 'name', value: data.name},
        { label: 'company', value: data.company },
        { label: 'location', value: data.location },
        { label: 'email', value: data.email },
        { label: 'bio', value: data.bio }
    ]

    const projects = repos && repos.map(repository => ({
        label: repository.name,
        value: <Link url={repository.html_url} title='Github URL'/>
    }))

    return (
        <>
            {data &&
                <ProfileWrapper>
                    <Avatar className="Profile-avatar" src={data && data.avatar_url} alt='avatar' />
                    <List items={items} title='Profile' />
                    <List items={projects} title='Projects' />
                </ProfileWrapper>
            }
        </>
    )

}

export default Profile
