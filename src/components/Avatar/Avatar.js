import React from "react"
import { Nav, NavDropdown, Image } from 'react-bootstrap'
import './Avatar.css'

export const Avatar = ({ icon, username, handleLogout }) => {

    return (
        <>
            <Nav>
                <NavDropdown
                    title={
                        <Image
                            roundedCircle
                            height='36px'
                            // change with icon prop
                            src='https://cdn-icons.flaticon.com/png/512/522/premium/522298.png?token=exp=1636927036~hmac=d1c1c5ad1450dc4dd96b047deeb2f522' />
                    }
                >
                    <NavDropdown.Item disabled>{username}</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item disabled href="#action/3.2">My Watchlist</NavDropdown.Item>
                    <NavDropdown.Item href="/update-profile">Manage Profile</NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </>
    )
}