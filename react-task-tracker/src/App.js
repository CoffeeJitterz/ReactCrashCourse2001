import { useState, useEffect } from 'react'
import Header from './compontents/Header'
import Tasks from './compontents/Tasks'
import AddTask from './compontents/AddTask'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [ tasks, setTasks] = useState([])
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = {  id, ...task }
    setTasks([...tasks, newTask])
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

  //Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //toggle reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
  }

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? (
      <Tasks tasks={tasks} onDelete={deleteTask}
      onToggle={toggleReminder}/>) : (
        'No Tasks To Show')} 
    </div>
  );
}

export default App;
