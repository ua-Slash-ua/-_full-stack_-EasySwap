
export function checkClick(e: React.MouseEvent<HTMLInputElement>) {
  const idList = ['preview_container', 'fulltext_container']
  e.preventDefault()
  const element = e.currentTarget
  const type: string = element.getAttribute('data-id-container')!
  idList.forEach((id) => {
    const el = document.getElementById(id) as HTMLElement | null;
    if (!el) return;
    if (id === type) {
      el.style.display = 'flex';
    } else {
      el.style.display = 'none';
    }
  });

}