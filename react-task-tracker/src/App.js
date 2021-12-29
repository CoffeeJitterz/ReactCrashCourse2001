import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './compontents/Header'
import Tasks from './compontents/Tasks'
import AddTask from './compontents/AddTask'
import Footer from './compontents/Footer'
import About from './compontents/About'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [ tasks, setTasks] = useState([])

  // Add Task
  const addTask = async(task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    
    const data = await res.json()

    setTasks([...tasks, data])
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = {  id, ...task }
    // setTasks([...tasks, newTask])
  }

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  //Fetch Tasks
  const fetchTask = async () => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  //Delete Task
  const deleteTask = async (id) => {
    await fetchTasks(`http://localhost:5000/tasks/${id}`)
    setTasks(tasks.filter((task) => task.id !== id), {
      method: 'DELETE'
    })
  }

  //toggle reminder
  const toggleReminder = (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/task/${id}`, {
      method: 'put',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
  }

  return (
    <Router>
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>     
        <Route path='/' exact render={() => (
          <>
          {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? (
      <Tasks tasks={tasks} onDelete={deleteTask}
      onToggle={toggleReminder}/>) : (
        'No Tasks To Show')} 
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
    </div>
    </Router>
  );
}

export default App;
