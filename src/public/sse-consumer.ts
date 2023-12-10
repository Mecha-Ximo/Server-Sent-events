const eventSource = new EventSource('/sse');

eventSource.addEventListener('message', (e) => {
  const sseDataElement = document.getElementById('sseData');
  console.log(e);
  if (!sseDataElement) {
    throw new Error('Root sse data element should exist');
  }

  const user = JSON.parse(e.data);

  sseDataElement.innerHTML += `<p>User login: ${user.name} - id: ${user.id}</p>`;
});

eventSource.onerror = (error) => {
  console.error('EventSource failed:', error);
};

setTimeout(() => {
  eventSource.close();
}, 5000);
