import { useState } from 'react'

function DragNDrop() {
    const [filename, setFilename] = useState('No file chosen')
    const [dragActive, setDragActive] = useState(false)

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            setFilename(e.target.files[0].name)
        }
    }

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    return (
        <div className={`drag-n-drop-container ${dragActive ? 'drag-active' : ''}`} onDragEnter={handleDrag} onDragLeave={handleDrag}>
            <input type='file' id='input-file-upload' hidden onChange={handleFileInput} />
            <label htmlFor='input-file-upload'>OR Choose Your Own</label>
            <span id='file-chosen' className='file-title'>{filename}</span>
        </div>
    )
}

export default DragNDrop