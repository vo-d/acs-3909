// our-domain.com/new-meetup
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage(){
    function addMeetupHander(enterMeetupData){
        console.log(enterMeetupData)
    }

    return <NewMeetupForm onAddMeetup={addMeetupHander}/>
}

export default NewMeetupPage;