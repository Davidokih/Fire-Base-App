import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { FaTelegramPlane } from 'react-icons/fa'
import { FcLike } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Post/AuthProvider';
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db, storage, auth } from '../../Base/Base'




const Header = () => {

    const { currentUser } = useContext(AuthContext)

    const [msg, setMsg] = useState("")
    const [image, setImage] = useState("")
    const [postImage, setPostImage] = useState("")
    const [percentage, setPercentage] = useState("")


    const imageController = async (e) => {
        const file = e.target.files[0]
        const save = URL.createObjectURL(file)
        setImage(save)

        const storageRef = ref(storage, 'userImage/' + file.name)
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
                    setImage(downloadUrl);
                    console.log("This is the Avatar: ", image);
                })
            }
        )
    }

    const post = async () => {
        const userData = doc(collection(db, "post"))
        await setDoc(userData, {
            msg,
            postImage,
            createAt: serverTimestamp(),
            createBy: currentUser.uid
        })

        setMsg("")
        setImage("")
    }
    return (
        <>
            <Container>
                <Wrapper>
                    <div>CodeLab</div>
                    <Holder>
                        <Link to="/post"><FaTelegramPlane size={30} /></Link>
                        <button>LogOut</button>
                        <img src="/logo512.png" alt="Loading..." />
                    </Holder>
                </Wrapper>

            </Container>

            <Holds>
                <Carder>
                    <img src={image} />
                    <textarea placeholder="What's on your mind" value={msg} onChange={(e) => { setMsg(e.target.value) }} />
                    <p>Welcome to CodeLab</p>
                    <ButtonHolder>
                        <label><input type="file" id="pix" onChange={imageController} style={{ display: "none" }} /></label>
                        <Link to="/HomePage"><button onClick={post}>Post</button></Link>
                    </ButtonHolder>
                </Carder>
            </Holds>
            <Hold>
                <Card>
                    <Img>
                        <img src="" alt="Loading..." />
                        <div>
                            <p>useName</p>
                            <p>email</p>
                        </div>
                    </Img>
                    <ImageHold>
                        <img src="" />
                    </ImageHold>
                    <p>msg</p>
                    <ButtonHold>
                        <FcLike fontSize="30px" />
                        <button>Comment</button>
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
    /* margin-bottom: 0px; */

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

    width: 210px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img{
        width: 35px;
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
        /* position: relative; */

        width: 100%;
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
    width: 80%;
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
const Img = styled.div`
    /* background-color: blue; */
    width: 370px;
    display: flex;
    align-items: center; 
    margin-bottom: 10px;
    /* justify-content: flex-end; */
/*    
        position: absolute;
        top: 80px;

        left: 105px; */
    img{
        width: 60px;
        background-color: black;
        border-radius: 50%;
    }

    @media (max-width: 800px) {
        width: 370px;
        align-items: center; 
        justify-content: flex-start;

        img{
            width: 50px;
        }

        p{
            margin: 2px;
            padding-left: 10px;
            font-size: 13px;
            color: blue;
        }
    }
`
const Holds = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: red; */

    p{
        text-align: center;
    }
`
const Carder = styled.div`
    width: 70%;
    margin-top: 50px;
    /* background-color: red; */
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    textarea{
        border: none;
        outline: none;
        background-color: lightgray;
        height: 250px;
        width: 400px;
        border-radius: 10px;
        padding: 10px;
        font-size: 12px;
    }
`
const ButtonHolder = styled.div`
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

    label{
        width: 100px;
        height: 35px;
        border: none;
        background-color: blue;
        color: white;
        font-weight: 700;
        border-radius: 5px;
    }
`