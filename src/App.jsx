import { useState, useEffect } from 'react'
import './App.css'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

const API_URL = 'https://backend-todolist-l3qk.onrender.com/api'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Cargar tareas al montar el componente
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL}/tasks`)
      if (!response.ok) throw new Error('Error al obtener tareas')
      const data = await response.json()
      setTasks(data)
    } catch (err) {
      setError(err.message)
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTask = async (title, description) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      })
      if (!response.ok) throw new Error('Error al crear tarea')
      const newTask = await response.json()
      setTasks([newTask, ...tasks])
    } catch (err) {
      setError(err.message)
      console.error('Error:', err)
    }
  }

  const handleToggleTask = async (taskId, currentCompleted) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !currentCompleted }),
      })
      if (!response.ok) throw new Error('Error al actualizar tarea')
      const updatedTask = await response.json()
      setTasks(tasks.map(task => task.id === taskId ? updatedTask : task))
    } catch (err) {
      setError(err.message)
      console.error('Error:', err)
    }
  }

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Error al eliminar tarea')
      setTasks(tasks.filter(task => task.id !== taskId))
    } catch (err) {
      setError(err.message)
      console.error('Error:', err)
    }
  }

  const handleEditTask = async (taskId, title, description) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      })
      if (!response.ok) throw new Error('Error al actualizar tarea')
      const updatedTask = await response.json()
      setTasks(tasks.map(task => task.id === taskId ? updatedTask : task))
    } catch (err) {
      setError(err.message)
      console.error('Error:', err)
    }
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Mi Lista de Tareas</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <TaskForm onAddTask={handleAddTask} />
        
        {loading ? (
          <p className="loading">Cargando tareas...</p>
        ) : (
          <TaskList 
            tasks={tasks}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />
        )}
        
        {tasks.length > 0 && (
          <div className="stats">
            <p>
              {tasks.filter(t => t.completed).length} de {tasks.length} tareas completadas
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
