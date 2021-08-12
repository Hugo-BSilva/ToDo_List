import { createApp } from 'vue'
import Todos from './api/todos'
import './assets/css/main.css'

const apiTodos = new Todos()

//Recebe um argumento que e um objeto de opcoes
const app = createApp({

    //Dados da aplicacao que serao renderizados em tela
    data() {
      return {
        todos: [],
        form: {
          text: '',
          done: false,
        }
      }
    },

    created(){
      this.indexTodos()
    },

    methods: {   
      async indexTodos(){
        this.todos = await apiTodos.index()
      },  

      async createTodo(){
        const data = await apiTodos.store(this.form)
        this.todos.push(data)

        this.form.text = ''
        this.form.done = false
      },

      async toggleTodoStatus(todo){
        //Despeja todos os objetos em todo e atualiza colocando o valor inverso que estava
        const data = await apiTodos.update({
          ... todo,
          done: !todo.done
          //Mesma coisa: done: todo.done == true ? false : true
        })

        const index = this.todos.findIndex((todo) => todo.id == data.id)
        this.todos[index] = data
      },

      async destroyTodo(id){
        await apiTodos.destroy({ id })
        
        const index = this.todos.findIndex((todo) => todo.id == id)
        this.todos.splice(index, 1)
      },
      
    },
    
})

//Pega o APP vue e monta ele na tag #app
app.mount('#app')