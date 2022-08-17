import gsap from "gsap"



  const animation=(anim)=>{
    console.log(anim)
    const t=gsap.timeline().delay(2)
    
    console.log(window.screen.height,window.innerHeight)
    t.fromTo(anim.current,{duration:4,x:window.innerHeight-320,y:window.innerWidth-1150,opacity:1},{duration:4,x:window.innerHeight-740,y:window.innerWidth-1150})
    t.to(anim.current,{duration:4,x:window.innerHeight-644,y:window.innerWidth-1150},">+2")
    t.to(anim.current,{duration:2,opacity:0},">+2")
    t.to(anim.current,{duration:1,x:window.innerHeight-320,y:window.innerWidth-1150})
    
  }
  
  
  export {animation}