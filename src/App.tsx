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
import { client } from "./utils/ApiClient";
import { getAccessApiToken, getToken } from "./accessProvider";

const cityUrl = "https://www.universal-tutorial.com/api/cities";
const stateUrl = "https://www.universal-tutorial.com/api/states/United States";
const accessTokenUrl = "https://www.universal-tutorial.com/api/getaccesstoken";

const nonExistToken = async () => {
  const token = getToken();
  return token === "" || token === undefined;
};

function App() {
  const { isLoading, isError, error, run } = useAsync();
  const [choosedState, setState] = useState("");
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  useEffect(() => {
    nonExistToken().then(async (flag) => {
      console.log("flag> ", flag)
      if (flag) await getAccessApiToken(accessTokenUrl);
      client(stateUrl).then((data) => setStateOptions(data));
    });
  }, []);

  useEffect(() => {
    if (choosedState !== "")
      client(`${cityUrl}/${choosedState}`).then((data) => setCityOptions(data));
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
          <FormInput name="firstname" placeholder="Firstname" required />
        </div>
        <div>
          <Label htmlFor="lastname">Lastname</Label>
          <FormInput name="lastname" placeholder="Lastname" required />
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
          <FormInput type="email" name="email" placeholder="Email" required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <FormInput
            name="password"
            type="password"
            placeholder="password"
            required
          />
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
