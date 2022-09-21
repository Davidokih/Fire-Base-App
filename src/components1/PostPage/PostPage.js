import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { StateContext } from '../GlobalStates'

const PostPage = () => {
    const { viewPost, setViewPost } = useContext(StateContext)
    const [inputData, setInputData] = useState("")
    const [inputDataTitle, setInputDataTitle] = useState("")

    const submit = () => {

        const data = {
            id: Math.ceil(Math.random() * 1000000),
            quote: inputData,
            title: inputDataTitle
        }
        setViewPost([...viewPost, data])
        localStorage.setItem("view", JSON.stringify(viewPost))
    }
    return (
        <Container>
            <Wrapper>
                <input
                    placeholder='Title'
                    value={inputData} onChange={(e) => {
                        setInputData(e.target.value)
                    }}
                />
                <InputQuote
                    placeholder='Quote'
                    value={inputDataTitle} onChange={(e) => {
                        setInputDataTitle(e.target.value)
                    }}
                />
                <button onAuxClick={submit}>Submit</button>
            </Wrapper>
        </Container>
    )
}

export default PostPage

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const Wrapper = styled.div`
    width: 450px;
    background-color: red;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 500px;
    border-radius: 10px;
    
    input{
        border: none;
        outline: none;
        width: 300px;
        margin-bottom: 30px;
        height: 30px;
        border-radius: 10px;
    }

    button{
        width: 120px;
        height: 50px;
        outline: none;
        border: none;
        border-radius: 10px;
        background-color: chartreuse;
        font-family: Bookman Old Style;
        font-weight: 700;
        font-size: 18px;
        transition: all 360ms;
        
        :active{
            background-color: transparent;
            border: 1px solid #fff;
            color: #fff;
        }

        :hover{
            cursor: pointer;
        }
    }
`

const InputQuote = styled.textarea`
    width: 300px;
    height: 200px;
    border: none;
    outline: none;
    margin-bottom: 30px;
    border-radius: 10px;
`