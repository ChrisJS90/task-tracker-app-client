import { useState, useEffect } from 'react'
import client from '../../utils/client'
import Modal from 'react-modal'
import moment from 'moment'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import './Dashboard.css'

const Dashboard = () => {
    const url = "http://localhost:4000/tasks"
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setTasks(data.data)
                console.log(tasks)
            })
    }, [])

    const formatDate = (dateString) => {
        return moment(dateString).format('DD/MM/YYYY HH:mm')
    }

    const sortOptions = [
        "Last Updated",
        "Start Date",
        "Status",
        "Location",
        "Type/Contractor"
    ]

    const defaultSort = sortOptions[0]

    // Adding a new task
    const [taskModalIsOpen, setTaskIsOpen] = useState(false);
    const [newTask, setNewTask] = useState();

    function openTaskModal() {
        setTaskIsOpen(true)
    }

    function closeTaskModal() {
        setNewTask()
        setTaskIsOpen(false)
    }

    function handleTaskChange(e) {
        const inputName = e.target.name
        const inputValue = e.target.value

        if (inputName === 'name') {
            setNewTask({ ...newTask, name: inputValue })
        } else if (inputName === 'type') {
            setNewTask({ ...newTask, type: inputValue })
        } else if (inputName === 'location') {
            setNewTask({ ...newTask, location: inputValue })
        } else if (inputName === 'status') {
            setNewTask({ ...newTask, status: inputValue })
        }
    }

    const handleAddTask = async event => {
        event.preventDefault()
        console.log('Button clicked')
        const opts = {
            method: "POST",
            body: JSON.stringify(newTask),
            headers: { "Content-Type": "application/json" }
        }
        const data = await client.post('/tasks', opts)
        setTasks([...tasks, newTask])
        setNewTask()
        closeTaskModal()
    }

    // Editing a task
    const [taskEdit, setTaskEdit] = useState()
    const [editModalIsOpen, setEditModalOpen] = useState(false)

    function openEditModal(task) {
        setTaskEdit(task)
        console.log('received task', task)
        console.log('taskEdit state', taskEdit)
        setEditModalOpen(true)
    }

    function closeEditModal() {
        // setTaskEdit({
        //     name: "",
        //     type: "",
        //     location: "",
        //     status: "",
        // })
        setEditModalOpen(false)
    }

    function handleEditChange(e) {
        const inputName = e.target.name
        const inputValue = e.target.value

        if (inputName === 'name') {
            setTaskEdit({ ...taskEdit, name: inputValue })
        } else if (inputName === 'type') {
            setTaskEdit({ ...taskEdit, type: inputValue })
        } else if (inputName === 'location') {
            setTaskEdit({ ...taskEdit, location: inputValue })
        } else if (inputName === 'status') {
            setTaskEdit({ ...taskEdit, status: inputValue })
        }
    }

    function handleEditTask(e) {
        e.preventDefault()
        console.log(taskEdit)
    }


    return (
        <div className='container'>
            <div id='sidebar'>
                <p>Welcome username</p>

                <button>Save</button>

                <form>
                    <select id='sortBy' name='Sort By'>
                        <option value="lastUpdated">Last Updated</option>
                        <option value="startDate">Start Date</option>
                        <option value="status">Status</option>
                        <option value="location">Location</option>
                        <option value="type">Type/Contractor</option>
                    </select>
                </form>
                <button onClick={openTaskModal}>Create New Task</button>
                <Modal isOpen={taskModalIsOpen} className="Modal" id='taskModal' overlayClassName="overlay">
                    <form name='taskForm' id='new-task-form' onSubmit={handleAddTask}>
                        <input type='text' name='name' placeholder='Task Name' onChange={handleTaskChange} />
                        <input type='text' name='type' placeholder='Type/Contractor' onChange={handleTaskChange} />
                        <input type='text' name='location' placeholder='Location' onChange={handleTaskChange} />
                        <input type='text' name='status' placeholder='Status' onChange={handleTaskChange} />
                        <input type='submit' value="Submit" />
                    </form>
                    <button onClick={closeTaskModal}>Cancel</button>
                </Modal>
            </div>

            <div id='main-bar'>
                <div id='task-table'>
                    <div className='table-row'>
                        <p className='table-header'>Name</p>
                        <p className='table-header'>Type/Contractor</p>
                        <p className='table-header'>Location</p>
                        <p className='table-header'>Status</p>
                        <p className='table-header'>Start Date</p>
                        <p className='table-header'>Last Updated</p>
                        <p className='table-header'></p>
                    </div>
                    {tasks.map((task) => {
                        console.log('is edit modal open?', editModalIsOpen)
                        const createdDate = formatDate(task.createdAt)
                        const updatedDate = formatDate(task.updatedAt)

                        return (
                            <div className='table-row'>
                                <p className='table-item'>{`${task.name}`}</p>
                                <p className='table-item'>{`${task.type}`}</p>
                                <p className='table-item'>{`${task.location}`}</p>
                                <p className='table-item'>{`${task.status}`}</p>
                                <p className='table-item'>{`${createdDate}`}</p>
                                <p className='table-item'>{`${updatedDate}`}</p>
                                <p className='table-item' id='button-items'>
                                    <button id='edit-button' onClick={() => openEditModal(task)}>Edit</button>
                                    <Modal isOpen={editModalIsOpen} className="Modal" id='taskModal' overlayClassName='overlay'>
                                        <form name='editTask' onSubmit={handleEditTask}>
                                            <input type='text' name='name' defaultValue={task.name} onChange={handleEditChange} />
                                            <input type='text' name='type' defaultValue={task.type} onChange={handleEditChange} />
                                            <input type='text' name='location' defaultValue={task.location} onChange={handleEditChange} />
                                            <input type='text' name='status' defaultValue={task.status} onChange={handleEditChange} />
                                            <input type='submit' value="Submit" />
                                        </form>
                                        <button onClick={closeEditModal}>Cancel</button>
                                    </Modal>
                                    <button id='delete-button'>Delete</button>
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default Dashboard