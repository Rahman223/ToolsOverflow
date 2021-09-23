import React from 'react';
import { Redirect } from 'react-router-dom';
import loginFormCSS from './Login.module.css'

function LoginForm(props){
    return(
        <div className="container">
            <div className="d-flex justify-content-center h-100">
                <div className={loginFormCSS.card}>
                    <div className="mt-5 mb-4">
                        <h3>Log In</h3>
                    </div>
                    <form onSubmit={props.onSubmit}>
                        <div className="form-floating mb-3">
                            <input type="text" className={`form-control ${loginFormCSS.formInput}`} id="userName" placeholder="Username"/>
                            <label for="userName">Username</label>
                        </div>

                        <div className="form-floating">
                            <input type="password" className={`form-control ${loginFormCSS.formInput}`} id="Password" placeholder="Password"/>
                            <label for="Password">Password</label>
                        </div>

                        <div className={`form-check mt-4 float-start`}>
                            <input className="form-check-input" type="checkbox" value="" id="rememberMe"/>
                            <label className="form-check-label" for="rememberMe">Remember me</label>
                        </div>

                        <div className={`form-group mt-3`}>
                            <input type="submit" value="Log In" className={`btn float-end ${loginFormCSS.loginButton}`} />
                        </div>
                    </form>

                    <div className=" mt-5 d-flex flex-column float-start">
                        <div className="mt-5">
                            Don't have an account?<a href="#">Sign Up</a>
                        </div>
                        <div className="mt-1">
                            <a className="float-start" href="#">Forgot your password?</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

class LogIn extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            redirect : false,
            failed : false, 
            userName: "",
            password: ""
        }

    this.handleLogIn = this.handleLogIn.bind(this)
    }

    handleLogIn(e){
        e.preventDefault()
        let user = e.target.userName.value; 
        let pass = e.target.password.value;

        this.setState({
            userName : user,
            password : pass
        })

        // auth.authenticate(user, pass)
        // .then(user => {
        //     this.setState({redirect : true})
        // })
        // .catch(err => {
        //     this.setState({failed: true})
        // })
    }

    render(){
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const redirect = this.state.redirect
        const failed = this.state.failed

        if(redirect){
            return <Redirect to={from}/>
        }

        let error =""
        if(failed){
            error = <div className="alert alert-danger" role="alert">Incorrect username or password.</div> 
        }


        return(
            <div>
                <LoginForm onSubmit={this.handleLogIn} err={error}/>
            </div>
               
        )
    }
}

export default LogIn;