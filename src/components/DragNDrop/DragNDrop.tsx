import { useState } from 'react'
import Button from '../Button/Button'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

function DragNDrop() {
    const [filename, setFilename] = useState<string | undefined>()
    const [dragActive, setDragActive] = useState(false)

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            setFilename(e.target.files[0].name)
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
            setFilename(e.dataTransfer.files[0].name)
        }
    }

    const handleSubmit = () => {
        if (filename) {

        } else {
            console.log('no file selected!!');
        }
    }

    return (
        <div className={`drag-n-drop-container ${dragActive ? 'drag-active' : ''}`} onDragEnter={handleDrag}>
            <input type='file' id='input-file-upload' hidden onChange={handleFileInput} />
            <label htmlFor='input-file-upload'>OR Choose Your Own</label>
            <span id='file-chosen' className='file-title'>{filename ? filename : 'No file selected.'}</span>
            <Button onClick={handleSubmit}>Submit</Button>
            {dragActive && <div className='drag-file-element' onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} ></div>}
        </div>
    )
}

export default DragNDrop