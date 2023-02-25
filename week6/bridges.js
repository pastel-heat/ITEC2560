const bridges = [
    {
        "name": "Verrazano-Narrows Bridge",
        "span": 1298.4,
        "span_text": "1298.4m",
        "city": "New York, NY",
        "location": [
            40.6066,
            -74.0447
        ]
    },
    {
        "name": "Golden Gate Bridge",
        "span": 1280.2,
        "span_text": "1280.2m",
        "city": "San Franciso and Marin, CA",
        "location": [
            37.8199, 
            -122.4783
        ]
    },
    {
        "name": "Mackinac Bridge",
        "span": 1158,
        "span_text": "1158m",
        "city": "Mackinaw and St Ignace, MI",
        "location": [
            45.8174, 
            -84.7278
        ]
    },
    {
        "name": "George Washington Bridge",
        "span": 1067,
        "span_text": "1067m",
        "city": "New York, NY and New Jersey, NJ",
        "location": [
            40.8517, 
            -73.9527
        ]
    },
    {
        "name": "Tacoma Narrows Bridge",
        "span": 853.44,
        "span_text": "853.44m",
        "city": "Tacoma and Kitsap, WA",
        "location": [
            47.2690, 
            -122.5517
        ]
    }
]

let bridgeNames = []
let bridgeLengths = []

let mapCenterCoordinates = [39.82, -98.58]
let mapZoom = 4

let map = L.map('bridge-map').setView(mapCenterCoordinates, mapZoom)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const bridgeIcon = L.icon({
    iconUrl: "bridge.png",
    iconSize: [36, 36]
})

const longestBridgeIcon = L.icon({
    iconUrl: "longestbridge.png",
    iconSize: [54, 54]
})

// finds longest bridge length by mapping every span value into an array, then Math.max to find biggest value
const longestBridge = Math.max.apply(Math, bridges.map(function(bridge) {return bridge.span;}))


bridges.forEach(function(bridge){
    // conditionally assign icon based on if bridge.span matches longestBridge value
    const currentIcon = (bridge.span === longestBridge) ? longestBridgeIcon : bridgeIcon;

    L.marker(bridge.location, {icon: currentIcon})
        .bindPopup(bridge.name + "<br>" + bridge.span_text)
        .addTo(map)

    // storing bridge data for later use in bar chart
    bridgeNames.push(bridge.name)
    bridgeLengths.push(bridge.span)
})

// start chart section

const canvas = document.querySelector("#bridge-chart")
const ctx = canvas.getContext("2d")

const chart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: bridgeNames,
        datasets: [{
            label: "Bridge length (in meters)",
            data: bridgeLengths,
            backgroundColor: ["#dfbbb1", "#f56476", "#e43f6f", "#be3e82", "#5e4352"]
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
})