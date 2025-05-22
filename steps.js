/**
 * await client.connect();
 * const userCollection = client.db("usersDB").collection("users")
 * 
 * 
 * -----------------
 * FOR CREATE USER
 * -----------------
 * const result = await userCollection.insertOne(user);
 * 
 * 
 * -----------------
 * FOR READ MANY
 * -----------------
 * const result = await userCollection.find().toArray()
 * 
 * 
 * -----------------
 * FOR DELETE USER
 * -----------------
 * const query = { _id: new ObjectId(id) }
 * const result = await userCollection.deleteOne(query)
 * 
 */



