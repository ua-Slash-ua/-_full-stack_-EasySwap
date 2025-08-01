export type ServiceItemProps = {
  service_icon: string
  service_title: string
  how_does_it_work: {
    how_does_it_work_description: string
    id: string
  }[]
  features: {
    features_description: string
    id: string
  }[]
  id: string
}
