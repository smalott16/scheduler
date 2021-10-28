import React from 'react'
import InterviewerListItem from './InterviewerListItem';
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const { interviewers, value, onChange} = props;

  const interviewerInfo = interviewers.map((interviewer) => {
    return (
      <InterviewerListItem 
        name={interviewer.name}
        key={interviewer.id}
        avatar={interviewer.avatar}
        selected={interviewer.id === value}
        setInterviewer={() => onChange(interviewer.id)}
      />
    );
  }); 

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerInfo}    
      </ul>
    </section>
  );
}