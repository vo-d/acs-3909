import MeetupDetail from "../../components/meetups/MeetupDetail";
import {MongoClient, ObjectId} from 'mongodb'

function MeetupDetails(props){
    return (
        <MeetupDetail image={props.meetupData.image} title={props.meetupData.title} address={props.meetupData.address} description={props.meetupData.description}
        />
    )
}

export async function getStaticProps(context){
    // fetch data for a single meetup
    
    const meetupId = context.params.meetupId;
    console.log(meetupId)

    const client = await MongoClient.connect('mongodb+srv://vo-d3129620:09022002@cluster0.ksuggsl.mongodb.net/?retryWrites=true&w=majority');
    const myCol = client.db('test').collection('meetups')

    const selectedMeetup = await myCol.findOne({_id: ObjectId(meetupId)})
    client.close();
    return{
        props:{
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            }
        }
    }
}
// if you use getStaticProps in a dynamic page, not the home page, not when you're using getServerSideProps, but only when you are using getStaticProps, you need to use getStaticPaths, since it's rendered in the building process
// you need to return an object that describe all the  segment value
// return a key-value pair that lead to the dynamic webpage. So if you have multiple segment, you will then have multiple key-value pair in this nested object
// if fallback: false, then if user go to page that doesn't have supported meetupId in paths, it will throw 404. If it's true, then nextjs will try to render a page using the meetupId
export async function getStaticPaths(){
    const client = await MongoClient.connect('mongodb+srv://vo-d3129620:09022002@cluster0.ksuggsl.mongodb.net/?retryWrites=true&w=majority');
    const myCol = client.db('test').collection('meetups')

    const meetups = await myCol.find({},{_id:1}).toArray();
    client.close();
    return {
        fallback: false,
        paths: meetups.map((meetup) => ({params:{meetupId:meetup._id.toString()}}))
    }
}

export default MeetupDetails;