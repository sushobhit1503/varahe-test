let scrapeEmails = document.getElementById("scrapeEmails")
let list = document.getElementById("emailList")

chrome.runtime.onMessage.addListener((request, sender, senderResponse) => {
    let emails = request.emails
    if (emails === null || emails.length === 0) {
        let li = document.createElement("li")
        li.innerText = "No Emails Found"
        list.appendChild(li)
    }
    else {
        emails.forEach(eachEmail => {
            let li = document.createElement("li")
            li.innerText = eachEmail
            list.appendChild(li)
        })
    }
})

document.addEventListener("DOMContentLoaded", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: scrapeEmailsFromPage
    })
})

const scrapeEmailsFromPage = () => {
    const emailRegEx = /[\w\.=-]+@[\w\.-]+\.[\w]{2,3}/gim;

    let emails = document.body.innerHTML.match(emailRegEx)

    chrome.runtime.sendMessage({ emails })
}