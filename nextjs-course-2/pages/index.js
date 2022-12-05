import { Fragment } from 'react';
import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList'

const DUMMY_MEETUP = [
  {
  id: 'm1',
  title: 'A First Meetup',
  image: 'https://en.wikipedia.org/wiki/Italy#/media/File:Matera_from_Piazzetta_Pascoli-2930.jpg',
  address: 'Some address 5, 12454 Some City',
  description: 'This is a first meetup!'
},
{
  id: 'm2',
  title: 'A Second Meetup',
  image: 'https://en.wikipedia.org/wiki/Italy#/media/File:Colosseum_in_Rome,_Italy_-_April_2007.jpg',
  address: 'Some address 10, 1121 Some City',
  description: 'This is a second meetup!'
}
]
function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Meetup List</title>
        <meta
          name='description'
          content='I post about programming and web development.'
        />
      </Head>
      <MeetupList meetups = {DUMMY_MEETUP} />
    </Fragment>
  );
}



export default HomePage;
