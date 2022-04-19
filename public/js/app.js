console.log('Client side javascript file is loaded!')
//MAPBOX_KEY
let address = document.getElementById('locationvalue')
let infodiv = document.getElementsByClassName('weatherdetails')[0]
document.getElementById('myform').addEventListener('submit', (e) => {
    e.preventDefault()
    let para = document.createElement('p')
    para.classList.add('infomsg')
    let text = document.createTextNode('Loading...')
    para.appendChild(text)
    infodiv.classList.add('addBoxshadow')
    infodiv.appendChild(para)
    fetch(`https://joshi-node-weather-website.herokuapp.com/weather?address=${address.value}`).then((res) => res.json()).then((data) => {
        para.style.display = 'none'
        infodiv.classList.add('addBoxshadow')
        const str = ` <div class="Maindetails">
        <img src=${data.current.weather_icons[0]} alt=""/>
        <div class="info">
            <h3>${data.current.temperature}°C ${data.current.weather_descriptions[0]}</h3>
            <h4>${data.place}</h4>
        </div>
    </div>
    <div class="otherInfodiv">
        <div class="icon-div">
            <img width="35" src='/img/pressurelogo.jpg'></img>
            <p>Wind : ${data.current.pressure}kmph</p>
        </div>
        <div class="icon-div">
            <img width="35" src='/img/humiditylogo.jpg'></img>
            <p>Humidity : ${data.current.humidity}%</p>
        </div>
        <div class="icon-div">
            <img width="35" src='/img/feelslikelogo.jpg'></img>
            <p>Feels like : ${data.current.feelslike}°C</p>
        </div>
    </div>`
        infodiv.innerHTML = str
    }).catch((err) => {
        let para = document.createElement('p')
        para.classList.add('errormsg')
        let text = document.createTextNode('please use valid address !')
        para.appendChild(text)
        infodiv.classList.add('addBoxshadow')
        infodiv.appendChild(para)
        setTimeout(() => {
            para.style.display = 'none'
        }, 1000);
    })
})
