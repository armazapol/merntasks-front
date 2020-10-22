import React, {useContext, useState, useEffect} from 'react'

import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const FormTarea = () => {

    //obtener el state del formuluario
    const proyectosContext = useContext(proyectoContext)
    const { proyecto } = proyectosContext

    //obtener el state de tareas
    const tareasContext = useContext(tareaContext)
    const {tareaseleccionada, agregarTarea, validarTarea, errortarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext

    // effect que detecta si hay una tarea seleccionada
    useEffect(()=> {
        if(tareaseleccionada !== null){
            guardarTarea(tareaseleccionada)
        }   else {
            guardarTarea({
                nombre: ''
            })
        }
    }, [tareaseleccionada])

     //state del formulario
     const [tarea, guardarTarea] = useState ({
         nombre: ''
     })

     //extraer el nombre del proyecto
     const {nombre} = tarea

     //si no hay un proyecto seleccionado
    if (!proyecto) return null

    //Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto

    // leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        //validar
        if(nombre.trim() === ''){
            validarTarea()
            return
        }

        // Si es edicion o si es nueva tarea
        if(tareaseleccionada === null){
            //agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id
            agregarTarea(tarea)
        }   else {
            //actualizar tarea existente
            actualizarTarea(tarea)

            // elimina tareaseleccionada del state
            limpiarTarea()
        }

        //obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id)

        //reiniciar el form
        guardarTarea({
            nombre: ''
        })
    }

    return (
        <div className="formulario">
            <form 
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea.."
                        name="nombre"
                        value= {nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error">
                El nombre de la tarea es obligatorio</p> : null}
        </div>
    )
}

export default FormTarea
