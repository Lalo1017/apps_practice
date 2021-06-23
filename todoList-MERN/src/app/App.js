import React, {useState, useEffect, useRef} from 'react';

const App = () => {

    const [form, updateForm] = useState({title:'', description:''});
    const clearForm = () => updateForm({title:'', description:''});
    const [taskList, updateTaskList] = useState([]);
    const idRef = useRef(null);

    const formSubmit = async (e) => {
        e.preventDefault();
        if(idRef.current === null){
            try {
                await addTask();
                const res = await fetchTasks();
                const data = await res.json();
                updateTaskList(data);
                clearForm();
                M.toast({html:'Task saved'});
            } catch(e){
                console.log(e);
            }
        } else {
            if(confirm('Do you want to edit this task?')){
                try {
                    await updateTask(idRef.current);
                    const res = await fetchTasks();
                    const data = await res.json();
                    updateTaskList(data);
                    M.toast({html:'Task edited'});
                } catch (e) {
                    console.log(e);
                }
            }
            clearForm();
            idRef.current = null;
        }
    }

    const clickDeleteTask = async (id) => {
        await deleteTask(id);
        const res = await fetchTasks();
        const data = await res.json();
        updateTaskList(data);
        M.toast({html:'Task deleted'});
    }

    const addTask = () => {
        return fetch('/api/tasks/', {
            method: 'post',
            body: JSON.stringify(form),
            headers:{
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            }
        });
    }

    const updateTask = (id) => {
        return fetch(`/api/tasks/${id}`, {
            method: 'put',
            body: JSON.stringify(form),
            headers:{
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            }
        });
    }

    const deleteTask = (id) => {
        return fetch(`/api/tasks/${id}`, {
            method: 'delete'
        });
    }

    const fetchTasks = () => {
        return fetch('api/tasks/', {
            method : 'get'
        });
    }

    const handleChangeForm = (e) => {
        updateForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const editTask = (id, title, description) => {
        idRef.current = id;
        updateForm({
            'title' : title,
            'description' : description
        })
    }

    useEffect( async () => {
        const res = await fetchTasks();
        const data = await res.json();
        updateTaskList(data);
    }, []);

    return(
        <div>
            <nav className='light-blue darken-4'>
                <div className='container'>
                    <a className='brand-logo' href='/'>TODO List</a>
                </div>
            </nav>

            <div className='container'>
                <div className='row'>
                    <div className='col s5'>
                        <div className='card'>
                            <div className='card-content'>
                                <form onSubmit={formSubmit}>
                                    <div className='row'>
                                        <div className='input-field col s12'>
                                            <input name='title' type='text' onChange={handleChangeForm} placeholder='Task name' value={form.title} required/>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='input-field col s12'>
                                            <textarea name='description' onChange={handleChangeForm} className='materialize-textarea' placeholder='Task description' value={form.description} required></textarea>
                                        </div>
                                    </div>
                                    <button className='btn light-blue darken-4' type='submit'>Send</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='col s7'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    taskList.map(task => {
                                        return(
                                            <tr key={task._id}>
                                                <td>{task.title}</td>
                                                <td>{task.description}</td>
                                                <td>
                                                    <button className='btn' style={{'marginRight':'10px'}} onClick={() => editTask(task._id, task.title, task.description)}>Edit</button>
                                                    <button className='btn red lighten-2' onClick={() => clickDeleteTask(task._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default App;