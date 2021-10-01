import React, { useState } from 'react'
import { Container, Table, Form, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Layout from '../../components/Layout'
import Modal from '../../components/UI/Modal'
import Input from '../../components/UI/Input'
import { FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import Loader from "react-loader-spinner";
import { addNewTodo, deleteTodo, getAllTodoList, updateTodo } from '../../redux/actions'
import './style.css'

const HomePage = (props) => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.userDetails)
    const { todoList } = useSelector(state => state.todoDetails)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)

    const [newTask, setNewTask] = useState('')
    const [tempTask, setTempTask] = useState({})
    const [updateId, setUpdateId] = useState('')
    const [updateTask, setUpdateTask] = useState('')
    const [updateStatus, setUpdateStatus] = useState(1)

    const handleOpenAddModal = () => setShowAddModal(true)
    const handleCloseAddModal = () => setShowAddModal(false)
    const handleOpenDeleteModal = (item) => { setTempTask(item); setShowDeleteModal(true) }
    const handleCloseDeleteModal = () => setShowDeleteModal(false)
    const handleOpenUpdateModal = (item) => { setUpdateId(item.id); setUpdateTask(item.title); setUpdateStatus(item.is_completed); setShowUpdateModal(true) }
    const handleCloseUpdateModal = () => setShowUpdateModal(false)

    const renderAddTodoModal = () => {
        return (
            <Modal
                show={showAddModal}
                onHide={handleCloseAddModal}
                title={"Add New Todo"}
                onClick={handleSubmitAddTodo}
            >
                <Input
                    type="text"
                    placeholder="enter new task"
                    value={newTask}
                    onChange={e => setNewTask(e.target.value)}
                />
            </Modal>
        )
    }

    const handleSubmitAddTodo = () => {
        dispatch(addNewTodo({ title: newTask }))
            .then(() => {
                setNewTask('')
                dispatch(getAllTodoList())
            })
        handleCloseAddModal()
    }

    const renderDeleteTodoModal = () => {
        return (
            <Modal
                show={showDeleteModal}
                onHide={handleCloseDeleteModal}
                title={"Delete Todo"}
                buttons={[
                    {
                        label: "No",
                        variant: "info",
                        onClick: handleCloseDeleteModal,
                    },
                    {
                        label: "Yes",
                        variant: "danger",
                        onClick: handleSubmitDeleteTodo,
                    },
                ]}
            >
                <h5>Are you sure ?</h5>
            </Modal>
        )
    }

    const handleSubmitDeleteTodo = () => {
        dispatch(deleteTodo(tempTask.id))
            .then(() => {
                setTempTask({})
                dispatch(getAllTodoList())
            })
        handleCloseDeleteModal()
    }

    const renderAddUpdateModal = () => {
        return (
            <Modal
                show={showUpdateModal}
                onHide={handleCloseUpdateModal}
                title={"Add New Todo"}
                onClick={handleSubmitUpdateTodo}
            >
                <Input
                    type="text"
                    placeholder="enter new task"
                    value={updateTask}
                    onChange={e => setUpdateTask(e.target.value)}
                    margin
                />
                <div onChange={(e) => setUpdateStatus(e.target.value)} style={{ border: '1px solid #cecece', padding: '5px 10px', borderRadius: 5, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                    <div><input type="radio" value={1} name="gender" defaultChecked={updateStatus == 1} /> Completed</div>
                    <div><input type="radio" value={0} name="gender" defaultChecked={updateStatus == 0} /> Incomplete</div>
                </div>
            </Modal>
        )
    }

    const handleSubmitUpdateTodo = () => {
        const data = { title: updateTask, isCompleted: updateStatus }
        dispatch(updateTodo(updateId, data))
            .then(() => {
                setUpdateId('')
                setUpdateTask('')
                setUpdateStatus(0)
                dispatch(getAllTodoList())
            })
        handleCloseUpdateModal()
    }

    return (
        <Layout>
            <Container>
                <div className="pageHeading">
                    <h3>Todo List</h3>
                    <div>
                        {user.role == 'admin' && <button className="square-button" onClick={handleOpenAddModal}><FaPlus /></button>}
                    </div>
                </div>
                <Table striped bordered size="md">
                    <thead>
                        <tr>
                            <th className="col1">#</th>
                            <th className="col2">Todo task</th>
                            {user.role == 'admin' && <th className="col3">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todoList.map((item, index) => <tr key={index}>
                                <td className="col1">{index + 1}</td>
                                <td className="col2" style={{ textDecoration: item.is_completed == 0 ? 'none' : 'line-through' }}>{item.title}</td>
                                {user.role == 'admin' && <td className="col3">
                                    <button onClick={() => handleOpenUpdateModal(item)} className="square-button" style={{ background: '#ee9623', fontSize: 13, marginRight: 10 }}>
                                        <FaPen />
                                    </button>
                                    <button onClick={() => handleOpenDeleteModal(item)} className="square-button" style={{ background: '#dc3545', fontSize: 13 }}>
                                        <FaTrashAlt />
                                    </button>
                                </td>}
                            </tr>)
                        }
                    </tbody>
                </Table >
                {!todoList.length > 0 && <div style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
                    <Loader type="ThreeDots" color="#007bff" height={80} width={80} />
                </div>}
            </Container >
            {renderAddTodoModal()}
            {renderDeleteTodoModal()}
            {renderAddUpdateModal()}
        </Layout >
    )
}

export default HomePage