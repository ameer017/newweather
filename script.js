// http://api.weatherapi.com/v1/current.json?key=599d9cf4d41b4f22907101716231403&q=Nigeria&aqi=no
const temperature = document.querySelector('.temp');
const timeLocation = document.querySelector('.timeLocation');
const dateTime = document.querySelector('.dateTime');
const currentCondition = document.querySelector('.condition');
const search = document.querySelector('.searchArea');
const form = document.querySelector('form')

form.addEventListener('submit', searchForLocation)

let target = 'Nigeria';
const fetchResult = async (targetLocation) => {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=599d9cf4d41b4f22907101716231403&q=${targetLocation}&aqi=no`)
    // console.log(response)

    const data = await response.json()
    // console.log(data)

    let locationName = data.location.name;
    let time = data.location.localtime;
    let temp = data.current.temp_c;
    let tempFar = data.current.temp_f;
    let currentCondition = data.current.condition.text;

    // addTarget(locationName)
    
    updateDetails(temp, tempFar, locationName, time, currentCondition)
}

function updateDetails (temp, tempFar, locationName, time, condition) {
    console.log(time)
    let splitDate = time.split(' ') [0]
    console.log(splitDate)
    let splitTime = time.split(' ') [1]
    let currentDay = getDayName(new Date(splitDate).getDay())
    console.log(currentDay)

    temperature.innerHTML = `${temp}°C / ${tempFar}°F`;
    timeLocation.innerHTML = locationName;
    dateTime.innerHTML = `${currentDay} ${splitDate} ${splitTime}`
    currentCondition.innerHTML = condition 
}

function searchForLocation (event) {
    event.preventDefault()
    target = search.value
    fetchResult(target)
}
fetchResult(target);

const getDayName = (number => {
    switch (number) {
        case 0:
            return 'Sunday'
        break;
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        case 6:
            return 'Saturday'
    }
})