const listHelper = require("../utilities/list_helper");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blogs = require("../model/BlogPost");
const api = supertest(app);
beforeEach(async () => {
  await Blogs.deleteMany({});
  const newBlogs = listHelper.intialBlogs.map((blog) => new Blogs(blog));
  const PromiseArray = newBlogs.map((blog) => blog.save());
  await Promise.all(PromiseArray);
});

describe("total like", () => {
  test("empty list is zero", () => {
    const blogs = [];
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(0);
  });
  test("when list has one likes equal the likes of that", () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
      },
    ];
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(7);
  });
  test("of bigger list is calculated right", () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0,
      },
      {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0,
      },
      {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0,
      },
      {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0,
      },
    ];
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
});
describe("favorite likes", () => {
  test("when blogs are empty", () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toEqual(0);
  });
  test("when blogs have only one post", () => {
    const result = listHelper.favoriteBlog([
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
      },
    ]);
    expect(result).toEqual({
      title: "React patterns",
      author: "Michael Chan",
      likes: 7,
    });
  });
  test("when blogs have many pots", () => {
    let myblogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0,
      },
      {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0,
      },
      {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0,
      },
      {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0,
      },
    ];
    const result = listHelper.favoriteBlog(myblogs);
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});
describe("cheking total blogs and types", () => {
  test("total blogs will be", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(listHelper.intialBlogs.length);
  }, 1000000);
  test("application type", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("check if a blog have id property", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });
  test("check if new blog is add", async () => {
    const newBlog = {
      title: "QUit Smoking disscution board",
      author: "kumenger f beyene",
      url: "https://scary-eyeballs-76816.herokuapp.com/",
    };
    await api
      .post("/api/blogs")
      .set({Authorization:"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hemkiLCJpZCI6IjYyOTAwOWE1ZDc1OTZmOWRhY2JjYjc0OSIsImlhdCI6MTY1Mzk2NjE5NywiZXhwIjoxNjUzOTY5Nzk3fQ.wW5CbHjUmBrj85TE1gLe-xfzxpznbmP7JG9rmc0LNuc"})
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(listHelper.intialBlogs.length + 1);
  });
  test("check if new blog add fail if token not sent", async () => {
    const newBlog = {
      title: "QUit Smoking disscution board",
      author: "kumenger f beyene",
      url: "https://scary-eyeballs-76816.herokuapp.com/",
    };
    await api
      .post("/api/blogs").send(newBlog)
      .expect(401)
      .expect("Content-Type", /application\/json/);
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(listHelper.intialBlogs.length);
  })
  test("set likes to zero if missing", async () => {
    const blogsWithMissingLike = new Blogs(listHelper.blogsWithMissingLikes);
    const blogsWithMissingLikes={...blogsWithMissingLike,likes:0}

    const response = await api.post("/api/blogs").set({Authorization:"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hemkiLCJpZCI6IjYyOTAwOWE1ZDc1OTZmOWRhY2JjYjc0OSIsImlhdCI6MTY1Mzk2NjE5NywiZXhwIjoxNjUzOTY5Nzk3fQ.wW5CbHjUmBrj85TE1gLe-xfzxpznbmP7JG9rmc0LNuc"}).send(blogsWithMissingLikes);
    expect(response.body.likes).toBe(0)
  });
  test("chek if  title missing", async () => {
    const newBlog = new Blogs({
      likes: 400,
      author: "me",
      url: "www.google.com",
    });
    await api.post("/api/blogs").send(newBlog).expect(400);
  });
  test("check if  url missing", async () => {
    const newBlog = new Blogs({
      likes: 400,
      author: "me",
      title: "it all about me",
    });
    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});
afterAll(() => {
  mongoose.connection.close();
});
