
export function checkClick(e: React.MouseEvent<HTMLInputElement>) {
  const idList = ['preview_container', 'fulltext_container']
  e.preventDefault()
  let element = e.currentTarget
  let type: string = element.getAttribute('data-id-container')!
  idList.forEach((id) => {
    const el = document.getElementById(id) as HTMLElement | null;
    if (!el) return;
    console.log(element.classList)
    if (id === type) {
      el.style.display = 'flex';
    } else {
      el.style.display = 'none';
    }
  });

}