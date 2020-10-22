import React, {Fragment, useContext} from 'react'
import Tarea from './Tarea'

import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'
import { CSSTransition, TransitionGroup} from 'react-transition-group'

const ListadoTareas = () => {

    //obtener las tareas del proyecto
    const proyectosContext = useContext(proyectoContext)
    const { proyecto, eliminarProyecto } = proyectosContext

    //obtener el state de tareas
    const tareasContext = useContext(tareaContext)
    const { tareasproyecto } = tareasContext

    //si no hay un proyecto seleccionado
    if (!proyecto) return <h2>Selecciona un proyecto</h2>

    // array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto

    //funcion eliminar proyecto
    const OnClickEliminar = () => {
        eliminarProyecto(proyectoActual._id)
    }

    return (
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className="listado-tareas">
                {tareasproyecto.length === 0
                    ?(<li className="tarea"><p>No hay tareas</p> </li> )
                    :
                    <TransitionGroup>
                    {tareasproyecto.map(tarea =>(
                        <CSSTransition
                            key={tarea._id}
                            timeout={200}
                            classNames="tarea"
                        >
                        <Tarea 
                            
                            tarea={tarea}
                        />
                        </CSSTransition>
                    ))}
                    </TransitionGroup>
                
                }
            </ul>
            <button 
                className="btn btn-eliminar"
                type="button"
                onClick={OnClickEliminar}
            >Eliminar Proyecto &times;</button>
        </Fragment>
    )
}

export default ListadoTareas
