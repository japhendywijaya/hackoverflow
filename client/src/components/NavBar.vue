<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            
            <a class="navbar-brand" href="#">HACKTIVoverflow</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- 'left group' -->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <router-link class="nav-link" to="/">Home</router-link>   
                    </li>
                </ul>
            <!-- end of 'left group' -->

                <!-- 'search group' -->
                <div style="margin-right:1%">
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit" @click.prevent="searchByTitle">Search</button>
                </form>
                </div>
                <!-- end of 'search group' -->

                <!-- 'user dropdown' -->
                <div>
                    <ul class="navbar-nav mr-auto" style="margin-right:10%">
                    <li class="nav-item dropdown">
                        <div class="btn-group">
                            <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-if="!isLogin">
                                User Menu
                            </button>
                            <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-if="isLogin">
                                {{ loggedUsername }}
                            </button>
                            <div class="dropdown-menu dropdown-menu-right">
                                <button class="dropdown-item" type="button" data-toggle="modal" data-target="#modalUserForm" v-if="!isLogin" @click.prevent="changeForm('register')">Register</button>
                                <button class="dropdown-item" type="button" data-toggle="modal" data-target="#modalUserForm" v-if="!isLogin" @click.prevent="changeForm('login')">/Login</button>
                                <button class="dropdown-item" type="button" data-toggle="modal" data-target="#modalUserForm" v-if="isLogin" @click.prevent="changeForm('newQuestion')">+New Question</button>
                                <div class="dropdown-divider"></div>
                                <button class="dropdown-item" type="button" v-if="isLogin" @click.prevent="logOut">Log Out</button>
                            </div>
                        </div>
                    </li>
                    </ul>
                </div>
                <!-- end of 'user dropdown' -->
                
            </div>
        </nav>
        <!-- <h1>lalalala</h1>
        state.isLogin = {{ isLogin  }} -->

        <!-- modal 'modalUserForm' -->
        <div class="modal fade" id="modalUserForm" tabindex="-1" role="dialog" aria-labelledby="modalUserFormLabel" aria-hidden="true" >
        <div class="modal-dialog " role="document" >
            <div class="modal-content" style="width:20rem;">
                
                <div class="modal-header">
                    <h5 class="modal-title" id="modalUserFormLabel" v-if="showForm === 'register'">Registration</h5>
                    <h5 class="modal-title" id="modalUserFormLabel" v-if="showForm === 'login'">Login</h5>
                    <h5 class="modal-title" id="modalUserFormLabel" v-if="showForm === 'newQuestion'">New Question</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <form @submit.prevent="submitForm">
                        <div class="form-group text-sm-left" v-if="showForm === 'register'">
                            <label for="username" class="col-form-label"><b>Username</b></label>
                            <input type="username" class="form-control" id="username" v-model="username" required>
                        </div>

                        <div class="form-group text-sm-left" v-if="showForm === 'newQuestion'">
                            <label for="title" class="col-form-label"><b>Title</b></label>
                            <input type="title" class="form-control" id="title" v-model="questionTitle" required>
                            <div class="form-group">
                                <label for="description"><b>Description</b></label>
                                <textarea class="form-control" id="description" rows="5" style="resize:none" v-model="questionDescription" required></textarea>
                            </div>
                        </div>

                        <UserForm v-if="showForm !== 'newQuestion'"/>

                        <div class="modal-footer">
                            <div style="margin:auto">
                                <button type="submit" class="btn btn-primary" v-if="showForm === 'register'">Register</button>
                                <button type="submit" class="btn btn-primary" v-if="showForm === 'login'">Login</button>
                                <button type="submit" class="btn btn-primary" v-if="showForm === 'newQuestion'">Post Question</button>
                            </div>
                            <div>
                            <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#" @click.prevent="changeForm('register')" v-if="showForm === 'login'" >New around here? let's <b>Sign Up</b></a>
                                <a class="dropdown-item" href="#" @click.prevent="changeForm('login')" v-if="showForm === 'register'">Already registered? <b>Log In</b></a>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
        </div>
        <!-- end of modal 'modalUserForm' -->



    </div>


</template>

<script>
import UserForm from '@/components/UserForm'
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2'
import axios from '../../config/axios'

