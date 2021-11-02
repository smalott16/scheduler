import React from 'react';
import useVisualMode from 'hooks/useVisualMode'
import './styles.scss';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';


export default function Appointment(props) {
  const { time, id, interview, interviewers, bookInterview, cancelInterview } = props;
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const CONFIRM = "CONFIRM"
  const DELETING = "DELETING"
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"

  const { mode, transition, back} = useVisualMode(interview ? SHOW : EMPTY);

  const getInterviewerName = (interviewerID) => {
    for (let interviewer of interviewers) {
      if (interviewerID === interviewer.id) {
        return interviewer.name;
      }
    }
  }
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
  
    bookInterview(id, interview)
      .then(() => {
        transition(SHOW);
      }) 
      .catch((err) => {
        console.log("appointment save error", err.message)
        transition(ERROR_SAVE, true);
      });
   
  }
  
  function deleteInterview(id) {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((err) => {
        console.log("appointment destroy error", err.message)
        transition(ERROR_DELETE, true);
      })
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
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CONFIRM && <Confirm 
        message="Are you Sure You Want to Delete?" 
        onConfirm={() => deleteInterview(id)}
        onCancel={() => back()}
        />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CREATE && (
        <Form 
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save} 
          student={interview.student}
          interviewer={interview.interviewer}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Saving Error" onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Delete Error" onClose={() => back()} />
      )}
    </article>
  );
};