import {createStore} from 'vuex'

import router from "@/router";

export default createStore({
    state: {
        tareas: [],
        tarea: {
            id: '',
            nombre: '',
            categorias: [],
            estado: '',
            numero: 0
        },
        user: null
    },
    getters: {
        usuarioAuth(state){
            return !!state.user
        }
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        cargar(state, payload) {
            state.tareas = payload
        },

        set(state, payload) {
            state.tareas = [...state.tareas, payload];
        },
        delete(state, payload) {
            state.tareas = state.tareas.filter(item => item.id !== payload)
        },
        tarea(state, payload) {
            const task = state.tarea = state.tareas.find(item => item.id === payload)
            return !task ? router.push('/').then(console.log).catch(console.error) : task

        },
        update(state, payload) {
            state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item)
            router.push('/')
        }
    },
    actions: {
        cerrarSesion({commit}){
            commit('setUser', null)
            router.push('/ingreso')
            localStorage.removeItem('user')
        },
        async ingresoUsuario({commit}, usuario) {
            try {
                const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAxy6_-zOn--0eKoAX3ag7mo0ih4qGoEyc`, {
                    method: 'POST',
                    body: JSON.stringify({
                        email: usuario.email,
                        password: usuario.password,
                        returnSecureToken: true
                    })
                })
                const userDB = await res.json()
                if (userDB.error){
                    console.log(userDB.error)
                    return
                }
                commit('setUser', userDB)
                router.push('/')
                localStorage.setItem('user', JSON.stringify(userDB))
            } catch (error) {
                console.log(error)
            }
        },
        async registrarUsuario({commit}, usuario) {
            try {
                const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxy6_-zOn--0eKoAX3ag7mo0ih4qGoEyc`, {
                    method: 'POST',
                    body: JSON.stringify({
                        email: usuario.email,
                        password: usuario.password,
                        returnSecureToken: true
                    })
                })
                const userDB = await res.json()
                if (userDB.error){
                    console.log(userDB.error)
                    return
                }
                commit('setUser', userDB)
                localStorage.setItem('user', JSON.stringify(userDB))
            } catch (error) {
                console.log(error)
            }
        },
        async cargarLS({commit, state}) {
            if(localStorage.getItem('user')){
                commit('setUser', JSON.parse(localStorage.getItem('user')))
            }else{
                return commit('setUser', null)
            }
            try {
                const res = await fetch(`https://detalles-8f51f-default-rtdb.firebaseio.com/tareas/${state.user.localId}.json?auth=${state.user.idToken}`)
                const dataDB = await res.json()

                const arrayTareas = []

                for (let id in dataDB) {
                    arrayTareas.push(dataDB[id])
                }
                commit('cargar', arrayTareas);

            } catch (error) {
                console.log(error)
            }

        },
        async setTareas({commit, state}, tarea) {
            try {
                const res = await fetch(`https://detalles-8f51f-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(tarea)
                })
                const dataDB = await res.json()
                commit('set', dataDB)
            } catch (error) {
                console.log(error)
            }

        },
        async deleteTareas({commit, state}, idTarea) {
            try {
                await fetch(`https://detalles-8f51f-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${idTarea}.json?auth=${state.user.idToken}`, {
                    method: 'DELETE'
                })
                commit('delete', idTarea);
            } catch (error) {
                console.log(error)
            }
        },
        setTarea({commit}, idTarea) {
            commit('tarea', idTarea)
        },
        async updateTarea({commit, state}, tarea) {
            try {
                const res = await fetch(`https://detalles-8f51f-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
                    method: 'PATCH',
                    body: JSON.stringify(tarea)
                })
                const dataDB = await res.json()
                commit('update', dataDB)
            } catch (error) {
                console.log(error)
            }
        }
        ,
    },
    modules: {}
})
