import Header from "../components/Header"
import React from "react"
import styled from "styled-components"

const Title = styled.h1`
    margin-top: 30px;
    font-size: 30px;
    color: white;
    text-align: center;
`

export default function Home() {
    return (
        <div>
            <Header />
            <Title>Login Authentication with flask-jwt and react</Title>
        </div>
    )
}