import React from 'react';
import PostCSS from './Post.module.css'
import Alert from 'react-bootstrap/Alert'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';


class BorrowingPostComponent extends React.Component{
    constructor(props){
        super(props)

        this.state ={
            success: false,
            successAlert: "",
            notAllowed: false,
            notAllowedAlert: "",
            postStatus: this.props.post.postStatus,

        }
    }


    successAlert(){
        if (this.state.success) {
            return (
              <Alert variant="success" onClose={() => this.setState({success: false})} dismissible>
                <CheckCircleOutlineIcon className="float-start" style={{color: "green", fontSize:"30"}}/> <strong className="float-start ms-4">You have picked up the tool.</strong>
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
                <WarningAmberIcon className="float-start" style={{color:"red", fontSize: "30" }}/> <strong className="float-start ms-4">Either you have already picked up or returned the tool.</strong>
              </Alert>
            );
        }else{
            return <></>
        }
    
    }




    handlePickedUpClick(e,id){
        fetch("/api/posts/pickUp/" + id,{
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
                    postStatus:"Picked Up"})
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


//"https://cdna.artstation.com/p/assets/images/images/040/322/720/large/florin-iasinovschi-angle-grinder-01.jpg?1628523216"


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
                {notAllowed}
                {success}
            <div className="row g-0">
                <div className="col-md-6 mt-2">
                    <img src={this.props.user.profilePic} className={`${PostCSS.profilePic} float-start`} alt="profile pic"/>
                    <span className={`float-start ms-3 mt-3 fw-bold`}>{this.props.user.userName}</span>

                </div>
                <div className="col-md-2 my-auto fw-bold">
                    {postStatus}
                </div>
                <div className="col-md-4">
                    <button type="button" className={`${PostCSS.button} btn mt-3`} onClick={e => this.handlePickedUpClick(e, this.props.post.id)}>Picked Up</button>
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
                    <a href=""><button type="button" className={`btn ${PostCSS.button} mt-3`}>Location on Map</button></a>
                </div>
            </div>
        </div>
        );
    }
}

export default BorrowingPostComponent;