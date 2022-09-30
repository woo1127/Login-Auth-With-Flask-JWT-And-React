import React from 'react'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import styled from 'styled-components'

const Container = styled.div`
    margin: 40px;
    color: white;
    text-align: center;

    & > * {
        margin-bottom: 30px;
    }
`

const Title = styled.h1`
    font-size: 30px;
`

const Paragraph = styled.p`
    font-size: 24px;
`

export default function Profile() {
    const [profileData, setProfileData] = useState({})

    useEffect(() => {
        fetch('http://127.0.0.1:5000/views/profile', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('access')
            }
        })
        .then((res) => res.json())
        .then((data) => setProfileData(data))
    }, [])

    return (
        <>
            <Header />
            <Container>
                <Title>Profile Data</Title>
                <Paragraph>{profileData.name}</Paragraph>
                <Paragraph>{profileData.msg}</Paragraph>
            </Container>
        </>
    )
}