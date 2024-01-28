const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

const extractEmails = () => {
    const allTextFromDocument = document.body.innerText
    const extractedEmailIds = allTextFromDocument.match(emailRegex)
    return extractedEmailIds || []
}

chrome.runtime.onMessage.addListener ((request) => {
    if (request.action === "getEmails") {
        const requestedEmails = extractEmails ()
        sendResponse ({emailIds: requestedEmails})
    }
})