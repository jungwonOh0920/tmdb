import { useState } from 'react'
import Button from '../Button/Button'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { getAuth } from "firebase/auth"
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { db } from '../../firebase.config'

function DragNDrop() {
    const [file, setFile] = useState<File>()
    const [dragActive, setDragActive] = useState(false)
    const auth = getAuth()

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()

        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            console.log(typeof e.dataTransfer.files[0])
            setFile(e.dataTransfer.files[0])
        }
    }

    const handleSubmit = async () => {
        if (file) {
            // delete avatar
            if (auth.currentUser) {
                const userRef = doc(db, 'users', auth.currentUser.uid)
                await updateDoc(userRef, {
                    avatar: deleteField()
                })
            }

            return new Promise((res, rej) => {
                const storage = getStorage()
                const fileName = `${auth?.currentUser?.uid}`

                const storageRef = ref(storage, 'images/' + fileName)

                const uploadTask = uploadBytesResumable(storageRef, file)
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                        }
                    },
                    (error) => {
                        rej(error)
                    },
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            res(downloadURL)
                            console.log('File available at', downloadURL);
                        });
                    }
                );
            })

        } else {
            console.log('no file selected!!');
        }
    }

    return (
        <div className={`drag-n-drop-container ${dragActive ? 'drag-active' : ''}`} onDragEnter={handleDrag}>
            <input type='file' id='input-file-upload' hidden onChange={handleFileInput} />
            <label htmlFor='input-file-upload'>OR Choose Your Own</label>
            <span id='file-chosen' className='file-title'>{file ? file.name : 'No file selected.'}</span>
            <Button onClick={handleSubmit}>Submit</Button>
            {dragActive && <div className='drag-file-element' onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} ></div>}
        </div>
    )
}

export default DragNDrop