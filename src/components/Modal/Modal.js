import React from "react"
import { Modal, Button } from "react-bootstrap"

export const ModalComponent = (props, {title, description, onClose, onConfirm, confirmText}) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            {description &&
                <Modal.Body>
                    {description}
                </Modal.Body>
            }
            <Modal.Footer>
                <Button onClick={onClose}>Close</Button>
                <Button onClick={onConfirm}>{confirmText}</Button>
            </Modal.Footer>
        </Modal>
    );
}