import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form.js";
import Status from "components/Appointment/Status.js";
import Confirm from "components/Appointment/Confirm.js";
import Error from "./Error";

const EMPTY = "EMPTY";
const CREATE = "CREATE";
const SHOW = "SHOW";
const SAVING = "SAVING";
const EDIT = "EDIT";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const ERROR_SAVE="ERROR_SAVE";
const ERROR_DELETE="ERROR_DELETE";

export default function Appointment(props) {

  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    }
    
    transition(SAVING)
    bookInterview(id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(err => { transition(ERROR_SAVE, true) });
  }

  const confirmDelete = () => {
    transition(CONFIRM);
  }

  const deleteInterview = (id) => {
    transition(DELETING, true);
		cancelInterview(id)
			.then(() => {
				transition(EMPTY);
			})
			.catch((err) => {
				transition(ERROR_DELETE, true);
			});
  }

  const edit = () => {
		transition(EDIT);
  }



  return props.time !== '5pm' ? (
    <>
      <Header time={time}/> 
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
				<Show
					id={id}
					student={interview.student}
					interviewer={interview.interviewer}
					onDelete={() => confirmDelete()}
					onEdit={() => edit()}
				/>
			)}
			{mode === CREATE && (
				<Form
					interviewers={interviewers}
					onCancel={() => back()}
					onSave={save}
				/>
			)}
      {mode === SAVING && (
        <Status 
        text="SAVING"
        />
      )}
      {mode === SAVING && <Status message='Saving' />}
			{mode === DELETING && <Status message='Deleting' />}
			{mode === CONFIRM && (
				<Confirm
					message='Are you sure you want to delete?'
					onCancel={() => back()}
					onConfirm={() => deleteInterview(id)}
				/>
			)}
			{mode === EDIT && (
				<Form
          interviewers={interviewers}
          student={interview.student}
          interviewer={interview.interviewer.id}
          onCancel={() => back()}
          onSave={save}
				/>
			)}
			{mode === ERROR_DELETE && (
				<Error
					message='Error, cant delete Appointment, try again...'
					onClose={() => back()}
				/>
			)}
			{mode === ERROR_SAVE && (
				<Error
					message='Error, cant save Appointment, try again...'
					onClose={() => back()}
				/>
			)}

    </>
    
  ) : <Header time={props.time}/> 
};
