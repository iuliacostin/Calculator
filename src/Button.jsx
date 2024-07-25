import modules from './styles/button.module.css'

export const Button = ({ text, double, clicked }) => {
  return !double ? (
    <button className={modules.btn} onClick={clicked}>{text}</button>
  ) : (
    <button className={`${modules.btn} ${modules.btn_double}`} onClick={clicked}>{text}</button>
  )
}
