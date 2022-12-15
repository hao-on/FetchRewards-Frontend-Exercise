import "./FormInput.css";
const FormInput = (props) => {
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  return (
    <div className="col-md-12 form-floating">
      <input className="form-control" {...inputProps} onChange={onChange} />
      <label htmlFor={id} className="form-label px-3">
        {label}
      </label>
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
