import express from "express";
import bodyParser from "body-parser";
import { title } from "process";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res)  => {
    res.render("index.ejs");
});

app.get("/home", (req, res)  => {
    res.render("index.ejs");
});

app.post("/subscribe", (req, res) => {
    const subscriber = req.body["email"];
    console.log(subscriber);
    res.render("index.ejs");
});
const blogArray = [];
app.get("/blog", (req, res) => {
    res.render("blog.ejs");
});

const BlogArray = [];
app.use(express.urlencoded({ extended: true }));
app.post("/createBlog", (req, res) => {
    const BlogInfo = {
        Title : req.body.title,
        Author : req.body.author,
        Desc : req.body.blogDescription,
        Blog : req.body.blogContent,
    };
    BlogArray.push(BlogInfo);
    console.log(BlogArray);
    res.render("blog.ejs", {blogArray : BlogArray});
});

app.post("/deleteBlog/:id", (req, res) => {
    const id = req.params.id;
    blogArray.splice(id, 1);
    res.redirect("/blog");
});


app.get("/editBlog/:id", (req, res) => {
    const id = req.params.id;

    const blog = blogArray[id];

    if (!blog) {
        return res.send("Blog not found");
    }

    res.render("editBlog", { blog, id });
});


app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.listen(port, () => {
    console.log("Listening");
});
