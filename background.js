let allEmailIds = []

chrome.runtime.onMessage.addListener ((receiveEmails) => {
    if (receiveEmails.emailIds) {
        console.log(allEmailIds)
        allEmailIds = allEmailIds.concat(receiveEmails.emailIds)
    }
})