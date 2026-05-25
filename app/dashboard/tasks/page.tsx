"use client"

import { useEffect, useState } from "react"
import axios from "axios"

export default function Home() {

  const [tasks, setTasks] = useState([])

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [assignedTo, setAssignedTo] = useState("")
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:5000/tasks"
      )

      setTasks(response.data.data)

    } catch (error) {
      console.log(error)
    }
  }

const addTask = async () => {

  try {

    const response = await axios.post(
      "http://127.0.0.1:5000/add-task",
      {
        title,
        description,
        assigned_to: assignedTo
      }
    )

    setTasks((prev: any) => [
      ...prev,
      response.data.data[0]
    ])

    setTitle("")
    setDescription("")

  } catch (error) {
    console.log(error)
  }
}
 const deleteTask = async (id: number) => {

  try {

    await axios.delete(
      `http://127.0.0.1:5000/delete-task/${id}`
    )

    setTasks((prev: any) =>
      prev.filter((task: any) => task.id !== id)
    )

  } catch (error) {
    console.log(error)
  }
}
const completeTask = async (id: number) => {

  try {

    await axios.put(
      `http://127.0.0.1:5000/complete-task/${id}`
    )

    setTasks((prev: any) =>
      prev.map((task: any) =>
        task.id === id
          ? { ...task, completed: true }
          : task
      )
    )

  } catch (error) {
    console.log(error)
  }
}

const editTask = async (id: number) => {

  try {

    await axios.put(
      `http://127.0.0.1:5000/edit-task/${id}`,
      {
        title,
        description
      }
    )

    setTasks((prev: any) =>
      prev.map((task: any) =>
        task.id === id
          ? {
              ...task,
              title,
              description
            }
          : task
      )
    )

    setTitle("")
    setDescription("")
    setEditingId(null)

  } catch (error) {
    console.log(error)
  }
}


  return (
  <div className="p-10">

    <h1 className="text-3xl font-bold mb-5">
      TaskHub
    </h1>

    <div className="mb-5 flex gap-2">

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-700 bg-gray-900 text-white placeholder-gray-400 p-3 rounded outline-none"
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-700 bg-gray-900 text-white placeholder-gray-400 p-3 rounded outline-none"
      />
      <input
        type="email"
        placeholder="Assign to user email"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        className="border border-white/10 bg-black/40 text-white p-3 rounded-xl"
        />
      <button
        type="button"
        onClick={() => {
          if (editingId) {
            editTask(editingId)
          } else {
            addTask()
          }
        }}
        className="bg-white text-black px-4 py-2 rounded cursor-pointer"
      >
       {editingId ? "Update Task" : "Add Task"}
      </button>

    </div>

    <div>

      {tasks.map((task: any) => (

        <div
          key={task.id}
          className="border p-4 rounded mb-3"
        >

          <h2 className="text-xl font-semibold">
            {task.title}
          </h2>

          <p>
            {task.description}
          </p>
          <p className="mt-2">
            Status: {task.completed ? "Completed" : "Pending"}
          </p>
          <button
            type="button"
            onClick={() => deleteTask(task.id)}
            className="bg-red-500 text-white px-3 py-1 mt-2 rounded cursor-pointer"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={() => completeTask(task.id)}
            className="bg-green-500 text-white px-3 py-1 mt-2 ml-2 rounded"
          >
            Complete
          </button>
          <button
            type="button"
            onClick={() => {
              setEditingId(task.id)
              setTitle(task.title)
              setDescription(task.description)
            }}
            className="bg-blue-500 text-white px-3 py-1 mt-2 ml-2 rounded"
          >
            Edit
          </button>
        </div>

      ))}

    </div>

  </div>
)}