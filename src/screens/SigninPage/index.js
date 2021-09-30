import React, { useState } from 'react'
import { Redirect } from 'react-router'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../components/UI/Input'
import { signin } from '../../redux/actions'

const SigninPage = (props) => {

    const dispatch = useDispatch()
    const { authenticate, message } = useSelector(state => state.userDetails)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = { email, password }
        dispatch(signin(user))
    }

    if (authenticate) {
        return <Redirect to="/" />
    }

    return (
        <Container>
            <Row className="mt-5 px-5">
                <Col md={{ span: 6, offset: 3 }}>
                    {message && <h6 className="text-center mb-3" style={{ color: 'red' }}>{message}</h6>}
                    <div style={{
                        borderRadius: 5,
                        padding: "25px",
                        boxShadow: "0 0 5px 1px #ddd",
                    }}>
                        <h2 style={{
                            borderBottom: "3px solid #007bff",
                            paddingBottom: 3,
                            marginBottom: 20,
                        }}>Sign in</h2>
                        <Form onSubmit={handleSubmit}>
                            <Input
                                type="email"
                                placeholder="abc@xyz.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <Input
                                type="password"
                                placeholder="*********"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit" size="md">Sign in</Button>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default SigninPage