import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { doc, collection, setDoc, addDoc } from 'firebase/firestore'
import { db, storage, auth } from '../../Base/Base'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { createUserWithEmailAndPassword, getRedirectResult, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import CircularProgress from '@mui/material/CircularProgress';


const Post = () => {
    const navigate = useNavigate()
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [image, setImage] = useState("");
    const [percentage, setPercentage] = useState("");

    const uploadImage = (e) => {
        const file = e.target.files[0];
        const save = URL.createObjectURL(file)
        setImage(save)

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

    const registerUser = async () => {
        const user = doc(collection(db, "registerUsers"))
        await setDoc(user, {
            userName,
            email,
            password,
            avatar
        })

        setUserName("");
        setEmail("");
        setPassword("")

        // navigate("/")
    }

    // console.log(registerUser())

    const authUser = async () => {
        const user = await createUserWithEmailAndPassword(auth, email, password)
        console.log(user.user.uid)

        if (user) {
            const userData = doc(collection(db, "registerUsers"), user.user.uid)
            await setDoc(userData, {
                userName,
                email,
                password,
                avatar
            })
        }

        setUserName("")
        setEmail("")
        setPassword("")

        navigate("/HomePage")
    }

    const authUserGoogle = async () => {
        const provider = new GoogleAuthProvider()
        const user = await signInWithPopup(auth, provider)

        if (user) {
            const userData = doc(collection(db, "registerUsers"), user.user.uid)
            await setDoc(userData, {
                userName: user.user.displayName,
                email: user.user.email,
                avatar: user.user.photoURL
            })
        }

        setEmail("")
        setPassword("")

        navigate("/HomePage")
    }

    const authUserGithub = async () => {
        const credential = new GithubAuthProvider()
        const user = await getRedirectResult(auth, credential)

        if (user) {
            const userData = doc(collection(db, "registerUsers"), user.user.uid)
            await setDoc(userData, {
                userName: user.user.displayName,
                email: user.user.email,
                avatar: user.user.photoURL
            })
        }

        navigate("/HomePage")
    }
    return (
        <Container>
            <Wrapper>
                <Avatar src={image} />
                {percentage > 0 && percentage < 99 ? (
                    <div style={{ width: "300px" }}>
                        <CircularProgress
                            value={Math.floor(percentage)}
                            variant="determinate"
                        />
                        {Math.floor(percentage)}%
                    </div>
                ) : null}
                <Upload htmlFor="pix"> Upload<input onChange={uploadImage} type="file" id="pix" /></Upload>
                <InputHold>
                    <input placeholder='User Name' value={userName} onChange={(e) => {
                        setUserName(e.target.value)
                    }} />
                    <input placeholder='Email' value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                    <input placeholder='Password' value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                    <button onClick={authUser}>Sign Up</button>
                    <button onClick={authUserGoogle}>SignIn with Google</button>
                    <button onClick={authUserGithub}>SignIn with Github</button>
                </InputHold>
                <p>By signing up, you agree to our Terms , Data Policy and Cookies Policy .</p>
            </Wrapper>
            <BoxHold>
                <p>Have an account? <Link to='/signIn' style={{ textDecoration: 'none' }}><span>LogIn</span></Link></p>
            </BoxHold>
        </Container>
    )
}

export default Post

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const Wrapper = styled.div`
    width: 370px;
    height: 480px;
    display: flex;
    border: 1px solid lightgray;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    /* background-color: skyblue; */
    flex-direction: column;

   p{
       text-align: center;
       font-size: 13px;
       width: 280px;
   }
`
const InputHold = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
     input{
        outline: none;
        width: 280px;
        height: 30px;
        /* border: none; */
        border: 0.5px solid lightgray;
        margin: 5px;
        padding-left: 5px;
        border-radius: 5px;
        /* :hove{
            border: 2px solid lightgray;
        } */
    }

    button{
        outline: none;
        border: none;
        background-color: blue;
        width: 280px;
        height: 27px;
        color: white;
        font-weight: 700;
        border-radius: 5px;
        cursor: pointer;
        margin: 5px;
    }
`

const Upload = styled.label`

        outline: none;
        border: none;
        background-color: blue;
        width: 100px;
        height: 50px;
        color: white;
        font-weight: 700;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    input{
        display: none;
    }
`
const BoxHold = styled.div`
    width: 370px;
    height: 100px;
    display: flex;
    border: 1px solid lightgray;
    border-radius: 5px;
    align-items: center;
    justify-content: center;   
    margin: 10px;
    text-decoration: none;

    p{
        font-weight: 700;
    }
    span{
        color: blue;
        font-weight: 700;
    }
`
const Avatar = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: skyblue;
    margin: 10px;
`
