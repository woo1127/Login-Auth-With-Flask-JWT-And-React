import styled from 'styled-components'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = styled.nav`
    height: 10vh;
    box-shadow: 0px 10px 10px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    padding-inline: 6vw;
`

const Logo = styled.h1`
    font-size: 24px;
`

const LoginBtn = styled.button`
    font-size: 18px;
    border: 1px solid gray;
    padding: 0.2em 0.7em;
    border: 0;
    border-radius: 3px;
    background-color: orange;
    color: white;
    cursor: pointer;
    margin-right: 15px;
`

const ProfileBtn = styled.button`
    font-size: 18px;
    border: 0;
    background-color: transparent;
    text-decoration: underline;
    cursor: pointer;
`

export default function Header() {
    function handleClick() {
        if (!localStorage.getItem('access')) {
            window.location.replace('/login')
        }
        else {
            fetch('http://127.0.0.1:5000/auth/logout', {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('access')
                }
            })
            .then((res) => res.json())
            .then((data) => {
                localStorage.removeItem('access')
                window.location.replace("/")
            })
        }
    }

    return (
        <Navbar>
                <Logo>
                    <Link to="/" style={{textDecoration: "none", color: "#333"}}>
                        Brand / Logo
                    </Link>
                </Logo>
            <div>
                <LoginBtn onClick={handleClick}>{!localStorage.getItem('access') ? 'Login': 'Logout'}</LoginBtn>
                {
                    localStorage.getItem('access') && 
                    <ProfileBtn>
                        <Link to="/profile" style={{textDecoration: "none", color: "#333"}}>
                            Profile
                        </Link>
                    </ProfileBtn>
                }
            </div>
        </Navbar>
    )
}
