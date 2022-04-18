const dummy = (blogs) => {
  return 1;
};
const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  if (blogs.length === 1) {
    return blogs[0].likes;
  } else {
    let sum = 0;
    for (let elem of blogs) {
      sum = elem.likes + sum;
    }
    return sum;
  }
};
const favoriteBlog = (blogs) => {
  const myobj = {};
  if (blogs.length === 0) {
    return 0;
  }
  if (blogs.length === 1) {
    myobj.title = blogs[0].title;
    myobj.author = blogs[0].author;
    myobj.likes = blogs[0].likes;
    return myobj;
  } else {
    let maxvalues = 0;
    for (let i = 0; i < blogs.length; i++) {
      if (blogs[i].likes > maxvalues) {
        maxvalues = blogs[i].likes;
      }
    }
    blogs = blogs.filter((x) => x.likes === maxvalues);
    myobj.title = blogs[0].title;
    myobj.author = blogs[0].author;
    myobj.likes = blogs[0].likes;
    return myobj;
  }
};
const intialBlogs = [
  {
    title: "Welcome to the Big O Notation calculator!",
    author: "shunnarski",
    url: "https://shunnarski.github.io/BigO.html",
    likes: 5000000,
    __v: 0,
  },
  {
    title: "Timing JavaScript Algorithms",
    author: "Daniel N.",
    url: "https://javascript.plainenglish.io/timing-javascript-algorithms-a307e5fdeb8",
    likes: 5000000,
    __v: 0,
  },
  {
    title: "JavaScript Algorithms and Data Structures Masterclass",
    author: "Colt Stell.",
    url: "https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/?persist=&utm_source=adwords&utm_medium=udemyads&utm_campaign=DSA_Catchall_la.EN_cc.US&utm_content=deal4584&utm_term=_._ag_95911180068_._ad_532194018659_._kw__._de_c_._dm__._pl__._ti_dsa-406594358574_._li_9028714_._pd__._&matchtype=&gclid=Cj0KCQjwjN-SBhCkARIsACsrBz5RL-3kUe7SkvnPe--JIyXyHTHTS5OwqJBJaXpTKoC9-AMtOWID5PAaAohbEALw_wcB",
    likes: 9000000,
    __v: 0,
  },
  {
    title: "creating a basic form with Redux Form",
    author: "Jakub Włodarczyk",
    url: "https://medium.com/@wlodarczyk_j/tutorial-creating-a-basic-form-with-redux-form-2f8cd51cd40",
    likes: 50000,
    __v: 0,
  },
];
const blogsWithMissingLikes = {
  title: "kumenger APi implementation",
  author: "kumenger",
  url: "https://shunnarski.github.io/BigO.html",
  
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  intialBlogs,
  blogsWithMissingLikes,
};
