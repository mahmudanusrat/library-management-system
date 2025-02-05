require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser')
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:5176',
    'https://library-management-72d8f.web.app',
    'https://library-management-72d8f.firebaseapp.com'
  ],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

const verifyToken = (req,res,next)=>{
  const token = req?.cookies?.token;
  if(!token){
    return res.status(401).send({message:'Unauthorized access'})
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,decoded)=>{
    if(err){
    return res.status(401).send({message:'unauthorized access'})
    }
  })
  req.user = decoded;
  next();
}

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u87o4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const bookCollection = client.db("booksDb").collection("book");
    const borrowedBooksCollection = client
      .db("booksDb")
      .collection("borrowedBooks");

    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "24h" });
      res
      .cookie('token',token, cookieOptions).send({success: true});
    });
    app.post('/logout',(req, res) => {
      res
      .clearCookie("token", { ...cookieOptions, maxAge: 0 })
      .send({ success: true });
     });

    app.get("/book", async (req, res) => {
      const { category } = req.query;
      const query = category ? { category: category } : {};
      const result = await bookCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/book", async (req, res) => {
      const newBook = req.body;
      const result = await bookCollection.insertOne(newBook);
      res.send(result);
    });

    app.get("/book/:id", async (req, res) => {
      const id = req.params.id;
      const result = await bookCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.put("/book/:id", async (req, res) => {
      const id = req.params.id;
      const updatedBook = req.body;
      const result = await bookCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedBook }
      );
      res.send(result);
    });

    app.get("/categories", async (req, res) => {
      const categories = await bookCollection
        .aggregate([{ $group: { _id: "$category" } }])
        .toArray();
      const categoryList = categories.map((c) => c._id);
      res.send(categoryList);
    });

    app.get("/borrowedBooks",verifyToken,async (req, res) => {
      const {email} = req.query;
      if(req.user.email !== req.query.email){
        return res.status(403).send({message: 'forbidden access'});
      }
      const result = await borrowedBooksCollection
        .find({ userEmail: email })
        .toArray();

      res.send(result);
    });

    app.post("/borrowedBooks", async (req, res) => {
      const borrowData = req.body;
      const book = await bookCollection.findOne({
        _id: new ObjectId(borrowData.bookId),
      });

      borrowData.bookName = book.bookName;
      borrowData.category = book.category;
      borrowData.bookImage = book.bookImage;
      borrowData.borrowedDate = new Date();

      const result = await borrowedBooksCollection.insertOne(borrowData);
      res.send(result);
    });

    // app.put("/borrowedBooks/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const updatedBook = req.body;
    //   const result = await borrowedBooksCollection.updateOne(
    //     { _id: new ObjectId(id) },
    //     { $set: updatedBook }
    //   );
    //   res.send(result);
    // });

    app.delete("/borrowedBooks/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await borrowedBooksCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Library management system server is running");
});

app.listen(port, () => {
  console.log(`Library management system server is running on port ${port}`);
});