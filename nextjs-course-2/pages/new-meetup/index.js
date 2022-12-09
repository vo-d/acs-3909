// our-domain.com/new-meetup
import { useRouter } from "next/router";
import { Fragment } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head";

function NewMeetupPage(){
    const router = useRouter();
    async function addMeetupHander(enterMeetupData){
       const response = await fetch('/api/new-meetup', {
        method: 'POST',
        body: JSON.stringify(enterMeetupData),
        headers: {
            'Content-Type':'application/json'
        }
       })

       const data = await response.json()
       console.log(data)
       router.push('/')
    }

    return (
    <Fragment>
        <Head>
            <title>Add a New Meetups</title>
            <meta name="description" content='Add your own meetups and create amazing networking opportunities.'></meta>
        </Head>
      
        <NewMeetupForm onAddMeetup={addMeetupHander}/>

    </Fragment>)
}

export default NewMeetupPage;