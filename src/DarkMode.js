const html = document.querySelector('html');
const checkebox = document.querySelector('input[name=theme]');
const mobil = document.querySelector('.nav-mobil span');
const nav = document.querySelector('.main-nav ul');


//pegando as cores
const getStyle = (element, style) => 
window
.getComputedStyle(element)
.getPropertyValue(style)

//pegando do html a propiedade
const initialColors = {
    bg: getStyle(html, "--bg"),
    bgPanel: getStyle(html, "--bg-panel"),
    colorHeadings: getStyle(html, "--color-headings"),
    colorText: getStyle(html, "--color-text")
}

//pegando do html a propiedade
const darkMode = {
    bg: "#363849",
    bgPanel: "#ffffff",
    colorHeadings: "#3664FF",
    colorText: "#363849"
}

//pegar os objetos e tranforma tudo em minuscula
// passando um - antes de cada letra maiuscula que encontra
const transformKey = key => "--" + key.replace(/([A-Z])/, "-$1").toLowerCase();

//aplicando a cores
const changeColors = (colors) => {
   
    Object.keys(colors).map(key => 
            html.style.setProperty(transformKey(key), colors[key])    
        )

}



//aplicando um evento toda vez que mudar o comportamento no checkbox
checkebox.addEventListener('change', ({ target }) =>{

        if(checkebox.checked){
            sessionStorage.setItem('darkMode', 'true');
        }else{
            sessionStorage.setItem('darkMode', 'false');
        }
       
    getLocal();

})

const getLocal = () => {
    
    if(sessionStorage.getItem('darkMode') === 'true'){
    changeColors(darkMode)
    checkebox.checked = true
    
}else{
    if(sessionStorage.getItem('darkMode') === 'false'){
         changeColors(initialColors)
     checkebox.checked = false
    }
}
}

getLocal();

mobil.addEventListener('click', e =>{

   

    if( mobil.classList.toggle('active')){
        nav.style.transform = "translateY(0)"
        nav.style.visibility = "visible"
        nav.style.opacity = "1"
        nav.style.transition = ".3s ease-in-out"
    }else{
        nav.style.transform = "translateY(-100%)"
        nav.style.visibility = "hidden"
        nav.style.opacity = "0"
        nav.style.transition = ".3s ease-in-out"
    }

})

