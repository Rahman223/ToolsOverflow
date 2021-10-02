const db = require('./models');
const { Post, Location, Media, User, Comment, Category } = db;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

async function associateUserToPosts(){
    const usr = await User.findByPk("hpendry1")
    const user = await User.findByPk("okeson0")
    const user2 = await User.findByPk("fsegebrecht4")
    
    // console.log(user)
    // console.log(user2)
    // console.log(usr)

    const posts = await Post.findAll({where: {id : {[Op.in] : [1,3,5]} } }) 
    const posts2 = await Post.findAll({where: {id : {[Op.in] : [2,4]} } }) 


    // posts2.forEach(post => {
    //     console.log(post)
    // });

    await user.setPosts([...posts])
    await user2.setPosts([...posts2])

    return user
    
}

//getting two users and setting them to be the borrower of two sets of posts
async function associateBorrowerToPosts(){
    const usr = await User.findByPk("hpendry1")
    const usr2 = await User.findByPk("vmeagh3")
    // console.log(usr)

    const posts = await Post.findAll({where: {id : {[Op.in] : [3,5]} } }) 
    const posts2 = await Post.findAll({where: {id : {[Op.in] : [4]} } })
    
    posts.forEach(post => {
        console.log(post)
        usr.setPost(post) //putting usr's userName to the respective post as borrowerId 
    });

    posts2.forEach(post =>{
        usr2.setPost(post)
    })

    return posts;

}

module.exports ={
    associateUserToPosts,
    associateBorrowerToPosts
};