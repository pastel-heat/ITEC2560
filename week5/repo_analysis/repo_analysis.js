
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
    githubJson.forEach(function(repo) {
        let repoName = repo.name
        let repoLink = repo.html_url
        let repoLanguage = repo.language

        let repoAnchorElement = document.createElement("a")
        repoAnchorElement.href = repoLink
        repoAnchorElement.innerHTML = "View on GitHub"

        let repoNameElement = document.createElement("h2")
        repoNameElement.innerHTML = repoName

        let repoLanguageElement = document.createElement("p")
        repoLanguageElement.innerHTML = `Written primarily in ${repoLanguage}`

        let repoListItem = document.createElement("div")
        repoListItem.classList.add("repo-list-item")

        repoListItem.appendChild(repoNameElement)
        repoListItem.appendChild(repoLanguageElement)
        repoListItem.appendChild(repoAnchorElement)

        repoList.appendChild(repoListItem)
    });
    
    if (document.getElementsByClassName('repo-list-item').length == 0) {
        console.log("no repos")
        let noRepoMessage = document.createElement('p')
        noRepoMessage.innerHTML = "Sorry, this user has no public GitHub repositories."
        noRepoMessage.classList.add("repo-list-error")
        repoList.appendChild(noRepoMessage)
    }
}

function clearRepositories(){
    let repoListItems = document.querySelectorAll(".repo-list-item")
    let repoListErrors = document.querySelectorAll(".repo-list-error")

    repoListItems.forEach(function(listItem){
        listItem.remove()
    })

    repoListErrors.forEach(function(listError){
        listError.remove()
    })    
}
    // What if the user doesn't have any repositories? Display an appropriate message - you can decide how you'll display this.

    // TODO analyze the response and count the number of repositories in each programming language.
    // TODO create elements on page to display the languages used and each languages' frequency
    


