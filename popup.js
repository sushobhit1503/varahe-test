document.addEventListener("DOMContentLoaded", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {action: "getEmails"}, (response) => {
            const emailDisplay = document.getElementById("emailIdList")
            response.emailIds.map (eachEmailId => {
                const li = document.createElement("li")
                li.textContent = eachEmailId
                emailDisplay.appendChild(li)
            })
            if (response.emailIds.length === 0) {
                const noEmailDisplay = document.getElementById("message")
                noEmailDisplay.textContent = "No Emails are present on this page"
                console.log(backgroundPopup.allEmailIds)
            }
        })
    })
    // chrome.runtime.getBackgroundPage((backgroundPopup) => {
    //     const emailDisplay = document.getElementById("emailIdList")
    //     console.log(backgroundPopup.allEmailIds)
    //     backgroundPopup.allEmailIds.map(eachEmail => {
    //         const li = document.createElement("li")
    //         li.textContent = eachEmail
    //         emailDisplay.appendChild(li)
    //     })
    //     if (backgroundPopup.allEmailIds.length === 0) {
    //         const noEmailDisplay = document.getElementById("message")
    //         noEmailDisplay.textContent = "No Emails are present on this page"
    //         console.log(backgroundPopup.allEmailIds)
    //     }
    // })
})