const Alert = (props) => {
  const { type, message } = props;

  return (
    <div className={`alert ${type} alert-dismissible fade show`} role="alert">
      <strong>{message}</strong>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default Alert;
