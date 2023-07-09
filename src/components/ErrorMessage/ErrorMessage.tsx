interface ErrorMessageProps {
  error: any;
}
const ErrorMessage = ({ error }: ErrorMessageProps) => (
  <div role="alert" style={{ color: "red", display: "inline-block" }}>
    <span>There was an error: </span>
    <pre
      style={{ whiteSpace: "break-spaces", margin: "0", marginBottom: "-5px" }}
    >
      {error.message}
    </pre>
  </div>
);

export default ErrorMessage;