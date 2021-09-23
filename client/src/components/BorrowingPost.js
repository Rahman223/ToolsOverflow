import React from 'react';
import PostCSS from './Post.module.css'

function BorrowingPost(props){
    return(
        <div className={`card mb-3 ${PostCSS.card}`}>
            <div className="row g-0">
                <div className="col-md-6 mt-2">
                    <img src="https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg" className={`${PostCSS.profilePic} float-start`} alt="profile pic"/>
                    <span className={`float-start ms-3 mt-3`}>Username</span>

                </div>
                <div className="col-md-2">

                </div>
                <div className="col-md-4">
                    <button type="button" className={`${PostCSS.button} btn mt-3`} >Picked Up</button>
                </div>

                <div className="col-md-8">
                    <img className={`${PostCSS.postImg}`} src="https://cdna.artstation.com/p/assets/images/images/040/322/720/large/florin-iasinovschi-angle-grinder-01.jpg?1628523216"></img>
                </div>

                <div className="col-md-4">
                {/* <div class="vr float-start ms-4 h-100 mt-2 mb-5"></div> */}
                    <div>
                        <h5 className={`mt-3`}>Post Title</h5>
                        <div className={`ms-3 ${PostCSS.descriptionBox}`}>
                            <h6 className={`mt-2`}><u>Tool Description</u></h6>
                            <p className={`ms-2`}>this is an angle grinder, it is used to polish out rough surfaces or it can also be used to thin out some material.</p>
                        </div> 
                    </div>
                    <a href=""><button type="button" className={`btn ${PostCSS.button} mt-3`}>Location on Map</button></a>
                </div>
            </div>
        </div>
    );
}

class BorrowingPostComponent extends React.Component{




    render(){
        return(
            <BorrowingPost/>
        );
    }
}

export default BorrowingPostComponent;