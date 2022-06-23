const weatherFormBtn = document.querySelector('button')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')

weatherFormBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
            console.log(data.location)
        }else{
            console.log(data)
            messageOne.textContent = data.location
            messageTwo.textContent = `${data.forecastData.weather_descriptions}, Humidity: ${data.forecastData.humidity}%`
            messageThree.textContent = `It is currently ${data.forecastData.temperature} degree centigrade out. It feels like ${data.forecastData.feelslike} degree centigrade out.`
            messageFour.textContent = `There is a precipitation of ${data.forecastData.precip * 100}%.`
        }
        })
    })
    
})
