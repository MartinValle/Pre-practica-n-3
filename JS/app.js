//MENU RESPONSIVE
var btnAbrirMenu = document.getElementById("btnAbrirMenu"),
    btnCerrarMenu = document.getElementById("btnCerrarMenu"),
    menuResponsive = document.getElementById("barraMenu"),
    enlaces = document.getElementById("enlaces");

    //Evento click abrir
    btnAbrirMenu.addEventListener("click", function () {
        menuResponsive.classList.add("active");  //agrega clase
    });

    //Evento click cerrar
    btnCerrarMenu.addEventListener("click", function () {
        menuResponsive.classList.remove("active");  //quita clase
    });

    //Evento cerrar menú con enlace
    enlaces.addEventListener("click", function () {
        menuResponsive.style.transitionDelay = "0.5s";
        menuResponsive.classList.remove("active");  //quita clase
    });

//SLIDER PRODUCTOS

var contenedor = document.querySelector(".slider"),  //id o class
    btnIzq = document.getElementById("btn-izq"),
    btnDer = document.getElementById("btn-der");

    //Evento botón derecho
    btnDer.addEventListener("click", function() {
        contenedor.scrollLeft += contenedor.offsetWidth; //scroll
    })

    //Evento boton izquierdo
    btnIzq.addEventListener("click", function() {
        contenedor.scrollLeft -= contenedor.offsetWidth; //scroll
    })

//VALIDAR FORMULARIO

var formulario = document.getElementById("formulario")

    function validar(e){
        var inputNombre = document.getElementById("nombre"),
            inputEmail = document.getElementById("email"),
            inputComent = document.getElementById("comentarios"),
            alertCorrecto = document.getElementById("alerta-correcto"),
            alertError = document.getElementById("alerta-error");

        if(inputNombre.value == 0 || inputEmail.value == 0 || inputComent.value == 0){
            e.preventDefault();
            alertError.classList.remove("hide");
            alertError.classList.add("show");

            setTimeout(function(){
                alertError.classList.remove("show");
                alertError.classList.add("hide");
            },2000)

        }else{
            e.preventDefault();
            alertCorrecto.classList.remove("hide");
            alertCorrecto.classList.add("show");

            setTimeout(function(){
                alertCorrecto.classList.remove("show");
                alertCorrecto.classList.add("hide");
            },2000)

            inputNombre.value = "";
            inputEmail.value = "";
            inputComent.value = "";
        }
    }
    
//Evento formulario

formulario.addEventListener("submit",validar)

//BOTÓN SCROLL TOP
var btnTop = document.getElementById("btn-top");

//DETECTAMOS SCROLL
window.addEventListener("scroll",function(){
    var scroll = document.documentElement.scrollTop,
        fullSize = document.documentElement.offsetHeight,
        sizeViewPort = document.documentElement.clientHeight;

    if(scroll>100){
        btnTop.classList.add("show");
    }else{
        btnTop.classList.remove("show");
    }

    //MODIFICAR ELEMENTO FINAL DE PÁGINA
    if(fullSize == (scroll + sizeViewPort)){
        btnTop.classList.add("final")
    }else{
        btnTop.classList.remove("final")
    }

})

//DETECTAMOS CLICK EN BTN TOP

btnTop.addEventListener("click", function(){
    window.scrollTo(0,0) /*ejex,ejey*/

})

//EVENTO CLICK LOGO

var logo = document.getElementById("logo");

logo.addEventListener("click",function(){
    window.scrollTo(0,0)
})
var scene = new THREE.Scene();
document.addEventListener( 'mousemove', onMouseMove, false );
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var mouseX;
var mouseY;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

window.addEventListener("resize", function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
});

var distance = Math.min(200, window.innerWidth / 4);
var geometry = new THREE.Geometry();

for (var i = 0; i < 1600; i++) {

  var vertex = new THREE.Vector3();

  var theta = THREE.Math.randFloatSpread(360); 
  var phi = THREE.Math.randFloatSpread(360); 

  vertex.x = distance * Math.sin(theta) * Math.cos(phi);
  vertex.y = distance * Math.sin(theta) * Math.sin(phi);
  vertex.z = distance * Math.cos(theta);

  geometry.vertices.push(vertex);
}
var particles = new THREE.Points(geometry, new THREE.PointsMaterial({color: 0xff44ff, size: 2}));
particles.boundingSphere = 50;


var renderingParent = new THREE.Group();
renderingParent.add(particles);

var resizeContainer = new THREE.Group();
resizeContainer.add(renderingParent);
scene.add(resizeContainer);

camera.position.z = 400;

var animate = function () {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
};
var myTween;
function onMouseMove(event) {
  if(myTween)
    myTween.kill();
  
  mouseX = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouseY = - ( event.clientY / window.innerHeight ) * 2 + 1;
  myTween = gsap.to(particles.rotation, {duration: 0.1, x: mouseY*-1, y: mouseX});
  //particles.rotation.x = mouseY*-1;
  //particles.rotation.y = mouseX;
}
animate();

// Scaling animation
var animProps = {scale: 1, xRot: 0, yRot: 0};
gsap.to(animProps, {duration: 10, scale: 1.3, repeat: -1, yoyo: true, ease: "sine", onUpdate: function() {
  renderingParent.scale.set(animProps.scale,animProps.scale,animProps.scale);
}});

gsap.to(animProps, {duration: 120, xRot: Math.PI * 2, yRot: Math.PI * 4, repeat: -1, yoyo: true, ease: "none", onUpdate: function() {
  renderingParent.rotation.set(animProps.xRot,animProps.yRot,0);
}});