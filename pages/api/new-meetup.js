import { MongoClient } from "mongodb";
async function handlrer(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    try {
      const client = await MongoClient.connect(
        "mongodb+srv://Ubaid:@cluster0.m6skkby.mongodb.net/meetup?retryWrites=true&w=majority"
      );
      const db = client.db();
      const meetUpCollection = db.collection("meetup");
      const result = await meetUpCollection.insertOne(data);
      console.log(result);
      client.close();
      res.status(201).json({ message: "created" });
    } catch (error) {}
  }
}
export default handlrer;
