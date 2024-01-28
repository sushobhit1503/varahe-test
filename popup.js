let list = document.getElementById("emailList")
let sortButton = document.getElementById("sortEmails")
let filterButton = document.getElementById("filterEmails")
let sortOrder = 1
let sortInfo = document.getElementById("sort-info")
var inputValue = ""

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

sortButton.addEventListener("click", () => {
    let sortedEmail = Array.from(list.getElementsByTagName("li"));

    sortedEmail.sort((a, b) => {
        let emailA = a.innerText.toLowerCase();
        let emailB = b.innerText.toLowerCase();
        return sortOrder * emailA.localeCompare(emailB);
    });

    list.innerHTML = "";

    sortedEmail.map(eachEmail => {
        list.appendChild(eachEmail);
    });
   
    if (sortOrder === 1) {
        sortInfo.innerText = "Email Id is sorted in A to Z order"
    }
    else {
        sortInfo.innerText = "Email Id is sorted in Z to A order"
    }
    sortOrder *= -1;
})

document.getElementById("filterSearch").addEventListener ("input", () => {
    inputValue = document.getElementById("filterSearch").value
})

filterButton.addEventListener("click", () => {
    let filterValue = inputValue.toLowerCase();
    let filteredEmails = Array.from(list.getElementsByTagName("li"));

    filteredEmails.map(eachEmail => {
        let email = eachEmail.innerText.toLowerCase();
        if (email.includes(filterValue)) {
            eachEmail.style.display = "block";
        } else {
            eachEmail.style.display = "none";
        }
    });
})

const scrapeEmailsFromPage = () => {
    const emailRegEx = /[\w\.=-]+@[\w\.-]+\.[\w]{2,3}/gim;
    let emails = document.body.innerHTML.match(emailRegEx)
    chrome.runtime.sendMessage({ emails })
}