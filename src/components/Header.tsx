import styles from './Header.module.css'
import toDoLogo from '../assets/Logo.svg'

export function Header() {
  return (
    <div className={styles.header}>
      <header>
        <img src={toDoLogo} alt="ToDo Logo" />
      </header>
    </div>
  )
}