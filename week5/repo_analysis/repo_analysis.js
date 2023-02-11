
let analyzeButton = document.querySelector('#analyze')
let usernameInput = document.querySelector('#github-username')

let statusMessage = document.querySelector('#status-message')

let repoList = document.querySelector('#repository-list')
let repoStats = document.querySelector('#repository-statistics')


analyzeButton.addEventListener('click', function() {
    let username = usernameInput.value
    let url = `https://api.github.com/users/${username}/repos`
    
    statusMessage.innerHTML = 'Please wait...'
    
    fetch(url)   // make request to URL
        .then(response => response.json())  // extract the JSON from the response 
        .then(githubJson => {   
            displayRepositoriesOnPage(githubJson)
            })
        .catch(error => {    // handle errors that occur when requesting data or processing the response
            console.log(error)
            alert('Error fetching data from GitHub. Verify you are connected to the internet and the username is correct.')
        })
        .finally( () => {
            statusMessage.innerHTML = ''  // clear status message. Code in the finally handler always runs, regardless if the request works or failed. 
        })
})

function displayRepositoriesOnPage(githubJson) {
    clearRepositories()
    let languagesObj = {} // initialize empty obj for languages. will be used to total amount of each lang
    githubJson.forEach(function(repo) {
        let repoName = repo.name
        let repoLink = repo.html_url
        let repoLanguage = repo.language

        
        if (languagesObj[repoLanguage] == undefined){ // if language is not yet in obj, initalize at 1
            languagesObj[repoLanguage] = 1
        }else{
            languagesObj[repoLanguage] += 1 // if lang is already in obj, increment counter
        }

        // create elements for repo name, language, and url link, and append them to a div which is then appended to the repoList div
        let repoNameElement = document.createElement("h2")
        repoNameElement.innerHTML = repoName

        let repoLanguageElement = document.createElement("p")
        repoLanguageElement.innerHTML = `Written in ${repoLanguage}`

        let repoAnchorElement = document.createElement("a")
        repoAnchorElement.href = repoLink
        repoAnchorElement.innerHTML = "View on GitHub"

        let repoListItem = document.createElement("div")
        repoListItem.classList.add("repo-list-item")

        repoListItem.appendChild(repoNameElement)
        repoListItem.appendChild(repoLanguageElement)
        repoListItem.appendChild(repoAnchorElement)

        repoList.appendChild(repoListItem)
    });
    
    // initalize the list element for language stats
    let repoStatsList = document.createElement("ul")
    repoStatsList.classList.add("repo-stats-list")

    // iterate through lanuagesObj, and create a li element using the KVPs from languagesobj
    for (language in languagesObj){
        let repoStatsItem = document.createElement("li")
        repoStatsItem.innerHTML = `${language} is used ${languagesObj[language]} time(s).`
        repoStatsList.appendChild(repoStatsItem)
    }
    repoStats.appendChild(repoStatsList) //append the ul to the repoStats div

    // if user has no repos, display an error msg
    if (document.getElementsByClassName('repo-list-item').length == 0) {
        console.log("no repos")
        let noRepoMessage = document.createElement('p')
        noRepoMessage.innerHTML = "Sorry, this user has no public GitHub repositories."
        noRepoMessage.classList.add("repo-list-error")
        repoList.appendChild(noRepoMessage)
    }
}

// clear results upon searching for a new user. select all created elements from previous function and remove them
function clearRepositories(){
    let repoListItems = document.querySelectorAll(".repo-list-item")
    let repoListErrors = document.querySelectorAll(".repo-list-error")
    let repoStatsList = document.querySelectorAll(".repo-stats-list")

    repoListItems.forEach(function(listItem){
        listItem.remove()
    })

    repoListErrors.forEach(function(listError){
        listError.remove()
    })    

    repoStatsList.forEach(function(list){
        list.remove()
    })
}


