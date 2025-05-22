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
    const userCollection = client.db("usersDB").collection("users");

    app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray()
      res.send(result)
    })


    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log("New User: ", user)
      const result = await userCollection.insertOne(user);
      res.send(result)
    })

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      console.log("Please delete from db", id)

      const query = { _id: new ObjectId(id) }
      const result = await userCollection.deleteOne(query)
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


// devsujoydas
// mongodbdevsujoydas