import React from "react";
import Button from "components/Button";
import classNames from "classnames";

export default function Confirm (props) {
  const confirmClass = classNames ("confirm_button", {
    "button__confirm":props.Confirm,
    "button__cancel": props.Cancel
  });

  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">Delete the appointment?</h1>
      <section className="appointment__actions">
        <Button danger onClick={props.onCancel}>Cancel</Button>
        <Button danger onClick={props.onConfirm}>Confirm</Button>
      </section>
    </main>
  )
}