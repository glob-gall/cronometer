const audio = document.getElementById('ring')
const start = document.querySelector('.button-start')
const stop = document.querySelector('.button-stop')
const time = document.querySelector('.time')
const maxtime = document.querySelector('.max-time')

let MAX_TIME=0
let timerOn = false
let timer=0

const loop =()=>{
  timerOn=true
  timer += 100
  console.log(timer);

  if(timer>=MAX_TIME && MAX_TIME!==0){
    stopTimer()
    alarm()
  }
 time.innerHTML= convertToTimer(timer.toString())
}
let cronometer 
const startConometer = (start)=> start
  ? cronometer = setInterval(loop,100) 
  : clearInterval(cronometer)


const convertToTimer = (stringTime='000000')=>{
    const min = Math.trunc(stringTime.slice(0,stringTime.length-3)/60)
     const sec = stringTime.slice(0,stringTime.length-3)%60
     const mili = stringTime.slice(stringTime.length-3,stringTime.length-1)

     return `${min<10?'0':''}${min}:${sec<10?'0':''}${sec}:${mili}`
}

const alarm = ()=>{
  audio.play()
}

const startTimer = ()=>{
  if(timerOn){
    return
  }
  stop.innerHTML = 'STOP'
  start.classList.add('disabled')
  stop.classList.remove('disabled')
  startConometer(true)

  timerOn=true
}
const stopTimer = ()=>{
  startConometer(false)
  if(timerOn ===true){
    stop.innerHTML = 'RESET'
    timerOn= false
    return
  }
  stop.innerHTML = 'STOP'
  stop.classList.add('disabled')
  start.classList.remove('disabled')
  time.innerHTML='00:00:00'
  timerOn= false
  timer = 0
}

start.addEventListener('click',()=>startTimer())

stop.addEventListener('click',()=>stopTimer())

const setMaxTime = (time)=>{
  if(MAX_TIME+time<0){
    return
  }
  if(MAX_TIME+time===0){
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