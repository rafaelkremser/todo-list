import './global.css';
import styles from './App.module.css';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import { Header } from './components/Header';

import { PlusCircle } from '@phosphor-icons/react';
import { Task } from './components/Task';
import { Empty } from './components/Empty';

export interface ITask {
  id: number
  title: string
  isCompleted: boolean
}

export function App() {
  const [tasksCompletedCount, setTasksCompletedCount] = useState(0)
  const [tasks, setTasks] = useState<ITask[]>([])
  const [newTaskText, setNewTaskText] = useState('');
  
  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    const newTask: ITask = {
      id: new Date().getTime(),
      title: newTaskText,
      isCompleted: false
    }
    
    setTasks(() => [...tasks, newTask])
    setNewTaskText('')
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTaskText(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!');
  }

  function toggleTask(taskToToggle: ITask) {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskToToggle.id) {
        return { ...task, isCompleted: taskToToggle.isCompleted };
      }
      return task;
    });
  
    setTasks(updatedTasks);
    setTasksCompletedCount((state) => {
      if (taskToToggle.isCompleted === true) {
        return state + 1
      }

      return state - 1
    });
  }

  function deleteTask(taskToDelete: ITask) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task !== taskToDelete;
    })

    setTasks(tasksWithoutDeletedOne);
    setTasksCompletedCount((state) => {
      if (taskToDelete.isCompleted === true) {
        return state - 1
      }

      return state
    });
  }

  return (
    <div>
      <Header />
      
      <div className={styles.tasks}>
        <form
          className={styles.inputBox}
          onSubmit={handleCreateNewTask}
        >
          <input
            type="text"
            placeholder='Adicione uma nova tarefa'
            value={newTaskText}
            onChange={handleNewTaskChange}
            onInvalid={handleNewTaskInvalid}
            required
          />
          <button type="submit">
            Criar
            <PlusCircle weight="bold" />
          </button>
        </form>
        
        <div className={styles.list}>
          <header>
            <div className={styles.createdTasks}>
              <p>Tarefas criadas</p>
              <span>{tasks.length}</span>
            </div>
            <div className={styles.completedTasks}>
              <p>Concluídas</p>
              {tasks.length > 0 ? (
                <span>
                  {tasksCompletedCount} de {tasks.length}
                </span>
              ) : (
                <span>0</span>
              )}
            </div>
          </header>
          
          
          <div className={styles.tasksList}>
            {tasks.length > 0 ? (
              tasks.map(task => {
                return (
                  <Task
                    key={task.id}
                    task={task}
                    onToggleTask={toggleTask}
                    onDeleteTask={deleteTask}
                  />
                )
              })
            ) : (
              <Empty />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
