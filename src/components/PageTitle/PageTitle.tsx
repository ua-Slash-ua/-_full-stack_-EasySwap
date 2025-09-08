import s from './PageTitle.module.css'

function formatDate(isoDate: string | Date): string {
  const date = typeof isoDate === 'string' ? new Date(isoDate) : isoDate

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // місяці 0-based
  const year = String(date.getFullYear()).slice(-2) // останні 2 цифри року

  return `${day}.${month}.${year}`
}

export default function PageTitle({
  title,
  data,
  description,
}: {
  title: string
  data: string
  description: string
}) {
  return (
    <>
      <div className={s.title}>
        <h1>{title}</h1>
        <span className={s.data}>
          Дата набрання чинності
          <span>{formatDate(data)}</span>
        </span>
        <div className={s.description}>
          <p>{description}</p>
        </div>
      </div>
    </>
  )
}
