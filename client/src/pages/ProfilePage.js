import React from 'react';
import ProfileCSS from "./ProfilePage.module.css"
import auth from '../services/auth';
import ListingPostComponent from '../components/ListingPost';
import BorrowingPostComponent from '../components/BorrowingPost';

function ProfilePage(props) {


    return (
        <div className={`container`}>
            
            <div className={` justify-content-center text-center ${ProfileCSS.card}`}>
            <div className="p-5 row g-3">
                <div className="col-md-3">

                </div>
                <div className="col-md-6 text-white">
                        <img src={props.info.profilePic} className={`${ProfileCSS.profilePic}`} alt="profile pic"/>
                </div>
                <div className="col-md-3">

                </div>
                </div>

                    <p style={{color: "rgb(2, 141, 2)"}}>Username: <span className="text-black">{props.info.userName}</span></p>
                    <p style={{color: "rgb(2, 141, 2)"}}>First Name: <span className="text-black">{props.info.fName}</span></p>

                    <p style={{color: "rgb(2, 141, 2)"}}>Last Name: <span className="text-black">{props.info.lName}</span></p>

                    <p style={{color: "rgb(2, 141, 2)"}} >Email: <span className="text-black">{props.info.email}</span></p>

                </div>

                {/* <form onSubmit={props.onSubmit} className="row w-100"> */}
                <form className="row w-100">

                    <div className="col-md-3"></div>
                    <div className="col-md-6 mt-3">
                    <select className="form-select" aria-label="Default select example" onChange={props.onChange} id="selector">
                        <option selected disabled>Choose to view your listings or borrowings</option>
                        <option value="listing">Listings</option>
                        <option value="borrowing">Borrowings</option>
                    </select>
                    </div>
                    {/* <div className="col-md-2"></div> */}
                    <div className="col-md-3"></div>


                </form>

        </div>

    );
}



class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: auth.user,
            posts: [],
            loading: true,
            selectedOption: ""
        }


        //this.handleSubmit= this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        e.preventDefault()
        console.log(e.target.value)
        let option = e.target.value

        this.setState({selectedOption: option})

        if(option === "listing"){
            fetch("/api/posts/getByUser/" + this.state.userInfo.userName)
            .then(res => res.json())
            .then(post => {
                
                // console.log(post);
                let posts =post.map((p,ii) => <ListingPostComponent {...p} key={ii}  user={this.state.userInfo}/>)
                this.setState({
                    posts: posts,
                    loading: false,
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({loading: false})
            });
        }else{
            fetch("/api/posts/borrowing/" + this.state.userInfo.userName)
            .then(res => res.json())
            .then(post => {
                
                // console.log(post);
                if(post){
                    this.setState({
                        posts: post.map((p,ii) => <BorrowingPostComponent {...p} key={ii} />),
                        loading: false,
                    });
                }else{
                    this.setState({posts: []})
                }
                
            })
            .catch(err => {
                console.log(err);
                this.setState({loading: false})
            });
        }
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
            <div className="container-fluid text-center">
                <div className="row justify-content-center">
                    <ProfilePage info={this.state.userInfo} onChange={this.handleChange}/>
                
                    <div className="row justify-content-center mt-5">
                        {this.state.posts}
                    </div>
                        
                    
                    
                </div>
            </div>
        )
    }


}

export default Profile;