import React from 'react';
import PostCSS from './Post.module.css'
import Alert from 'react-bootstrap/Alert'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

class ListingPostComponent extends React.Component{
    constructor(props){
        super(props)

        this.state={
            success: false,
            successAlert: "",
            notAllowed: false,
            notAllowedAlert: "",
            postStatus: this.props.post.postStatus
        }
        
        this.handleReturnedClick = this.handleReturnedClick.bind(this)
    }


    successAlert(){
        if (this.state.success) {
            return (
              <Alert variant="success" onClose={() => this.setState({success: false})} dismissible>
                <CheckCircleOutlineIcon className="float-start" style={{color: "green", fontSize:"30"}}/> <strong className="float-start ms-4">You have indicated that your tool has been returned.</strong>
              </Alert>
            );
        }else{
            return <></>
        }
    }

    notAllowedAlert(){
        if (this.state.notAllowed) {
            return (
              <Alert variant="danger" onClose={() => this.setState({notAllowed: false})} dismissible>
                <WarningAmberIcon className="float-start" style={{color:"red", fontSize: "30" }}/> <strong className="float-start ms-4">Either tool is already returned or it has not been picked up yet, it cannot be marked as returned at the moment.</strong>
              </Alert>
            );
        }else{
            return <></>
        }
    
    }

    handleReturnedClick(e,id){
        fetch("/api/posts/returned/" + id,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
                mode: 'same-origin'
            })
            .then(res => {
                let status = res.status

                if(status === 200){
                    this.setState({success: true})
                    let alert = this.successAlert()
                    this.setState({successAlert: alert,
                    postStatus: "Returned"})
                }

                if(status === 405){
                    this.setState({notAllowed: true})
                    let alert = this.notAllowedAlert()
                    this.setState({notAllowedAlert: alert})
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({loading: false})
            });
    }

    render(){

        let success =""
        if(this.state.success === true){
            success = this.state.successAlert
        }else{
            success = <></>
        }

        let notAllowed =""
        if(this.state.notAllowed === true){
            notAllowed = this.state.notAllowedAlert
        }else{
            notAllowed = <></>
        }

        let postStatus = this.state.postStatus
        return(
            <div className={`card mb-3 ${PostCSS.card} pt-2`}>
                {success}
                {notAllowed}
            <div className="row g-0">
                <div className="col-md-6 mt-2">
                    <img src={this.props.user.profilePic} className={`${PostCSS.profilePic} float-start`} alt="profile pic"/>
                    <span className={`float-start ms-3 mt-3 fw-bold`}>{this.props.user.userName}</span>

                </div>
                <div className="col-md-2">

                </div>
                <div className="col-md-4">
                    <h5 className={`mt-3 fw-bold`}>Status: <span>{postStatus}</span></h5>
                </div>

                <div className="col-md-8">
                    <img className={`${PostCSS.postImg}`} src={this.props.media[0].link}></img>
                </div>

                <div className="col-md-4">
                {/* <div class="vr float-start ms-4 h-100 mt-2 mb-5"></div> */}
                    <div>
                        <h5 className={`mt-3`}>{this.props.post.postTitle}</h5>
                        <div className={`ms-3 ${PostCSS.descriptionBox}`}>
                            <h6 className={`mt-2`}><u>Tool Description</u></h6>
                            <p className={`ms-2`}>{this.props.post.postDesc}</p>
                        </div> 
                    </div>
                    <button type="button" className={`btn ${PostCSS.button} mt-3 mb-2`} onClick={e =>this.handleReturnedClick(e, this.props.post.id)}>Returned</button>
                </div>
            </div>
        </div>
        );
    }
}

export default ListingPostComponent;