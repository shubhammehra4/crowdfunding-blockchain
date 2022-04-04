import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import "../styles/Form1.css";

const Form1 = () => {
  const [inputValues, setInputValues] = useState({
    Title: "",
    Description: "",
    "Minimum contribution": "",
    "Target Amount": "",
    Deadline: "",
    "Company website link": "",
    "Company ceo name": "",
  });

  return (
    <div className="container mt-3">
      {/* <div className="row">
        <div className="col-md-5">
          <Formik
            initialValues={inputValues}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {(formik) => (
              <div>
                <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>
                <Form>
                  {Object.keys(inputValues).map((item, idx) => {
                    return (
                      <TextField
                        value={inputValues[item]}
                        onChange={(e) =>
                          setInputValues({
                            ...inputValues,
                            [item]: e.target.value,
                          })
                        }
                        placeholder={item}
                        type="text"
                        name={item}
                        key={idx}
                        label={item}
                      />
                    );
                  })}

                  <button className="btn btn-dark mt-3" type="submit">
                    Register
                  </button>
                  <button className="btn btn-danger mt-3 ml-3" type="reset">
                    Reset
                  </button>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      </div> */}
      <FormControl>
        <FormLabel htmlFor="email">Email address</FormLabel>
        <Input id="email" type="email" />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
    </div>
  );
};
export default Form1;
