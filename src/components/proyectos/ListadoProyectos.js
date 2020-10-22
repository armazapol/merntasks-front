import React, { useContext, useEffect } from 'react'
import Proyecto from './Proyecto'
import ProyectoContext from '../../context/proyectos/proyectoContext'
import AlertaContext from '../../context/alertas/alertaContext'
import { TransitionGroup, CSSTransition} from 'react-transition-group'


const ListadoProyectos = () => {

    //obtener el state de proyectos
    const proyectosContext = useContext(ProyectoContext)
    const { mensaje, proyectos, obtenerProyectos } = proyectosContext

    //obtener alertas
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta} = alertaContext

    //obtener proyectos cuando carga el componente
    useEffect(() => {

        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

        obtenerProyectos()
        // eslint-disable-next-line
    }, [mensaje])

    //revisar si proyectos tiene contenido
    if (proyectos.length ===0) return <p>No hay proyectos</p>

    return (
        <ul className="listado-proyectos">

            { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg} </div>) : null}

            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto._id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Proyecto 
                            proyecto={proyecto}
                        />
                     </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    )
}

export default ListadoProyectos
