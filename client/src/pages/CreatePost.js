import React from 'react';
import { Redirect } from 'react-router-dom';

// import CreatePostCSS from './CreatePost.module.css'
// import Helmet from 'react-helmet'
// import firebase from '../firebase.js';
// import Map from '../components/Map';
import Loading from '../components/Loading';
import CreatePostCSS from './CreatePost.module.css'
// import Geocode from "react-geocode";
// import auth from '../services/auth';
// const apiKey = process.env.REACT_APP_MAP_API 

// Geocode.setApiKey(apiKey);
// Geocode.enableDebug();




// const bucket = firebase.storage();

function Form (props) {
    return (

                <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div className={CreatePostCSS.card}>
                        <div className="card-body">
                            <form onSubmit={props.onSubmit} className="row g-3">
                                <div className="form-floating col-md-10">
                                    <input type="text" className={`form-control ${CreatePostCSS.formInput}`} id="streetAdd" placeholder="Street Address"/>
                                    <label for="streetAdd">Street Address</label>
                                </div>

                                <div className="form-floating col-md-2">
                                    <input type="text" className={`form-control ${CreatePostCSS.formInput}`} id="zipCode" placeholder="Zip Code"/>
                                    <label for="zipCode">Zip Code</label>
                                </div>

                                <div className="form-floating col-md-4">
                                    <input type="text" className={`form-control ${CreatePostCSS.formInput}`} id="state" placeholder="State"/>
                                    <label for="state">State</label>
                                </div>

                                <div className="form-floating col-md-4">
                                    <input type="text" className={`form-control ${CreatePostCSS.formInput}`} id="city" placeholder="city"/>
                                    <label for="city">City</label>
                                </div>

                                <div className="form-floating col-md-4">
                                    <input type="text" className={`form-control ${CreatePostCSS.formInput}`} id="apt" placeholder="Apartment"/>
                                    <label for="apt">Apartment</label>
                                </div>

                                <div className="form-floating col-md-12">
                                    <input type="text" className={`form-control ${CreatePostCSS.formInput}`} id="title" placeholder="Post Title"/>
                                    <label for="title">Post Title</label>
                                </div>

                                <div className="form-floating col-md-8">
                                    <textarea id="postDesc" className={`form-control ${CreatePostCSS.formInput} ${CreatePostCSS.postDesc}`} placeholder="Post Description"/>
                                    <label for="postDesc">Post Description</label>
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group mt-4">
                                        <input type="file" className={CreatePostCSS.picInput}  id="photoAttachment" accept="image/*" required/>
                                    </div>

                                    <div className={`form-group mt-5 ms-auto me-5`}>
                                        <input type="submit" value="Create Post" className={`btn float-end ${CreatePostCSS.createButton}`} />
                                    </div>

                                </div>
                           
                            </form>
                        </div>
                    </div>
                </div>
                {props.err}
            </div>

    );
}

