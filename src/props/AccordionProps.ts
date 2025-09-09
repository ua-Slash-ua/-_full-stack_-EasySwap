export type AccItem = {
  title: string
  content: any  // або конкретний тип, якщо знаєш структуру
  id: string
}

export type AccordionProps = {
  blockType: 'accordion-block'
  enabled: boolean
  data: string
  items: AccItem[]
  id: string
}
