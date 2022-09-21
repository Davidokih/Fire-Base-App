import React from 'react'
import styled from 'styled-components'
import { FaTelegramPlane } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Post/AuthProvider';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db, storage, auth } from '../../Base'

const Header = () => {

    const imageController = async (e) => {
        const file = e.target.files[0]
        const save = URL.createObjectURL(file)
        setAvatar(save)

        const storageRef = ref(storage, 'userAvatar/' + file.name)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on(
            "state_changed",
            (snapShot) => {
                const progress = (snapShot.bytesTransferred / snapShot.totalBytes) * 10;
                console.log("Upload is " + progress + "% done");
                setPercentage(progress)
            },
            (error) => {
                console.log(error.message)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                    console.log("File available at", downloadUrl);
                    setAvatar(downloadUrl);
                    console.log("This is the Avatar: ", avatar);
                })
            }
        )
    }
    return (
        <>
            <Container>
                <Wrapper>
                    <Link to="/HomePage"><div>CodeLab</div></Link>
                    <Holder>
                        <FaTelegramPlane size={30} />
                        <Link to="/signIn"><img src="/logo512.png" alt="Loading..." /></Link>
                    </Holder>
                </Wrapper>

            </Container>
            <Hold>
                <Card>
                    <ImageHold><img /></ImageHold>
                    <p>Welcome to CodeLab</p>
                    <ButtonHold>
                        <button>Image</button>
                        <Link to="/HomePage"><button>Post</button></Link>
                    </ButtonHold>
                </Card>
            </Hold>
        </>
    )
}

export default Header

const Container = styled.div`
    width: 100%;
    height: 80px;
    border-bottom: 1px solid lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0px;

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
const Holder = styled.div`

    width: 150px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img{
        width: 50px;
        background-color: black;
        border-radius: 50%;
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

    img{
        position: relative;
    }
`
const Hold = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: red; */

    p{
        text-align: center;
    }
`
const Card = styled.div`
    width: 70%;
    margin-top: 50px;
    /* background-color: red; */
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const ButtonHold = styled.div`
    width: 370px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button{
        width: 100px;
        height: 35px;
        border: none;
        background-color: blue;
        color: white;
        font-weight: 700;
        border-radius: 5px;
    }
`
