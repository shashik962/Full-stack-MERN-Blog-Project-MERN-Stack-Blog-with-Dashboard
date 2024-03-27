import { Alert, Button, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {
    const { currentUser }  = useSelector(state =>  state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const filePickerRef = useRef();
    const [imageFileUploadedProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadedError, setImageFileUploadedError] = useState(null);
    console.log(imageFileUploadedProgress, imageFileUploadedError);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
        
    }
    console.log(imageFile, imageFileUrl);
    useEffect(() => {
        if(imageFile) {
            uploadImage();
        }
    }, [imageFile])

    const uploadImage = () => {
        // service firebase.storage {
        //     match /b/{bucket}/o {
        //         match /{allPaths=**} {
        //         allow read;
        //         allow write: if
        //         request.resource.size < 2 * 1024 * 1024  &&
        //         request.resource.contentType.matches('image/.*')
        //         }
        //     }
        // }
        setImageFileUploadedError(null);
        const storage  = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageFileUploadProgress(progress.toFixed(0));

            },
            (error) => {
                setImageFileUploadedError('Could not upload image (File must be less than 2MB)');
                setImageFileUploadProgress(null);
                setImageFileUrl(null);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                })   
            }
        )
    }

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-4'>
            <input 
                type='file' 
                accept='image/*' 
                onChange={handleImageChange} 
                ref={filePickerRef}
                hidden
            />
            <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
                {imageFileUploadedProgress && (
                    <CircularProgressbar 
                        value={imageFileUploadedProgress || 0} 
                        text={`${imageFileUploadedProgress}%`} 
                        strokeWidth={5}
                        style={{
                            root: {
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0
                            },
                            path: {
                                stroke: `rgba(62, 152, 199, ${imageFileUploadedProgress / 100 })`
                            }
                        }}
                    />
                )}
                <img 
                    src={imageFileUrl || currentUser.profilePicture} alt="user" 
                    className={`rounded-full w-full  h-full object-cover border-8 border-[lightgray] ${
                        imageFileUploadedProgress &&
                        imageFileUploadedProgress < 100 &&
                        'opacity-60'
                    }`}
                    onClick={() => filePickerRef.current.click()}
                />
            </div>
            {imageFileUploadedError && <Alert color='failure'>{ imageFileUploadedError }</Alert>}
            <TextInput 
                type='text'
                id='username'
                placeholder='username'
                defaultValue={currentUser.username}
            />
            <TextInput 
                type='text'
                id='email'
                placeholder='email'
                defaultValue={currentUser.email}
            />
            <TextInput 
                type='text'
                id='password'
                placeholder='password'
            />
            <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                Update
            </Button>
        </form>
        <div className='text-red-500 flex justify-between mt-5'>
            <span className='cursor-pointer'>Delete Account</span>
            <span className='cursor-pointer'>Sign Out</span>
        </div>
    </div>
  )
}
