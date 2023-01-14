// Default export a simple Remix React component that lets the user know that the form submission was successful
import { Link } from "@remix-run/react";
export default function FormSubmissionSuccess() {
  return (
    <div className="content-wrapper form-content-wrapper">
      <h1>Form Submission Success</h1>
      <p>
        Your form submission was successful. You can return to the{" "}
        <Link to="/">home page</Link> or continue to:
      </p>

      <ul>
        <li>
          <Link to="/multi-step-form">Multi-Step Form</Link>
        </li>
        <li>
          <Link to="/text-input">Text input</Link>
        </li>
        <li>
          <Link to="/radio">Radio</Link>
        </li>
        <li>
          <Link to="/checkbox-group">Checkbox Group</Link>
        </li>
        <li>
          <Link to="/multi-item-list">Multi-Item List</Link>
        </li>
        <li>
          <Link to="/stateful-radio">Stateful Radio</Link>
        </li>
      </ul>
    </div>
  );
}
