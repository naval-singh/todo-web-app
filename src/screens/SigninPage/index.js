import React, { useState } from 'react'
import { Redirect } from 'react-router'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../components/UI/Input'
import { signin } from '../../redux/actions'
import Layout from '../../components/Layout'
import Loader from "react-loader-spinner";

const SigninPage = (props) => {

    const dispatch = useDispatch()
    const { authenticate, message } = useSelector(state => state.userDetails)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        const user = { email, password }
        dispatch(signin(user)).then(() => setLoading(false))
    }

    if (authenticate) {
        return <Redirect to="/" />
    }

    return (
        <Layout>
            <Container>
                <Row className="mt-5 px-5">
                    <Col md={{ span: 6, offset: 3 }}>
                        <h6 className="text-center mb-3" style={{ color: 'red' }}>{message ? message : ' '}</h6>
                        <div style={{
                            borderRadius: 5,
                            padding: "25px",
                            boxShadow: "0 0 5px 1px #ddd",
                            marginBottom: 25
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
                                    margin
                                />
                                <Input
                                    type="password"
                                    placeholder="*********"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    margin
                                />
                                <div className="d-grid gap-2">
                                    <Button variant="primary" type="submit" size="md">Sign in</Button>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
                {loading && <div style={{ display: 'flex', marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Loader type="ThreeDots" color="#007bff" height={80} width={80} />
                </div>}
            </Container>
        </Layout>
    )
}

export default SigninPage