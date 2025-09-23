export function collectNames(tableContainerId: string) {
  const tableContainer = document.getElementById(tableContainerId)

  const nameContainers = tableContainer?.querySelectorAll('[data-type="curr-name"]')

  const data: { id: string; data: { name: string } }[]= []

  if (!nameContainers) return []

  nameContainers.forEach((nameContainer: any) => {
    data.push({
      id: nameContainer.getAttribute('data-id'),
      data: {
        name: nameContainer.value,
      },
    })
  })

  return data
}