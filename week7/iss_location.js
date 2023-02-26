const url = 'https://api.wheretheiss.at/v1/satellites/25544'

const issLat = document.querySelector('#iss-lat')
const issLong = document.querySelector('#iss-long')
const lastTimeUpdated = document.querySelector('#time')

const issIcon = L.icon({
    iconUrl: 'iss_icon.png',
    iconSize: [36, 36],
    iconAnchor: [18, 18]
})

let attemptsRemaining = 3
let issMarker

let map = L.map('iss-map').setView([0, 0], 2)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

issUpdate()

function issUpdate(){

    if (attemptsRemaining <= 0){
        alert('Failed to contact ISS servers, please refresh or try again later.')
        return
    }

    fetch(url).then(response => {
        return response.json()
    })
    .then(issData => {
        let lat = issData.latitude
        let long = issData.longitude
        issLat.innerHTML = lat
        issLong.innerHTML = long

        if (!issMarker){
            issMarker = L.marker([lat, long], {icon: issIcon}).addTo(map)
        } else {
            issMarker.setLatLng([lat, long])
        }

        let currentTime = Date()
        lastTimeUpdated.innerHTML = `This data was last updated at ${currentTime}`

    })
    .catch(error => {
        attemptsRemaining = attemptsRemaining - 1
        console.log('error!', error)
    })
    .finally(() => {
        setTimeout(issUpdate, 10000, 3)
    })
}