import NeeMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";
function NewMeetup() {
  const router = useRouter();
  async function addMeetUpHandler(enterdMeetUpData) {
    console.log(enterdMeetUpData);
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enterdMeetUpData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    router.push("/");
  }
  return (
    <Fragment>
      <Head>
        <title>React meetups</title>
      </Head>
      <NeeMeetupForm onAddMeetup={addMeetUpHandler} />
    </Fragment>
  );
}
export default NewMeetup;
