const Testimonial = require('../models/Testimoniales');
exports.mostrarTestimoniales = (req,res) =>{
    Testimonial.findAll()
        .then(testimoniales => res.render('testimoniales',{
            pagina: 'Testimoniales',
            testimoniales : testimoniales
        }))
}

exports.agregarTestimoniales = (req,res)=> {
    //validar que todods los campos esten llenos
    let{nombre,correo,mensaje} = req.body;

    let errores = [];
     if(!nombre){
         errores.push({'mensaje': 'Agrega tu nombre'})
     }
     if(!correo){
         errores.push({'mensaje': 'Agrega tu correo'})
     }
     if(!mensaje){
         errores.push({'mensaje': 'Agrega tu mensaje'})
     }

     //revisar por errores
     if(errores.length > 0){
         //muestra la vista con errores
         res.render('testimoniales',{
             errores,
             nombre,
             correo,
             mensaje
         })
     }else{
         //almacenarlo con la BD
         Testimonial.create({
            nombre,
            correo,
            mensaje 
         })
         .then(testimonial => res.redirect('/testimoniales'))
         .catch(error => console.log(error))

     }
 }