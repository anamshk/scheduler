import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form.js";
import Status from "components/Appointment/Status.js";
import Confirm from "components/Appointment/Confirm.js";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const CREATE = "CREATE";
  const SHOW = "SHOW";
  const SAVING = "SAVING";
  const EDIT = "EDIT";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const ERROR_SAVE="ERROR_SAVE";
  const ERROR_DELETE="ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    console.log("HEEEREE");
    transition(SAVING);

    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch((error) => transition(ERROR_SAVE, true));
  }

  function cancel(name, interviewer) {
    console.log("HEEEREE");
    transition(DELETING, true);

    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch((error) => transition(ERROR_DELETE, true));
  }

  return (
    <>
      <Header time={props.time}/> 
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        bookInterview={props.bookInterview}
        onEdit={() => transition(EDIT)} 
        onDelete={() => transition(CONFIRM)}
      />
      )}
      {mode === CREATE && (
        <Form
          bookInterview={props.bookInterview}
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status 
        text="SAVING"
        />
      )}
      {mode === EDIT && (
        <Form
          bookInterview={props.bookInterview}
          onSave={save}
          interviewers={props.interviewers}
          onCancel={() => back(SHOW)}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}
      {mode === DELETING && (
        <Status
          text="DELETING"
        />
      )}
      {mode === CONFIRM && (
        <Confirm
        cancelInterview={props.cancelInterview}
        onConfirm={cancel}
        onCancel={() => back(EDIT)}
        />
      )}

    </>
    
  )
};
