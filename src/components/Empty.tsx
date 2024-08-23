import styles from './Empty.module.css'

import clipboardIcon from '../assets/Clipboard.svg'

export function Empty() {
  return (
      <div className={styles.empty}>
        <img src={clipboardIcon}/>
        <p>Você ainda não tem tarefas cadastradas</p>
        <span>Crie tarefas e organize seus itens a fazer</span>
      </div>
  )
}