import { useState } from "react";
import * as Form from "@radix-ui/react-form";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import  useMailchimpSubscribe  from "../../hooks/useMailchimpSubscribe";
import * as styles from "./styles.module.css";

const url = `https://foundation.us5.list-manage.com/subscribe/post?u=ddc99c7db248c3df0ef4f7d24&amp;id=ebd4f98bd5&amp;f_id=006325ebf0`;
const isFloatingProps = {
  onFocus: (e) => e.target.classList.add(styles.isFloating),
  onBlur: (e) => {
    if (e.target.value === "") {
      e.target.classList.remove(styles.isFloating);
    }
  },
};
const RegisterForm = () => {
  const { subscribe, status, message } = useMailchimpSubscribe(url);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const handleSubmit = async (e) => {
    console.log("submit");
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    if (isCheckboxChecked) data["group[383329][1]"] = isCheckboxChecked;
    Object.keys(data).forEach((key) => {
      if (data[key] === "") {
        delete data[key];
      }
    });
    data.tags = "4280812";
    try{
      const message = await subscribe(formData);
      console.log("Subscription successful:", message);
      window.location.href = "/thank-you";
    }catch(e){
      console.log(e)
    }
  };

  return (
    <Form.Root className={styles.form} onSubmit={handleSubmit} action={`#sign-up`}>
      {status === "error" && (
        <div className={styles.errorWrapper}>
          <p className={styles.errorMsg}>
            {message || "Something went wrong. Please try again."}
          </p>
        </div>
      )}
      <div className={styles.row}>
        <Form.Field className={styles.field} name="FNAME">
          <div className={styles.inputWrapper}>
            <Form.Control
              className={styles.input}
              {...isFloatingProps}
              required
            ></Form.Control>
            <Form.Label className={styles.label}>First Name *</Form.Label>
          </div>
          <Form.Message className={styles.error} match="valueMissing">
            Please enter your first name
          </Form.Message>
        </Form.Field>
        <Form.Field className={styles.field} name="LNAME">
          <div className={styles.inputWrapper}>
            <Form.Control
              className={styles.input}
              {...isFloatingProps}
              required
            ></Form.Control>
            <Form.Label className={styles.label}>Last Name *</Form.Label>
          </div>
          <Form.Message className={styles.error} match="valueMissing">
            Please enter your last name
          </Form.Message>
        </Form.Field>
      </div>
      <Form.Field className={styles.field} name="EMAIL">
        <div className={styles.inputWrapper}>
          <Form.Control
            className={styles.input}
            {...isFloatingProps}
            required
            type="email"
          ></Form.Control>
          <Form.Label className={styles.label}>Email *</Form.Label>
        </div>
        <Form.Message className={styles.error} match="valueMissing">
          Please enter your email
        </Form.Message>
        <Form.Message className={styles.error} match="typeMismatch">
          Please provide a valid email
        </Form.Message>
      </Form.Field>
      <Form.Field className={styles.field} name="GITHUB">
        <div className={styles.inputWrapper}>
          <Form.Control
            className={styles.input}
            {...isFloatingProps}
            required
          ></Form.Control>
          <Form.Label className={styles.label}>GitHub Username *</Form.Label>
        </div>
        <Form.Message className={styles.error} match="valueMissing">
          Please enter your github username
        </Form.Message>
      </Form.Field>
      <div className={styles.checkbox}>
        <Checkbox.Root
          className={styles.checkboxRoot}
          id="c1"
          value={isCheckboxChecked}
          onCheckedChange={(isChecked) => setIsCheckboxChecked(isChecked)}
        >
          <Checkbox.Indicator className={styles.checkboxIndicator}>
            <CheckIcon width="1rem" height="1rem" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label
          className="flex items-center text-primary-lightest-2 text-xs text-left gap-3"
          htmlFor="c1"
        >
          Also subscribe me to the green software foundation newsletter
        </label>
      </div>
      <p className="text-primary-lighter text-xs text-left mb-3">
        * We are using GitHub as the hackathon platform so you must have a valid
        GitHub login and username, if you don't you can create one using <a href="https://github.com/join" target="_blank" rel="noopener noreferrer">this
        link</a>
      </p>
      <Form.Submit asChild>
        <div className="mt-4 flex items-center justify-center">
          <button
            type="submit"
            className="w-fit py-3 px-4 bg-secondary hover:bg-secondary-light text-primary-darkest font-semibold text-sm rounded-md focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary-darkest transition-all duration-300 ease-in-out"
            data-loading={status === "sending"}
            disabled={status === "sending"}
          >
            {status === "sending" ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </Form.Submit>
    </Form.Root>
  );
};

export default RegisterForm;
