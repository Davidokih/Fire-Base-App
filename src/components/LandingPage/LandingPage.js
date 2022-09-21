import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const LandingPage = () => {
    return (
        <Container>
            <Header>
                <Wrapper>
                    <div>CodeLab</div>
                    <Link to="/signIn"><button>Sing In</button></Link>
                </Wrapper>
            </Header>
            <ImageHold>
                <img src="" alt="Loading..." />
            </ImageHold>
            <p>Welcome to CodeLab</p>
        </Container>
    )
}

export default LandingPage

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    p{
        font-size: 40px;
        font-weight: 800;
    }
`
const ImageHold = styled.div`
    width: 370px;
    height: 400px;
    display: flex;
    border: 1px solid lightgray;
    border-radius: 5px;
    align-items: center;
    justify-content: center;

   
`
const Header = styled.div`
    width: 100%;
    height: 80px;
    border-bottom: 1px solid lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;

`
const Wrapper = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    div{
        font-family: Darling in paris;
        font-size: 35px;
        font-weight: 800;
    }

    button{
        width: 100px;
        height: 35px;
        border: none;
        background-color: blue;
        outline: none;
        color: white;
        font-weight: 700;
        border-radius: 5px;
        transition: 0.0s;
        cursor: pointer;

        :active{
            background-color: lightblue;
        }
    }
`