import MeetupList from '../components/meetups/MeetupList'

const DUMMY_MEETUP = [
  {
    id: 'm1',
    title: 'A first meetup',
    image:'https://upload.wikimedia.org/wikipedia/commons/c/cd/Matera_from_Piazzetta_Pascoli-2930.jpg',
    address: 'Some adress 5, 123545 Some City',
    description: 'This is a first meetup'
  },
  {
    id: 'm2',
    title: 'A second meetup',
    image:'https://upload.wikimedia.org/wikipedia/commons/5/53/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg',
    address: 'Some adress 10, 33123 Some City',
    description: 'This is a second meetup'
  }
]

function HomePage(props){
  

  return (
      <MeetupList meetups = {props.meetups} />
    )
}

export async function getStaticProps(){
  // fetch data from an API
  return {
    props: {
      meetups: DUMMY_MEETUP
    },
    // getting new data every 10 seconds
    revalidate: 10
  };
}

export default HomePage