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
const favoriteBlog=(blogs)=>{
    const myobj={}
    if (blogs.length === 0) {
        return 0;
      }
      if (blogs.length === 1) {
        
         myobj.title=blogs[0].title
         myobj.author= blogs[0].author
         myobj.likes=blogs[0].likes
         return myobj

      } else {
        let maxvalues=0
        for(let i=0;i<blogs.length;i++){
          if(blogs[i].likes>maxvalues){
            maxvalues=blogs[i].likes
            
          }
        }
        blogs= blogs.filter(x=>x.likes===maxvalues)
        myobj.title=blogs[0].title
        myobj.author= blogs[0].author
        myobj.likes=blogs[0].likes
        return myobj

      }
}
module.exports = { dummy, totalLikes,favoriteBlog };
