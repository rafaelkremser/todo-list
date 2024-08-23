import { ITask } from '../App';
import styles from './Task.module.css'

import { CheckCircle, Circle, Trash } from "@phosphor-icons/react";

interface TaskProps {
  task: ITask
  onToggleTask: (task: ITask) => void
  onDeleteTask: (task: ITask) => void
}

export function Task({ task, onToggleTask, onDeleteTask }: TaskProps) {
  function handleToggleTask() {
    const updatedTask: ITask = {
      ...task,
      isCompleted: !task.isCompleted
    }

    onToggleTask(updatedTask);
  }

  function handleDeleteTask() {
    onDeleteTask(task);
  }
  
  return (
    <div className={styles.task}>
      {task.isCompleted ? (
        <>
          <button
            className={styles.check}
            onClick={handleToggleTask}
          >
            <CheckCircle size={22} weight='fill' />
          </button>
          <p className={styles.pCheck}>{task.title}</p>
        </>
      ) : (
        <>
          <button
            className={styles.uncheck}
            onClick={handleToggleTask}
          >
            <Circle size={22} />
          </button>
          <p>{task.title}</p>
        </>
      )}
      <button
        className={styles.trash}
        onClick={handleDeleteTask}
      >
        <Trash size={22} />
      </button>
    </div>
  )
}