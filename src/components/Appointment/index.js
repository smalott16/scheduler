import React from 'react';
import useVisualMode from 'hooks/useVisualMode'
import './styles.scss';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';

export default function Appointment(props) {
  const { time, id, interview, interviewers } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const { mode, transition, back} = useVisualMode(interview ? SHOW : EMPTY);

  const getInterviewerName = (interviewerID) => {
    for (let interviewer of interviewers) {
      if (interviewerID === interviewer.id) {
        return interviewer.name;
      }
    }
  }

  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          interviewerName={getInterviewerName(interview.interviewer)}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={interviewers}
          onCancel={() => back()}
        />
      )}
    </article>
  );
};