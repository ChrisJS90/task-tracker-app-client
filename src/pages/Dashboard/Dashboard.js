import { useState, useEffect } from 'react'
import moment from 'moment'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import './Dashboard.css'

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:4000/tasks`)
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
                <button>Create New Task</button>
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
                                    <button id='edit-button'>Edit</button>
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