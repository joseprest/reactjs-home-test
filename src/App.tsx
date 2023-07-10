import styled from "@emotion/styled/macro";
import { useState, useEffect } from "react";
import Spinner from "./components/Spinner";
import ErrorMessage from "./components/ErrorMessage";
import Form from "./components/Form";
import Label from "./components/FormLabel";
import { register } from "./authProvider";
import { useAsync } from "./utils/hooks";
import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";
import {
  getRegionStates,
  getAccessApiToken,
  getRegionCities,
} from "./api/region";
import { getValue } from "./utils/localStorage";

const AccessTokenKey = "__access_api_token__";
const cityUrl = "https://www.universal-tutorial.com/api/cities";

const nonExistToken = () => {
  const token = getValue(AccessTokenKey);
  return token ? false : true;
};

function App() {
  const { isLoading, isError, error, run } = useAsync();
  const [choosedState, setState] = useState("");
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  useEffect(() => {
    const noToken = nonExistToken();
    console.log("noToken: ", noToken);
    if (noToken)
      getAccessApiToken().then(() =>
        getRegionStates().then((data) => {
          setStateOptions(data);
          setState(data[0]["state_name"]);
        }),
        err => alert("Error occured!" + err.message)
      );
    else
      getRegionStates().then((data) => {
        setStateOptions(data);
        console.log(data[0])
        setState(data[0]["state_name"]);
      },
      err => alert("Error occured!" + err.message)
      );
  }, []);

  useEffect(() => {
    if (choosedState !== "")
      getRegionCities(`${cityUrl}/${choosedState}`).then((data) =>
        setCityOptions(data),
        err => alert("Error occured!" + err.message)
      );
  }, [choosedState]);

  const handleChange = (e: any) => {
    e.preventDefault();
    const state = e.target.value;
    setState(state);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const { firstname, lastname, state_name, city_name, email, password } =
      event.target.elements;
    run(
      register({
        firstname: firstname.value,
        lastname: lastname.value,
        state: state_name.value,
        city: city_name.value,
        email: email.value,
        password: password.value,
      })
    );
  };

  return (
    <RegisterForm>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="firstname">Firstname</Label>
          <FormInput name="firstname" required />
        </div>
        <div>
          <Label htmlFor="lastname">Lastname</Label>
          <FormInput name="lastname" required />
        </div>
        <div>
          <Label htmlFor="State">State</Label>
          <FormSelect
            name="state_name"
            data={stateOptions}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="City">City</Label>
          <FormSelect name="city_name" data={cityOptions} />
        </div>
        <div>
          <Label htmlFor="Email">Email</Label>
          <FormInput type="email" name="email" required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <FormInput name="password" type="password" required />
        </div>
        <div>
          <Btn type="submit" value="Sign up">
            {isLoading ? <Spinner /> : null}
          </Btn>
        </div>
        {isError ? <ErrorMessage error={error} /> : null}
      </Form>
    </RegisterForm>
  );
}

const Btn = styled.input({
  backgroundColor: "rgb(43,108,176)",
  paddingLeft: "16px",
  paddingRight: "16px",
  paddingTop: "8px",
  paddingBottom: "8px",
  fontWeight: "700",
  borderRadius: "4px",
  color: "white",
  border: "none",
  marginTop: "20px",
  cursor: "pointer",
});

const RegisterForm = styled.div({
  maxWidth: "320px",
  margin: "80px auto",
});

export default App;
