import s from './ContactsSection.module.css'

export default function ContactsSection({ block, locale }: { block: any; locale: string }) {
  return (
    <>
      <section className={s.contacts_section} id="contacts">
        <aside className={s.main}>
          <div className={s.content}>
            <h3>
              Контакти і локації
            </h3>
            <ul>

            </ul>
          </div>
          <div className={s.social_network}></div>
        </aside>
        <div className={s.map}></div>
      </section>
    </>
  )
}
