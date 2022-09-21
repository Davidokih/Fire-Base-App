import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <Container>
            <Wrapper>
                <Navigator>
                    <Link to='/'> <button>Get Quote</button></Link>
                    <Link to='/postPage'><button>Input Quote</button></Link>
                </Navigator>
            </Wrapper>

        </Container>
    )
}

//slick-carousel

export default Header

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center; 
    background-color: red;

`
const Navigator = styled.div`
    width: 90%;
    background-color: red;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;

    button{
        font-size: 17px;
        font-weight: 700;
        color: #000;
        height: 40px;
        width: 150px;
        border: none;
        outline: none;
        border-radius: 5px;
    }
`
