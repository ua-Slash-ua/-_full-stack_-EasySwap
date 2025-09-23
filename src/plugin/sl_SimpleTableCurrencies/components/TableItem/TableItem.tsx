import s from './TableItem.module.css'

type TableItemProps = {
  tableItem: {
    name: string,
    id: string,
  } | any,
  editable: boolean
  hidden?: boolean
  dataType?: string
}

export default function TableItem({ tableItem, editable, hidden = undefined, dataType }: TableItemProps) {
  return (
    <>
      <div className={`${s.table_item} ${hidden? s.hidden:''}`}>
        <input
          className={s.table_input}
          data-id={tableItem.id}
          data-type={dataType}
          type="text"
          readOnly={hidden == undefined?  !editable : true}
          disabled={hidden == undefined?  !editable : true}
          defaultValue={(!hidden? tableItem.name ?? tableItem :'').toString()}
        />
      </div>
    </>
  )
}