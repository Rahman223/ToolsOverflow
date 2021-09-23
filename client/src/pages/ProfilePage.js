import React from 'react';
import ProfileCSS from "./ProfilePage.module.css"

function ProfilePage(props) {


    return (
        <div className={`container`}>
            
            <div className={`pt-4 justify-content-center text-center ${ProfileCSS.card}`}>
            <div className="p-5 row g-3">
                <div className="col-md-3">

                </div>
                <div className="col-md-6 text-white">
                        {/* <img src={props.info.profilePic} className={`${ProfileCSS.profilePic}`} alt="profile pic"/> */}
                        <img src="https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg" className={`${ProfileCSS.profilePic}`} alt="profile pic"/>
                </div>
                <div className="col-md-3">

                </div>
                </div>

                
                    {/* <p className='text-warning'>First Name: <span className="text-white">{props.info.fName}</span></p>

                    <p className='text-warning'>Last Name: <span className="text-white">{props.info.lName}</span></p>
        
                    <p className='text-warning'>Email: <span className="text-white">{props.info.email}</span></p>
                
                    <p className='text-warning'>Birth Date: <span className="text-white">{props.info.birthDate}</span></p> */}
                    <p className='text-warning'>Username: <span className="text-black">Username</span></p>
                    <p className='text-warning'>First Name: <span className="text-black">First Name</span></p>

                    <p className='text-warning'>Last Name: <span className="text-black">Last Name</span></p>

                    <p className='text-warning'>Email: <span className="text-black">example@gmail.com</span></p>

                </div>

        </div>

    );
}



class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // userInfo: auth.user,
            posts: [],
            loading: true,
        }


        //this.handleSubmit= this.handleSubmit.bind(this);
        //this.handleCancle= this.handleCancle.bind(this);
    }

    // componentDidMount() {
    //     //const { id } = this.props.match.params;

    //     // console.log(this.state.userInfo);

    //     fetch("./api/posts/getByUser/" + this.state.userInfo.userName)
    //         .then(res => res.json())
    //         .then(post => {
                
    //             console.log(post);
    //             this.setState({
    //                 posts: post,
    //                 loading: false,
    //             });
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             this.setState({loading: false})
    //         });
    // }

    render() {
        // if (this.state.loading) return <Loading />
        return (
            <div>
                <div>
                    <ProfilePage info={this.state.userInfo} />
                </div>
            </div>
        )
    }


}

export default Profile;