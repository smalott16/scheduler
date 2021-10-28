## DayList
- props:
  - days(Array)
  - day(String)
  - setDay(Function)
- state: none

## DayListItem:

- props:
  - name(string)
  - spots(number)
  - selected(Boolean)
  - setDay(function)


## InterviewerList
- props:
  - interviewers(array)
  - setInterviewer(function, accepts interviewer id)
  - interviewer(number, represents the id)

## InterviewerListItem
- props:
  - id (number)
  - name (string)
  - avatar (url)
  - selected (boolean)
  - setInterviewer (function)

## Form
- state (tracks state of the interviewers numbered id and the students name)
  - setStudent
  - setInterviewer
- props:
  - student (string)
  - interviewers (array)
  - interviewer (number)
  - onSave (function)
  - onCancel (function)



