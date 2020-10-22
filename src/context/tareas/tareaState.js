import React, { useReducer } from 'react'
import tareaContext from './tareaContext'
import TareaReducer from './tareaReducer'
// import uuid from 'uuid'

import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types'

import clienteAxios from '../../config/axios'

const TareaState = props => {

    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null

    }

    //crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState)

    //obtener las tareas de un proyecto
    const obtenerTareas = async proyecto => {
        try {
            const resultado = await clienteAxios.get('/api/tareas', {params: {proyecto}})
            // console.log(resultado)
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch (error) {
            console.log(error)
        }      
    }
    // agregar una tarea al proyecto seleccionado
    const  agregarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea)
            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error)
        }
    }
    // valida y muestra un error en caso de que sea necesario
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA,
        })
    }

    // ellminar tarea por id
    const eliminarTarea = async (id, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}})

            dispatch({
                type:ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error)
        }
    }

    //edita o modifica una tarea
    const actualizarTarea = async tarea => {      
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload : resultado.data.tarea
            })
        } catch (error) {
            console.log(error)
        }
    }

    //extrae la tarea para edicion
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    // ELIMINA LA TAREA SELECCIONADA
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }
    return (
        <tareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        
        >
            {props.children}
        </tareaContext.Provider>
    )
}

export default TareaState
