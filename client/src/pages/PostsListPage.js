import React from 'react';
import Loading from '../components/Loading';
import MainPostComponent from '../components/MainPost';
import CreatePostCSS from './CreatePost.module.css'
const toolsCatsData = require('../ToolsCategories.json')

function Form(props){
  return(
    <div className="container">
       <div className="d-flex justify-content-center h-100">
       <form onSubmit={props.onSubmit} className="row w-100">
        <div className="col-md-2"></div>
        <div className="col-md-6 ms-3 ">
          <div className={`form-group`}>
            <label htmlFor="catSelector"><u>Filter tools by categories.</u></label>
            <select className={`form-select mt-1 ${CreatePostCSS.formInput}`} multiple  size="4"  id="catSelector">
                <option value="all">Show All</option>
                {[...props.toolsCats]}
            </select>
            <p className="fs-6 lh-1 mt-1">Hold down Ctrl (windows) or Command (Mac) to select multiple options.</p>
          </div>
        </div>

        <div className="col-md-2 pe-5  my-auto pb-2">
          <div className={`form-group`}>
              <input type="submit" value="Filter" className={`btn ${CreatePostCSS.createButton}`} />
          </div>
        </div>
        <div className="col-md-2"></div>
        

       

       </form>
       </div>
    </div>
  )
}

class PostsListPage extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      posts: [],
      loading: false,
      postCats: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
 
  
  handleSubmit(e){
    e.preventDefault();
    let postCats = Array.from(e.target.catSelector.selectedOptions, option => option.value);
    this.setState({postCats: postCats})

    if(postCats.length ===0){
      fetch("/api/posts/Listed")
      .then(res => res.json())
      .then(posts => {
        this.setState({
          loading: false,
          posts: posts.map((p,ii) => <MainPostComponent {...p} key={ii}/>),
        });
      })
      .catch(err => console.log("API ERROR: ", err));

    }else if(postCats.length === 1){
      if(postCats[0]=== "all"){
        fetch("/api/posts/Listed", {mode: 'same-origin'})
      .then(res => res.json())
      .then(posts => {
        this.setState({
          loading: false,
          posts: posts.map((p,ii) => <MainPostComponent {...p} key={ii}/>),
        });
      })
      .catch(err => console.log("API ERROR: ", err));
      }else{
        let queryString = ""
      queryString = queryString.concat("catNames=")
      queryString = queryString.concat(postCats[0])
      queryString = queryString.concat("&")
      queryString = queryString.concat("catNames= ")

      fetch("/api/posts/categories?"+queryString, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res => res.json())
      .then(posts => {
        console.log(posts)
        this.setState({
          loading: false,
          posts: posts.map((p,ii) => <MainPostComponent {...p} key={ii}/>),
        });
      })
      .catch(err => console.log("API ERROR", err))
      }
      


    }else{
      let queryString = ""
      for(let i=0; i<postCats.length; i++){
        queryString = queryString.concat("catNames=")
        queryString = queryString.concat(postCats[i])
        queryString = queryString.concat("&")
      }
  
      fetch("/api/posts/categories?"+queryString, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res => res.json())
      .then(posts => {
        this.setState({
          loading: false,
          posts: posts.map((p,ii) => <MainPostComponent {...p} key={ii}/>),
        });
      })
      .catch(err => console.log("API ERROR", err))

    }
  


  }

  // componentDidMount() {
  //   if(this.state.postCats.length ===0){
  //     fetch("/api/posts/Listed")
  //     .then(res => res.json())
  //     .then(posts => {
  //       this.setState({
  //         loading: false,
  //         posts: posts.map((p,ii) => <MainPostComponent {...p} key={ii}/>),
  //       });
  //     })
  //     .catch(err => console.log("API ERROR: ", err));

  //   } 
  // }

  render() {
    if(this.state.loading) {
      return <Loading />;
    }

    let toolsCats = toolsCatsData.toolsCategories
        let toolsOptionsArr =[]

    toolsCats.forEach(category =>{
        toolsOptionsArr.push(<option value={category}>{category}</option>)
    })

    return (
      <div className="container-fluid text-center">
        <div className="row justify-content-center">
          <Form onSubmit={this.handleSubmit} toolsCats={toolsOptionsArr}/>
          { this.state.posts }
        </div>
      </div>
    );
  }
}

export default PostsListPage;