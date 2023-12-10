var eventSource = new EventSource('/sse');
eventSource.addEventListener('message', function (e) {
    var sseDataElement = document.getElementById('sseData');
    console.log(e);
    if (!sseDataElement) {
        throw new Error('Root sse data element should exist');
    }
    var user = JSON.parse(e.data);
    sseDataElement.innerHTML += "<p>User login: ".concat(user.name, " - id: ").concat(user.id, "</p>");
});
eventSource.onerror = function (error) {
    console.error('EventSource failed:', error);
};
setTimeout(function () {
    eventSource.close();
}, 5000);
