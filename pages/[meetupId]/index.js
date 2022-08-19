import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
function MeetupDetails(props) {
  return (
    <MeetupDetail
      image={props.meetUpData.image}
      title={props.meetUpData.title}
      address={props.meetUpData.address}
    />
  );
}
export async function getStaticPaths(context) {
  const client = await MongoClient.connect(
    "mongodb+srv://Ubaid:@cluster0.m6skkby.mongodb.net/meetup?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetUpCollection = db.collection("meetup");
  const meetups = await meetUpCollection.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://Ubaid:@cluster0.m6skkby.mongodb.net/meetup?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetUpCollection = db.collection("meetup");
  const selectedMeetup = await meetUpCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetUpData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}
export default MeetupDetails;
