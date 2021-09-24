const db = require('./models');
const { Post, Location, Media, Comment, User, Category } = db;
const seed = require('./seed');
const {
      associateUserToPosts,
      associateBorrowerToPosts
    } = require('./testQueries')

describe('Testing the Models', () => {
    beforeAll(() => {
      return seed();
    })

   

    // User.findByPk("okeson0")
    // .then((user)=>{
    //     console.log(user)
    // })

    test('Associate user okeson to posts', async () => {
        const user = await associateUserToPosts()
        const associations = await user.getPosts()

        expect(associations.length).toBe(3)
    })

    test('Associate borrower', async () => {
        const posts = await associateBorrowerToPosts()
    })
})