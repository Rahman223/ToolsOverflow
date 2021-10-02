const db = require("./models");
const { Post, Location, Media, Comment, User, Category } = db;

const Locations = [
  {
    streetAddress: "1890 ocean ave",
    state: "New York",
    city: "Brooklyn",
    zipCode: 11230,
    lat: 63.1257009, 
    lng: 14.5928298,
    apartment: "a3"
  },
  {
    streetAddress: "223 flatbush Ave",
    state: "New Jersey",
    city: "Jersey City",
    zipCode: 12321,
    lat: 39.3433574, 
    lng: 117.3616476,
    apartment: "b3"
  },
  {
    streetAddress: "829 foster ave",
    state: "Washington",
    city: "Seattle",
    zipCode: 32011,
    lat: 31.491169, 
    lng: 120.31191,
    apartment: "5c"
  },
  {
    streetAddress: "719 coney island ave",
    state: "Virginia",
    city: "Washington DC",
    zipCode: 13002,
    lat: 31.5909061,
    lng: 120.4927974,
    apartment: "9u"
  },
  {
    streetAddress: "298 15th ave",
    state: "New York",
    city: "Manhattan",
    zipCode: 40110,
    lat: -8.7552,
    lng: 120.7106,
    apartment: "k9"
  },
];

const Medias = [
  { link: "https://firebasestorage.googleapis.com/v0/b/travelers-log.appspot.com/o/images%2F1018283_web1_web-outdoors.jpeg?alt=media&token=78979d56-0d4d-4b2a-88e5-83405a86e296", postId: 1 },
  { link: "https://firebasestorage.googleapis.com/v0/b/travelers-log.appspot.com/o/images%2F117085_kings_park-1021x580.webp?alt=media&token=c6443315-dbef-4204-81e3-30f7c3a143df", postId: 2 },
  { link: "https://firebasestorage.googleapis.com/v0/b/travelers-log.appspot.com/o/images%2F2_ALDR0430__1_.14.jpg?alt=media&token=67a6aa59-106b-4a74-b239-6f2531a5b45e", postId: 3 },
  { link: "https://firebasestorage.googleapis.com/v0/b/travelers-log.appspot.com/o/images%2FColorado%20Outdoors.jpeg?alt=media&token=8f26e4b1-a1b3-49c6-a053-ef1b0d65d444", postId: 4 },
  { link: "https://firebasestorage.googleapis.com/v0/b/travelers-log.appspot.com/o/images%2Fnew-york-city-cartoon-wall-mural-%5B2%5D-3171-p.jpeg?alt=media&token=043d96f0-c437-4d8f-a1ef-b203bbc451c9", postId: 5 }
];

const Users = [
  {
    userName: "okeson0",
    password: "UB1nRaJCvNNM",
    email: "okeson0@hexun.com",
    fName: "Otes",
    lName: "Keson",
    profilePic: "https://firebasestorage.googleapis.com/v0/b/travelers-log.appspot.com/o/images%2F27276711443_51746feb4c_c.jpeg?alt=media&token=48da388b-5b8c-4754-b1cb-92f48304343f",
  },
  {
    userName: "hpendry1",
    password: "swQ6Zj1YA6",
    email: "hpendry1@google.es",
    fName: "Hannis",
    lName: "Pendry",
    profilePic: "https://firebasestorage.googleapis.com/v0/b/travelers-log.appspot.com/o/images%2FSweet-Images-For-Whatsapp-Profile-Pictures-DP-Photos-Download.jpeg?alt=media&token=d63a669e-aa4f-4533-95ed-5d129fb04563",
  },
  {
    userName: "tlawtey2",
    password: "qf5iEOrDDdLV",
    email: "tlawtey2@oracle.com",
    fName: "Tresa",
    lName: "Lawtey",
    profilePic: "https://firebasestorage.googleapis.com/v0/b/travelers-log.appspot.com/o/images%2Fcat_profile_196806.jpeg?alt=media&token=226d40ba-c1b8-4df3-ba14-f586f3c74bae",
  },
  {
    userName: "vmeagh3",
    password: "ln3Hog2ku9Tr",
    email: "vmeagh3@ebay.co.uk",
    fName: "Vivianna",
    lName: "Meagh",
    profilePic: "https://firebasestorage.googleapis.com/v0/b/travelers-log.appspot.com/o/images%2Fmona-lisa.jpeg?alt=media&token=4a820b95-ad70-499d-b77f-fc117aaf8b3a",
  },
  {
    userName: "fsegebrecht4",
    password: "BH8cPvkYO6",
    email: "fsegebrecht4@macromedia.com",
    fName: "Florinda",
    lName: "Segebrecht",
    profilePic: "https://firebasestorage.googleapis.com/v0/b/travelers-log.appspot.com/o/images%2Fv0caqchbtn741.jpeg?alt=media&token=5c2295c0-19c3-4d34-872f-bdf55b5be0ae",
  },
];

const Posts = [
    {
  
      postTitle: "Awesome woods and creek in Brooklyn (Fake Data)",
      postDesc: "Phasellus in felis. Donec semper sapien a libero. Nam dui.",
      postStatus: "Listed",
      locationId: 1,
    //   fkUserName:"okeson0",
    //   borrowerId: "hpendry1",
    },
    {
  
      postTitle: "Amazing place to see the sunset at Seattle (Fake Data)",
      postDesc:"In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
      postStatus: "Listed",
      locationId: 3,
    //   fkUserName:"hpendry1",
    //   borrowerId: "tlawtey2",
    },
    {
  
      postTitle: "Awesome camping area on the mountains of New Jersey (Fake Data)",
      postDesc: "Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo.",
      postStatus: "Borrowed",
      locationId: 2,
    //   fkUserName:"tlawtey2",
    //   borrowerId: "vmeagh3",
    },
    {
  
      postTitle: "Cool mural in the City of New York (Fake Data)",
      postDesc: "Nullam sit amet turpis elementum ligula",
      postStatus: "Borrowed",
      locationId: 5,
    //   fkUserName:"vmeagh3",
    //   borrowerId: "fsegebrecht4",
    },
    {
  
      postTitle: "Cool little hidden resturant (Fake Data)",
      postDesc: "Morbi ut odio. Cras mi pede, malesuada in",
      postStatus: "Returned",
      locationId: 4,
    //   fkUserName:"fsegebrecht4",
    //   borrowerId: "okeson0",
    },
  ];


// const Categories = [
//   {
//     name: "Beach",
//     desc: "Maecenas rhoncus aliquam lacus.",
//   },
//   {
//     name: "Park",
//     desc:
//       "In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem.",
//   },
//   {
//     name: "Mall",
//     desc:
//       "Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh.",
//   },
//   {
//     name: "Parking Lot",
//     desc:
//       "Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy.",
//   },
//   {
//     name: "Airfield",
//     desc:
//       "In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy.",
//   },
//   {
//     name: "Down Town",
//     desc: "Proin risus.",
//   },
// ];


const seed = async () => {
  await db.sequelize.sync({ force: true });

  // Create all the entries
  await Locations.map((L) => Location.create(L));
  await Users.map((U) => User.create(U));
  await Posts.map((P) => Post.create(P));
  await Medias.map((M) => Media.create(M));
//   await Categories.map(Cat=> Category.create(Cat)) 
};

module.exports = seed;
