import React from 'react'
import { useRef, useState } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'

const Form = styled.form`
    align-self: center;
    padding: 30px;
    margin: 15px;
    background-color: white;
    width: 30vw;
    text-align: center;

    & > * {
        margin-bottom: 50px;
    }
`

const Title = styled.h2`
    font-size: 24px;
`

const InputComponent = styled.div`
    text-align: left;
    width: 100%;
    display: flex;
    flex-direction: column;
`

const Label = styled.label`
    font-size: 12px;
    margin-bottom: 5px;    
`

const Input = styled.input`
    outline: 0;
    border: 0;
    box-shadow: -2px -2px 1px #fafafa;
    border-bottom: 1px solid gray;
    border-right: 1px solid gray;
    border-radius: 3px;
    padding: 0.5em 1em;
`

const Button = styled.button`
    padding: 0.3em 0.8em;
    cursor: pointer;
    background-color: orange;
    font-size: 20px;
    color: white;
    border: 0;
    border-radius: 3px;
`

const ErrorText = styled.p`
    color: crimson;
`

export default function Login() {
    const usernameRef = useRef()
    const passwordRef = useRef()
    const [errorMsg, setErrorMsg] = useState("")

    function handleSubmit(event) {
        event.preventDefault()
    }

    function handleClick(event) {
        fetch('http://127.0.0.1:5000/auth/token', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: usernameRef.current.value,
                password: passwordRef.current.value
            })
        })
        .then((res) => res.json())
        .then((data) => {
            if (!data.error_msg) localStorage.setItem('access', data.access)
            else setErrorMsg(data.error_msg)
            
            if (localStorage.getItem('access')) window.location.replace("/profile")
            console.log(data)
        })
            
        event.preventDefault()
    }


    return (
        <>
            <Header />
            <Form onSubmit={handleSubmit}>
                <Title>Login Form</Title>
                <InputComponent>
                    <Label htmlFor='username'>Username</Label>
                    <Input
                        ref={usernameRef}
                        type='text'
                        id='username'
                        name='username'
                    ></Input>
                </InputComponent>

                <InputComponent>
                    <Label htmlFor='password'>Password</Label>
                    <Input
                        ref={passwordRef}
                        type='password'
                        id='password'
                        name='password'
                    ></Input>
                </InputComponent>

                {errorMsg !== "" && <ErrorText>{errorMsg}</ErrorText>}
                <Button onClick={handleClick}>Login</Button>
            </Form>
        </>
    )
}