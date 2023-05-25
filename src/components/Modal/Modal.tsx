import React from 'react'
import './modal.scss'
import Button, { ButtonTypes } from '../Button/Button';

interface ModalProps {
    children: JSX.Element;
    modalHeader?: string;
    toggleModal: () => void;
}

const Modal = (props: ModalProps) => {
    return (
        <div className='modal-container'>
            <div className='inner-container'>
                <div className="modal">
                    <div className='modal-header'>
                        <h2>{props.modalHeader}</h2>
                        <Button onClick={props.toggleModal} type={ButtonTypes.noBorder}>X</Button>
                    </div>
                    <div className='modal-content'>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal