import s from './TelegramInput.module.css'

type telegramProps = {
  name: string,
  label?:string,
  className?:string,
  placeHolder?:string,
}

export default function TelegramInput({name, className, placeHolder, label}:telegramProps) {
  return (
    <>
      <div className={`${s.telegram_container} ${className}`}>
        <label htmlFor={name}>{label??'Telegram'}</label>
        <input type="text"  name={name} id={name} placeholder={placeHolder??'@nickname'}/>
      </div>
    </>
  )
}