import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  CustomField,
  PasswordField,
  SubmitButton,
} from "../../Component/CustomField";
import { doc, saveToLocalStorage } from "../../static/constant/constant";
import { crypter, stringify } from "../../static/constant/crypt_funct";
import { postData } from "../../static/constant/request";
import url from "../../static/constant/urls";
export default function Login() {
  let navigation = useNavigate();
  async function submit(target) {
    target.preventDefault();
    try {
      setisLoading(true);
      let response = await postData(url.login, {
        user_id: doc("#login").username.value,
        password: doc("#login").password.value,
      });
      if (response.status === 200) {
        saveToLocalStorage("tkopen", crypter(response.data["acces_token"]));
        saveToLocalStorage("wallet", stringify(response.data.wallet));
        saveToLocalStorage("task", stringify(response.data.task));
        saveToLocalStorage("user", stringify(response.data.user));
        navigation("/");
        setisLoading(false);
        return;
      }
      toast.success(response.message);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
    }
  }

  const [isLoading, setisLoading] = useState(false);

  return (
    <section className="login-section">
      <form id="login" onSubmit={submit}>
        <CustomField
          type="text"
          id="username"
          name="Phone"
          required={true}
          placeholder="Username or Email Address"
        />
        <PasswordField
          type="password"
          id="password"
          required={true}
          name="Password"
          placeholder="********"
        />
        <SubmitButton
          isLoading={isLoading}
          className={"text-center"}
          mt={20}
          name="Login"
        />
      </form>
    </section>
  );
}
