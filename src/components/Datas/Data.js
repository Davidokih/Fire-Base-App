import React from 'react'
import styled from 'styled-components'

const Data = () => {
    return (
        <Container>
            <Wrapper>
                <Image>
                    <img src="/logo192.png" />
                </Image>
                <Div>
                    <Title>The morning sun</Title>
                    <Description>In the morning the sun will rise if it don't you'er dead</Description>
                </Div>
            </Wrapper>
        </Container>
    )
}

export default Data


const Container = styled.div`
    width: 100%;
`
const Wrapper = styled.div`
    width: 400px;
`
const Image = styled.div`
    background-color: black;
    width: 400px;

    img{
        width: 100%;
    }
`
const Div = styled.div`
    text-align: center;
`
const Title = styled.div`
    font-size: 25px;
    font-weight: 800;
`
const Description = styled.div``