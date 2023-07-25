window.addEventListener('load', async () => {
  console.info('load - ', navigator)
  if (navigator.serviceWorker) {
    try{
      const result = await navigator.serviceWorker.register('sw.js')
      console.log('Service worker registration success', result)
    } catch (err) {
      console.error('Service worker registration failed', error.message)
    }

  }
  await loadPosts()})
  
  
async function loadPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=11')
  const data = await res.json()

  const container = document.querySelector('#posts')
  container.innerHTML = data.map(toCard).join('\n')
}
  
function toCard(post) {
  return `
    <div class="card">
    <div class="card-title">
        ${post.title}
    </div>
    <div class="card-body">
        ${post.body}
    </div>
    </div>
  `
}