import React ,{ useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';


export default function Form(props) {
  //note although interviewer and student are passed in as props, we cant include them in the object destructureing
  //because js will say we are declaring it twice. We therefore have to access them through props.student or props.interviewer
  const { interviewers, onSave, onCancel } = props;
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setStudent(() => "");
    setInterviewer(() => null);
  }

  const cancel = () => {
    reset();
    onCancel();
  }
  
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={student}
            placeholder="Enter Student Name"
            onChange={(event) => setStudent(event.target.value)}
            onSubmit={(event) => event.preventDefault()}
          />
        </form>
        <InterviewerList 
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={()=>cancel()}>Cancel</Button>
          <Button confirm onClick={onSave}>Save</Button>
        </section>
      </section>
    </main>
  );
}