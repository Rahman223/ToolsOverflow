import React from 'react';
import { Redirect } from 'react-router-dom';
import SignUpCSS from './Register.module.css'
import firebaseApp from '../firebase.js';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



const bucket = getStorage(firebaseApp);

function SignUpForm(props) {

    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);

    const handleImageUpload = e => {
        const file = e.target.files[0];
        if (file) {
        const reader = new FileReader();
        const { current } = uploadedImage;
        current.file = file;
        reader.onload = e => {
            current.src = e.target.result;
        };
        reader.readAsDataURL(file);
        }
    };

    return (

        <div className="container">
            <div className="d-flex justify-content-center h-100">
                <div className={SignUpCSS.card}>
                    <div className="card-body">
                        <form onSubmit={props.onSubmit} className="row g-3">
                            <div className="form-group col-md-3">
                            </div>

                            <div className="form-group col-md-6">
                                <h3 className={SignUpCSS.title}>Register</h3>
                                <div className={SignUpCSS.profileDiv}>
                                    <input type="file" name="file" accept="image/*" onChange={handleImageUpload} ref={imageUploader} style={{display: "none"}}/>
                                    <div onClick = {()=> imageUploader.current.click()}>
                                    <img ref={uploadedImage} src="https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg" className={SignUpCSS.profilePic} alt=""/> 
                                    </div>
                                    <span className={SignUpCSS.picMessage}>Click to upload profile picture</span>
                                    
                                </div>
                            </div>
                            <div className="form-group col-md-3">
                            </div>

                            <div className="form-floating col-md-6">
                                <input type="text" className={`form-control ${SignUpCSS.formInput}`} id="fName" placeholder="First Name"/>
                                <label for="fName">First Name</label>
                            </div>

                            <div className="form-floating col-md-6">
                                <input type="text" className={`form-control ${SignUpCSS.formInput}`} id="lName" placeholder="Last Name"/>
                                <label for="lName">Last Name</label>
                            </div>

                            <div className="form-floating col-md-8">
                                <input type="email" className={`form-control ${SignUpCSS.formInput}`} id="email" placeholder="Email Address"/>
                                <label for="email">Email Address</label>
                            </div>
                            <div className="form-floating col-md-4">
                                <input type="text" className={`form-control ${SignUpCSS.formInput}`} id="userName" placeholder="Username"/>
                                <label for="userName">Username</label>
                            </div>

                            <div className="form-floating col-md-6">
                                <input type="password" className={`form-control ${SignUpCSS.formInput}`} id="password" placeholder="Password"/>
                                <label for="password">Password</label>
                            </div>

                            <div className="form-floating col-md-6">
                                <input type="password" className={`form-control ${SignUpCSS.formInput}`} id="confirmPass" placeholder="Confirm Password"/>
                                <label for="confirmPass">Confirm Password</label>
                            </div>

                            {/* <div className="form-floating col-md-12">
                                <input type="text" className={`form-control ${SignUpCSS.formInput}`} id="address" placeholder="Street Address"/>
                                <label for="address">Street Address</label>
                            </div>

                            <div className="form-floating col-md-5">
                                <input type="text" className={`form-control ${SignUpCSS.formInput}`} id="city" placeholder="City/Town"/>
                                <label for="city">City/Town</label>
                            </div>

                            <div className="form-floating col-md-5">
                                <input type="text" className={`form-control ${SignUpCSS.formInput}`} id="state" placeholder="State"/>
                                <label for="state">State</label>
                            </div>

                            <div className="form-floating col-md-2">
                                <input type="text" className={`form-control ${SignUpCSS.formInput}`} id="zipCode" placeholder="Zip Code"/>
                                <label for="zipCode">Zip Code</label>
                            </div> */}

                            <div className={`form-check mt-4 col-md-5 ms-2`}>
                                <input className="form-check-input" type="checkbox" value="" id="terms"/>
                                <label className="form-check-label float-start" for="terms">agree to terms and conditions</label>
                            </div>

                            <div className={`form-group mt-4 col-md-6 ms-auto mb-3`}>
                            <input type="submit" value="Register" className={`btn float-end ${SignUpCSS.registerButton}`} />
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            {props.err}
        </div>
    );
}

class SignUp extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            success : false,
            passMatch : true,
            dataObj :
            { email: " ",
              userName: " ",
              password: " ",
              fName: " ",
              lName: " ",
              profilePic: "",
            } 
        }

        this.handleSubmit= this.handleSubmit.bind(this);
    }

    
    handleSubmit(e){
        e.preventDefault();
        let email = e.target.email.value;
        let userName = e.target.userName.value;
        let password = e.target.password.value;
        let confirmPass = e.target.confirmPass.value;
        let fName = e.target.fName.value;
        let lName = e.target.lName.value;


        
        if(password === confirmPass){
            if(e.target.file.files[0]){
                let file = e.target.file.files[0];
    
                const storageRef = ref(bucket, 'images/'+file.name);
                const uploadTask = uploadBytesResumable(storageRef, file)
    
                uploadTask.on(
                    "state_changed",
                    snapshot =>{},
                    error =>{
                        console.log(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref)
                        .then(url => {
                            console.log("Url:", url);

                            this.setState(prevState => {
                                let dataObj = { ...prevState.dataObj };
                                dataObj.email = email;
                                dataObj.userName = userName;
                                dataObj.password = password;
                                dataObj.fName = fName;
                                dataObj.lName = lName;
                                dataObj.profilePic = url;
                                return {dataObj}
                            }, ()=> {
                                this.makePostReq()
                            })

                            

                        })
                    }
                )
            } else {
                let defaultPic = "https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"
                this.setState(prevState => {
                    let dataObj = { ...prevState.dataObj };
                    dataObj.email = email;
                    dataObj.userName = userName;
                    dataObj.password = password;
                    dataObj.fName = fName;
                    dataObj.lName = lName;
                    dataObj.profilePic = defaultPic;
                    return {dataObj}
                }, ()=>{
                    this.makePostReq()
                })
            }

        }else{
            this.setState({
                passMatch : false
            })
        }
    
    }

    makePostReq(){
        fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.dataObj),
        })
        .then(response => {
            if(response.ok){
                console.log("success")
                this.setState({success: true})
            }
        })
        .catch(error => {
            console.log('Error', error);
        });
    }


    render(){
        if(this.state.success) return <Redirect to="/log-in" />;
        let passMatch = this.state.passMatch

        let error =""
        if(!passMatch){
            error = <div className="alert alert-danger" role="alert">Password does not match!</div> 
        }
        return (
            
            <div>
                <SignUpForm onSubmit ={this.handleSubmit} err={error}/>
            </div>

            
        )
    }
        
    
}

export default SignUp;