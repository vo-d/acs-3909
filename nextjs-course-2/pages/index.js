import MeetupList from '../components/meetups/MeetupList'
import {MongoClient} from 'mongodb'

function HomePage(props){
  

  return (
      <MeetupList meetups = {props.meetups} />
    )
}
// This will run in the build process
// can also have context parameter, but sometime for that, getServerSideProps is better
export async function getStaticProps(){
  // fetch data from an API
  const client = await MongoClient.connect('mongodb+srv://vo-d3129620:09022002@cluster0.ksuggsl.mongodb.net/?retryWrites=true&w=majority');
  const myCol = client.db('test').collection('meetups');

  const meetups = await myCol.find().toArray();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      }))
    },
    // getting new data every 10 seconds
    revalidate: 1
  };
}

// This will run not on the build process, but after deployment on the server side. Use it when you want to get new data everytime going to the site instead of given time
// no need to revalidate since it run everytime the server receive incoming request. That's why you also have context paramemter that you can use info of the request here.
// better when you want to use the context request object. Maybe to access cookies and session for validation purpose
/* export async function getServerSideProps(context){
  const req = context.req;
  const res = context.res;
  // fetch data from an API
  return{
    props:{
      meetups: DUMMY_MEETUP
    }
  }
} */

export default HomePage