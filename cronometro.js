const audio = document.getElementById('ring')
const start = document.querySelector('.button-start')
const stop = document.querySelector('.button-stop')
const time = document.querySelector('.time')
const maxtime = document.querySelector('.max-time')

let MAX_TIME=000000;
let timerOn = false
let cronometerLoop


const convertToTimer = (time)=>{
    const min = Math.trunc(time.slice(0,time.length-3)/60)
     const sec = time.slice(0,time.length-3)%60
     const mili = time.slice(time.length-3,time.length-1)

     return `${min<10?'0':''}${min}:${sec<10?'0':''}${sec}:${mili}`
}

const alarm = ()=>{
  audio.play()
}

const startTimer = ()=>{
  stop.innerHTML = 'STOP'
  start.classList.add('disabled')
  stop.classList.remove('disabled')

  let timer = new Date()
  if(timerOn){
    return
  }
   cronometerLoop = setInterval(()=>{
    const newDate = new Date()
    let cTime = `${newDate-timer}`
    if(cTime>=MAX_TIME && MAX_TIME!==0){
      stopTimer()
      alarm()
    }
     time.innerHTML= convertToTimer(cTime)
     
  },100)
  timerOn=true
}
const stopTimer = ()=>{
  
  if (timerOn===false){
    stop.innerHTML = 'STOP'
    stop.classList.add('disabled')
    start.classList.remove('disabled')
    time.innerHTML='00:00'
    timerOn=true
  }
    timerOn=false
    stop.innerHTML = 'RESET'
    clearInterval(cronometerLoop)
    return
}

start.addEventListener('click',()=>startTimer())

stop.addEventListener('click',()=>stopTimer())

const setMaxTime = (time)=>{
  if(MAX_TIME+time<0){
    return
  }
  if(MAX_TIME+time===0){
    MAX_TIME += time
    maxtime .innerHTML= "MAX TIME: 00:00:00"
    return
  }


  MAX_TIME += time
  maxtime .innerHTML= `MAX TIME: ${convertToTimer(MAX_TIME.toString())}`
  
}

const remove1 = document.querySelector('.remove-1')
const remove10 = document.querySelector('.remove-10')
const remove60 = document.querySelector('.remove-60')
const add1 = document.querySelector('.add-1')
const add10 = document.querySelector('.add-10')
const add60 = document.querySelector('.add-60')

remove1.addEventListener('click',()=>setMaxTime(-1000))
remove10.addEventListener('click',()=>setMaxTime(-10000))
remove60.addEventListener('click',()=>setMaxTime(-60000))

add1.addEventListener('click',()=>setMaxTime(1000))
add10.addEventListener('click',()=>setMaxTime(10000))
add60.addEventListener('click',()=>setMaxTime(60000))


const clearTime = document.querySelector('.button-change-time-x')
clearTime.addEventListener('click',()=>{
  MAX_TIME=0
  maxtime .innerHTML= `MAX TIME: 00:00:00`
})