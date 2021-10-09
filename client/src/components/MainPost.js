import React from 'react';
import PostCSS from './Post.module.css'
import auth from '../services/auth';
import Alert from 'react-bootstrap/Alert'


class MainPostComponent extends React.Component{

constructor(props){
    super(props);
    this.state ={
        postStatus: "Listed",
        success: false,
        error: false,
        unAuth: false,
        successAlert: "",
        errorAlert: "",
        unAuthAlert: ""
    };

    this.handleClickBorrowTool = this.handleClickBorrowTool.bind(this)
    this.AlertAuth = this.AlertAuth.bind(this)
    this.AlertError = this.AlertError.bind(this)
    this.AlertSuccess = this.AlertSuccess.bind(this)
}


AlertAuth() {
  
    if (this.state.unAuth) {
      return (
          
        <Alert variant="danger" onClose={() => this.setState({unAuth: false})} dismissible>
            <Alert.Heading>Log in to borrow tools.</Alert.Heading>
        </Alert>
      );
    }else{
        return <></>
    }
}

AlertError(){
    if (this.state.error) {
        return (
          <Alert variant="danger" onClose={() => this.setState({error: false})} dismissible>
            <Alert.Heading>Tool is either no longer available or it is your own tool</Alert.Heading>
          </Alert>
        );
    }else{
        return <></>
    }

}

AlertSuccess(){
    if (this.state.success) {
        return (
          <Alert variant="success" onClose={() => this.setState({success: false})} dismissible>
            <p>You have successfully borrowed the tool. Visit borrowed section in profile to pick up the tool.</p>
          </Alert>
        );
    }else{
        return <></>
    }
}

handleClickBorrowTool(e, id){
    fetch(`/api/posts/borrow/${auth.user.userName}/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        let status = response.status

        if(status === 200){
            return response.json()
        }

        if(status === 401){
            this.setState({unAuth: true})
            let alert = this.AlertAuth()
            this.setState({unAuthAlert: alert})
        }

        if(status === 500){
            this.setState({unAuth: true})
            let alert = this.AlertAuth()
            this.setState({unAuthAlert: alert})
        }

        if(status === 405){
            this.setState({error: true})
            let alert = this.AlertError()
            this.setState({errorAlert: alert})
        }
        
    })
    .then(data => {
        // console.log('Success:', data);
        this.setState({postStatus: data.postStatus, success: true})
        let alert = this.AlertSuccess()
        this.setState({successAlert: alert})
    })
    .catch(error => {
        console.log('Error', error);
        
    });
}



    render(){


        let unAuthErr ="";
        if(this.state.unAuth === true){
            unAuthErr = this.state.unAuthAlert
        }else{
            unAuthErr = <></>
        }

        let error =""
        if(this.state.error === true){
            error = this.state.errorAlert
        }else{
            error= <></>
        }

        let success =""
        if(this.state.success === true){
            success = this.state.successAlert
        }else{
            success = <></>
        }

        return(
            <div className={`card mb-3 ${PostCSS.card} pt-2`}>
                {unAuthErr}
                {error}
                {success}
                <div className="row g-0">
                    <div className="col-md-6 mt-2">
                        <img src={this.props.user.profilePic} className={`${PostCSS.profilePic} float-start`} alt="profile pic"/>
    
                        <span className={`float-start ms-3 mt-3 fw-bold`}>{this.props.post.fkUserName}</span>
    
                    </div>
                    <div className="col-md-2 my-auto fw-bold">
                    <span className="">{this.state.postStatus}</span>
                    </div>
                    <div className="col-md-4">
                        <button type="button" className={`${PostCSS.button} btn mt-3`}  onClick={ (e) => this.handleClickBorrowTool(e, this.props.post.id) }>Borrow Tool</button>
                    </div>
    
                    <div className="col-md-8">
                        <img className={`${PostCSS.postImg}`} src={this.props.media[0].link}></img>
                    </div>
    
                    <div className="col-md-4">
                        <div>
                            <h5 className={`mt-3`}>{this.props.post.postTitle}</h5>
                            <div className={`ms-3 ${PostCSS.descriptionBox}`}>
                                <h6 className={`mt-2`}><u>Tool Description</u></h6>
                                <p className={`ms-2`}>{this.props.post.postDesc}</p>
                            </div> 
                        </div>
                        <a target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${this.props.location.lat},${this.props.location.lng}`} ><button type="button" className={`btn ${PostCSS.button} mt-2 mb-2`}>Location on Map</button></a>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainPostComponent;