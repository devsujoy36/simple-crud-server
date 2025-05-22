const express = require('express');
const cors = require('cors');

const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = "mongodb+srv://devsujoydas:mongodbdevsujoydas@cluster0.f1vo05q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const userModel = client.db("usersDB").collection("users");


    app.post("/adduser", async (req, res) => {
      const user = req.body;
      const result = await userModel.insertOne(user);
      res.send(result)
    })

    app.get("/users", async (req, res) => {
      const result = await userModel.find().toArray()
      res.send(result)
    })

    app.get("/users/:id", async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const user = await userModel.findOne(query)
      res.send(user)
    })

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await userModel.deleteOne(query)
      res.send(result)
    })

    app.put("/user/:id", async (req, res) => {
      const id = req.params.id;
      const user = req.body;
      const query = { _id: new ObjectId(id) }
      const options = { upsert: true }
      const updatedUser = {
        $set: {
          name: user.name,
          username: user.username,
          email: user.email,
          password: user.password,
        }
      }
      const result = await userModel.updateOne(query, updatedUser, options)
      res.send(result)
    })



    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }
  finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("server running")
})

app.listen(port, () => {
  console.log(`server is running on port: ${port}`)
})
