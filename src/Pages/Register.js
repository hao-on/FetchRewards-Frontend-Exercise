import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Register.css";
import FormInput from "../Components/FormInput";
import Alert from "../Components/Alert";

function Register() {
  const [data, setData] = useState({ occupations: [], states: [] });
  const initialValues = {
    name: "",
    email: "",
    password: "",
    occupation: "select",
    state: "select",
  };
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const initialValids = {
    name: false,
    email: false,
    password: false,
    occupation: false,
    state: false,
  };
  const [validSet, setValidSet] = useState(initialValids);
  const [formValid, setFormValid] = useState(false);
  const [isSucess, setIsSuccess] = useState(false);

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Full name",
      label: "Full name",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "namw@example.com",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
    },
  ];

  /* Fetch data from API */
  useEffect(() => {
    axios
      .get(`https://frontend-take-home.fetchrewards.com/form`)
      .then((res) => {
        setData(res.data);
      });
  }, []);

  /* Enable Submit button if form is valid */
  useEffect(() => {
    setFormValid(validateForm(validSet));
  }, [validSet]);

  /* Handle change events */
  const onChange = (e) => {
    const { name, value } = e.target;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    switch (name) {
      case "name":
        if (value.length === 0) {
          setErrors({ ...errors, [name]: "Please provide your name!" });
          setValidSet({ ...validSet, [name]: false });
        } else {
          setErrors({ ...errors, [name]: "" });
          setValidSet({ ...validSet, [name]: true });
        }
        break;
      case "email":
        if (value.length < 8 || !emailRegex.test(values.email)) {
          setErrors({
            ...errors,
            [name]: "Please provide a valid email address!",
          });
          setValidSet({ ...validSet, [name]: false });
        } else {
          setErrors({ ...errors, [name]: "" });
          setValidSet({ ...validSet, [name]: true });
        }
        break;
      case "password":
        if (value.length === 0) {
          setErrors({ ...errors, [name]: "Password is requried!" });
          setValidSet({ ...validSet, [name]: false });
        } else if (value.length < 4 || value.length > 10) {
          setErrors({
            ...errors,
            [name]: "Password must have between 8 and 10 characters!",
          });
          setValidSet({ ...validSet, [name]: false });
        } else {
          setErrors({ ...errors, [name]: "" });
          setValidSet({ ...validSet, [name]: true });
        }
        break;
      case "occupation":
        if (value === "select") {
          setErrors({ ...errors, [name]: "Please select an occupation!" });
          setValidSet({ ...validSet, [name]: false });
        } else {
          setErrors({ ...errors, [name]: "" });
          setValidSet({ ...validSet, [name]: true });
        }
        break;
      case "state":
        if (value === "select") {
          setErrors({ ...errors, [name]: "Please select a state!" });
          setValidSet({ ...validSet, [name]: false });
        } else {
          setErrors({ ...errors, [name]: "" });
          setValidSet({ ...validSet, [name]: true });
        }
        break;

      default:
        break;
    }
    setValues({ ...values, [name]: value });
  };

  /* Validate input form */
  const validateForm = (validSet) => {
    for (const property in validSet) {
      if (validSet[property] === false) {
        return false;
      }
    }
    return true;
  };

  /* Reset form after the submission */
  const reset = (initialValues, initialValids) => {
    setValues(initialValues);
    setValidSet(initialValids);
  };

  /* Handle Submit */
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("https://frontend-take-home.fetchrewards.com/form", {
        name: values.name,
        email: values.email,
        password: values.password,
        occupation: values.occupation,
        state: values.state,
      })
      .then(
        (response) => {
          setIsSuccess(true);
          reset(initialValues, initialValids);
          console.log(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <div id="main">
      {isSucess ? (
        <Alert
          type={"alert-success"}
          message={"You have registered successfully!"}
        />
      ) : (
        <></>
      )}
      <div className="container-fluid vertical-center justify-content-center">
        <div className="my-card row g-0">
          <div className="col-12 col-md-6 d-none d-md-block my-image" />
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center">
            <h3>Registration</h3>
            <form
              id="my-form"
              className="row p-4 px-md-5 g-4"
              onSubmit={handleSubmit}
              noValidate
            >
              {inputs.map((input) => (
                <FormInput
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  errorMessage={errors[input.name]}
                  onChange={onChange}
                />
              ))}
              <div className="col-md-6">
                <select
                  className="form-select"
                  id="selectOccupation"
                  name="occupation"
                  value={values.occupation}
                  onChange={onChange}
                  required
                >
                  <option selected disabled value="select">
                    Occupation...
                  </option>
                  {data.occupations.map((occupation) => (
                    <option>{occupation}</option>
                  ))}
                </select>
                <span>{errors.occupation}</span>
              </div>
              <div className="col-md-6">
                <select
                  className="form-select"
                  id="selectState"
                  name="state"
                  value={values.state}
                  onChange={onChange}
                  required
                >
                  <option selected disabled value="select">
                    State...
                  </option>
                  {data.states.map((state) => (
                    <option>{state.name}</option>
                  ))}
                </select>
                <span>{errors.state}</span>
              </div>
              <div className="d-grid mt-5 align-item-center">
                <button
                  type="submit"
                  className="btn btn-dark"
                  disabled={!formValid}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
