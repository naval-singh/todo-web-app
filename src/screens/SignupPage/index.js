import React, { useState } from "react";
import { Redirect } from 'react-router'
import { Container, Row, Col, Form, Button, FloatingLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import Input from '../../components/UI/Input'
import { signup } from "../../redux/actions/";
import Layout from "../../components/Layout";
import Loader from "react-loader-spinner";

const SignupPage = (props) => {

    const dispatch = useDispatch()
    const { authenticate, message } = useSelector(state => state.userDetails)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [accountType, setAccountType] = useState('user')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isInvalid, setIsInvalid] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            setLoading(false)
            return alert('All fields required...')
        }
        if (password !== confirmPassword) {
            setLoading(false)
            return alert('Password mismatch...')
        }
        const user = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            role: accountType
        }
        dispatch(signup(user))
            .then(() => {
                setFirstName('')
                setLastName('')
                setEmail('')
                setPassword('')
                setConfirmPassword('')
                setLoading(false)
            })
    }

    if (authenticate) {
        return <Redirect to="/" />
    }

    return (
        <Layout>
            <Container>
                <Row className="mt-5 px-5">
                    <Col md={{ span: 6, offset: 3 }}>
                        <h6 className="text-center mb-3" style={{ color: 'orange' }}>{message ? message : ' '}</h6>
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
                            }}>Sign up</h2>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col lg>
                                        <Input
                                            type="text"
                                            placeholder="first name"
                                            value={firstName}
                                            onChange={e => setFirstName(e.target.value)}
                                            margin
                                        />
                                    </Col>
                                    <Col lg>
                                        <Input
                                            type="text"
                                            placeholder="last name"
                                            value={lastName}
                                            onChange={e => setLastName(e.target.value)}
                                            margin
                                        />
                                    </Col>
                                </Row>
                                <Input
                                    type="email"
                                    placeholder="email id"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    margin
                                />
                                <Input
                                    type="password"
                                    placeholder="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    margin
                                />
                                <Input
                                    type="password"
                                    placeholder="confirm password"
                                    message="password mismatch"
                                    messageType="invalid"
                                    isInvalid={isInvalid}
                                    value={confirmPassword}
                                    margin
                                    onChange={e => {
                                        setConfirmPassword(e.target.value)
                                        e.target.value === password ? setIsInvalid(false) : setIsInvalid(true)
                                    }}
                                />
                                <FloatingLabel size="sm" label="Choose account type">
                                    <Form.Select
                                        className="mb-3"
                                        value={accountType}
                                        onChange={e => setAccountType(e.target.value)}
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </Form.Select>
                                </FloatingLabel>
                                <div className="d-grid gap-2">
                                    <Button variant="primary" type="submit" size="md">Sign up</Button>
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

export default SignupPage