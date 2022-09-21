import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Home = () => {
    const [myState, setMyState] = useState([])

    useEffect(() => {
        const ref = JSON.parse(localStorage.getItem("view"))
        setMyState(ref)
    }, [])
    return (
        <Container>
            <QuoteDiv>
                {myState?.map(props => {
                    <Card key={props.title}>
                        <p>{props.quote}</p>
                        <div>{props.title}</div>
                    </Card>
                })}
            </QuoteDiv>
        </Container>
    )
}

export default Home


const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const QuoteDiv = styled.div`
    width: 80%;
`
const Card = styled.div`
    width: 450px;
    height: 250px;
    background-color: red;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    p{
        width: 300px;
        text-align: center;
    }
`