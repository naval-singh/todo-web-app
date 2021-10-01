import React from 'react'
import { Form } from 'react-bootstrap'

const Input = ({ label, type, margin, placeholder, isInvalid, message, messageType, value, onChange }) => {
    return (
        <Form.Group className={margin ? "mb-3" : ""}>
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Control type={type} isInvalid={isInvalid} placeholder={placeholder} onChange={onChange} value={value} />
            {message && <Form.Control.Feedback type={messageType}>
                {message}
            </Form.Control.Feedback>}
        </Form.Group>
    )
}

export default Input