class CreatePost extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            isCancle : false,
            success : false,
            dataObj :  {    title : " ",
                            city : " ",
                            state : " ",
                            zip : " ",
                            body : " ",
                            link: " ",
                            // user: auth.user,
                            streetAddress: " "
                        }, 
        };


    // this.handleCancle = this.handleCancle.bind(this);
    // this.handleSubmit= this.handleSubmit.bind(this);
    // this.onLocationChange=this.onLocationChange.bind(this);
    }

    // reverseGeoCoding(lat, lng){
    //     Geocode.fromLatLng( lat , lng ).then(
    //         response => {
    //          const address = response.results[0].formatted_address,
    //           addressArray =  response.results[0].address_components
    //           console.table(addressArray)
    //           console.log(address)
              

    //         let city
    //         let state
    //         let zipCode

    //         addressArray.forEach(type => {
                
    //             if(type.types.includes("political") && city === undefined){
    //             city = type.long_name;
    //             }else if(type.types.includes("administrative_area_level_1") && state === undefined){
    //             // console.log(type.long_name)
    //             state = type.long_name;
    //             }else if(type.types.includes("postal_code") && zipCode === undefined){
    //             // console.log(type.long_name)
    //             zipCode = type.long_name;
    //             }
                
    //             if(city !== undefined && state!== undefined && zipCode!== undefined){
    //                 console.log(city)
    //                 console.log(state)
    //                 console.log(zipCode)
    //                 this.setState(prevState => {
    //                     let dataObj = { ...prevState.dataObj };
    //                     dataObj.city = city;
    //                     dataObj.state = state;
    //                     dataObj.zip = zipCode;
    //                     dataObj.lat = lat;
    //                     dataObj.lng = lng;
    //                     dataObj.streetAddress = address.split(",")[0];
            
    //                     return {dataObj}
    //                 })
    //             }
    //         });
        
    //         },
    //         error => {
    //          console.error(error);
    //         }
    //        );
    // }

    // componentDidMount(){
    //     // console.log(this.state.dataObj.user)
    //     navigator.geolocation.getCurrentPosition((position) =>{
    //         console.log("Latitude is :", position.coords.latitude);
    //         console.log("Longitude is :", position.coords.longitude);

    //         this.setState(prevState => {
    //             let dataObj = { ...prevState.dataObj };
    //             dataObj.lat = position.coords.latitude;
    //             dataObj.lng = position.coords.longitude;
    //             return {dataObj}
    //         })

    //         this.reverseGeoCoding(this.state.dataObj.lat , this.state.dataObj.lng);

    //       })
    // }

    // handleSubmit(e){
    //     e.preventDefault();
    //     let title = e.target.postTitle.value;
    //     let lat = e.target.lat.value;
    //     let lng = e.target.long.value;
    //     let city = e.target.city.value;
    //     let state = e.target.state.value;
    //     let zipCode = e.target.zipCode.value;
    //     let body = e.target.body.value;
    //     let file = e.target.photoAttachment.files[0];
    //     let streetAddress = e.target.streetAddress.value;

    //     const uploadTask = bucket.ref(`images/${file.name}`).put(file);
    //     uploadTask.on(
    //         "state_changed",
    //         snapshot =>{},
    //         error =>{
    //             console.log(error);
    //         },
    //         () => {
    //             bucket
    //                 .ref("images")
    //                 .child(file.name)
    //                 .getDownloadURL()
    //                 .then(url => {
    //                     console.log("Url:", url);

    //                     this.setState(prevState => {
    //                         let dataObj = { ...prevState.dataObj };
    //                         dataObj.title = title;
    //                         dataObj.lat = lat;
    //                         dataObj.lng = lng;
    //                         dataObj.city = city;
    //                         dataObj.state = state;
    //                         dataObj.zip = zipCode;
    //                         dataObj.body = body;
    //                         dataObj.link = url;
    //                         dataObj.streetAddress = streetAddress;
                
    //                         return {dataObj}
    //                     })

    //                     // console.log(this.state.dataObj);

    //                     fetch('/api/posts', {
    //                         method: 'POST',
    //                         headers: {
    //                             'Content-Type': 'application/json',
    //                         },
    //                         body: JSON.stringify(this.state.dataObj),
    //                     })
    //                     .then(response => response.json())
    //                     .then(data => {
    //                         console.log('Success:', data);
    //                         this.setState({success: true})
    //                     })
    //                     .catch(error => {
    //                         console.log('Error', error);
    //                     });

    //                 })
    //         }
    //     )
    // }

    // onLocationChange(lat, lng){
    //     this.reverseGeoCoding(lat, lng)
    // }

    // handleCancle(e){
    //     e.preventDefault();
    //     this.setState({
    //         isCancle : true
    //     })
    // }

    render(){
        if(this.state.success) return <Redirect to="/" />;
        if(this.state.isCancle) return  <Redirect to="/" />;

        let pos = this.state.dataObj
       return (
            <div >
                {/* <div className={CreatePostCSS.container}>
                    {pos.lat ? <Map position={pos} onLocationChange={this.onLocationChange}></Map> : <Loading/>}
                </div> */}
                {/* <div>
                    {pos.lat ? <Form OnCancle={this.handleCancle} onSubmit={this.handleSubmit} data={pos}/> : <Loading/>}
                </div> */}
                <div>
                    Select tool location
                </div>
                <div className={`${CreatePostCSS.dummyMap} `}>
                    Dummy Map Component
                </div>

                <Form/>
            </div>
       );
        
    }
}

export default CreatePost;