export default {
    components:{
        UserForm
    },
    data(){
        return{
            showForm:'login',
            questionTitle:'',
            questionDescription:'',
        }
    },
    methods:{
        changeForm(form)
          {
              this.showForm = form
              this.username = ''
              this.questionTitle = ''
              this. questionDescription = ''
              this.$store.commit('UPDATE_EMAIL', '')
              this.$store.commit('UPDATE_PASSWORD', '')
          },
        searchByTitle()
          {
              Swal.fire('jalan nih')
          },
        submitForm()
          {
              switch (this.showForm) {
                  case 'register': this.register(); break;
                  case 'login': this.login(); break;
                  case 'newQuestion': this.postNewQuestion(); break;
              }
            
          },
        register()
          {
              axios({
                  method:'post',
                  url: 'http://localhost:3000/users/register',
                  data:{
                      username: this.username,
                      email: this.inputEmail,
                      password: this.inputPassword
                  }
              })
              .then(result=>{
                console.log("TCL: result @register()", result)
                Swal.fire({
                    title: 'Registration Succesful',
                    text: `Thanks for joining us ${this.username}`,
                    icon: 'success'
                })
                .then(result=>{
                    Swal.fire({
                    title: 'Continue to login...',
                    })
                })
                

                this.username=''
                this.$store.commit('UPDATE_EMAIL', '')
                this.$store.commit('UPDATE_PASSWORD', '')

                this.changeForm('login')

              })
              .catch(err=>{
                console.log("TCL: err.response", err.response.data)
                Swal.fire(
                    'Something\'s Wrong',
                    `${err.response.data.message}`,
                    'error'
                )
              })
          },
        login()
          {
              axios({
                  method: 'post',
                  url: '/users/login',
                  data:{
                      email: this.inputEmail,
                      password: this.inputPassword
                  }
              })
              .then(result=>{
                  console.log('TCL \n============\n ', result)
                  Swal.fire(
                      'Login Successful',
                      `Welcome back ${result.data.username}`
                  )

                  localStorage.setItem('access_token', result.data.access_token)
                  localStorage.setItem('username', result.data.username)
                  this.$store.commit('SET_LOGGED_USERNAME')
                  this.$store.commit('SET_IS_LOGIN')
                  $('#modalUserForm').modal('hide')
                  
              })
              .catch(err=>{
                  console.log("TCL: err", err.response.data)
                  Swal.fire(
                      'Something\'s Wrong',
                      `${err.response.data.message}`,
                      'error'
                  )
              })
          },
        logOut()
          {
              Swal.fire({
                  title:'Logging Out',
                  text:'Confirm loggin out?',
                  icon:'warning',
                  showCancelButton: true
              })
              .then(result=>{
                  if(result.value)
                    {
                        localStorage.clear()
                        this.$store.commit('SET_IS_LOGIN')
                        this.$store.commit('SET_LOGGED_USERNAME')
                        Swal.fire(
                            'User Has Logged Out',
                            'See you again next time'
                        )
                    }
              })
          },
        postNewQuestion()
          {
              axios({
                  method: 'post',
                  url: '/questions',
                  headers:{
                      access_token:localStorage.getItem('access_token')
                  },
                  data:{
                      title: this.questionTitle,
                      description: this.questionDescription
                  }
              })
              .then(result=>{
                  Swal.fire({
                      title: "Success to Post New Question",
                      icon: 'success'
                  })

                this.questionTitle = ''  
                this.questionDescription = ''
                
                $('#modalUserForm').modal('hide')
                this.$store.dispatch('fetchQuestionData')
              })
              .catch(err=>{
                  console.log('TCL \n============\n ', err.response.data )
                  Swal.fire({
                      title:'Something\'s Wrong ',
                      text: `${err.response.data.message}`,
                      icon: 'error'
                  })
              })
          }

        

    },
    mounted(){
        this.$store.commit('SET_IS_LOGIN')
        this.$store.commit('SET_LOGGED_USERNAME')
        
    },
    computed:{
        ...mapGetters([
            'inputEmail',
            'inputPassword',
            'isLogin',
            'loggedUsername'
        ])
    }





}
</script>



<style scoped>


</style>