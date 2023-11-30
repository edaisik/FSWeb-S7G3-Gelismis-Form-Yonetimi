import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { FormGroup, Label, Input, FormFeedback, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Form = ({ addMember, member, updateMember }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    termsService: "",
  });

  const [formErrs, setFormErrs] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    termsService: "",
  });

  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (member) {
      setFormData(member);
    } else {
      resetForm();
    }
  }, [member]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (member) {
      updateMember(formData);
    } else {
      axios
        .post("https://reqres.in/api/users", formData)
        .then((res) => {
          console.log(res.data);
          addMember(formData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    Yup.reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setFormErrs({ ...formErrs, [name]: "" });
      })
      .catch((err) => {
        setFormErrs({ ...formErrs, [name]: err.errors[0] });
      });

    setFormData({ ...formData, [name]: value });
  };

  const inputCheckboxHandler = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      surname: "",
      email: "",
      password: "",
      termsService: "",
    });
  };
  const formSchema = Yup.object().shape({
    name: Yup.string().required("İsim boş bırakılamaz!"),
    surname: Yup.string().required("Soyisim boş bırakılamaz!"),
    email: Yup.string().required("Lütfen geçerli bir e-posta adresi giriniz!"),
    password: Yup.string().min(8, "Şifreniz en az 8 karakter içermelidir!"),
    termsService: Yup.boolean().oneOf(
      [true],
      "Kullanım şartlarını kabul etmelisiniz!"
    ),
  });

  useEffect(() => {
    formSchema.isValid(formData).then((valid) => setValid(valid));
  }, [formData, formSchema]);

  return (
    <div className="form">
      <h1 style={{ color: "#2B2A4C" }}>ÜYE EKLE</h1>
      <form onSubmit={submitHandler}>
        <FormGroup>
          <Label for="mail">E-posta</Label>
          <Input
            type="email"
            name="email"
            id="email"
            data-cy="email-input"
            onChange={inputChangeHandler}
            value={formData.email}
            invalid={!!formErrs.email}
          />
          <FormFeedback>{formErrs.email}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="name">İsim</Label>
          <Input
            type="text"
            name="name"
            id="name"
            data-cy="name-input"
            onChange={inputChangeHandler}
            value={formData.name}
            invalid={!!formErrs.name}
          />
          <FormFeedback>{formErrs.name}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="surname">Soyisim</Label>
          <Input
            type="text"
            name="surname"
            id="surname"
            data-cy="surname-input"
            onChange={inputChangeHandler}
            value={formData.surname}
            invalid={!!formErrs.surname}
          />
          <FormFeedback>{formErrs.surname}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="password">Şifre</Label>
          <Input
            type="password"
            name="password"
            id="password"
            data-cy="password-input"
            onChange={inputChangeHandler}
            value={formData.password}
            invalid={!!formErrs.password}
          />
          <FormFeedback>{formErrs.password}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="termsService"> Kullanım Koşulları </Label>
          <Input
            type="checkbox"
            name="termsService"
            id="termsService"
            onChange={inputCheckboxHandler}
            checked={formData.termsService}
            invalid={!!formErrs.termsService}
            data-cy="terms-checkbox"
          />
          <FormFeedback>{formErrs.termsService}</FormFeedback>
        </FormGroup>
        <Button
          type="submit"
          disabled={!valid}
          style={{ marginRight: "2%" }}
          data-cy="submit-button"
        >
          {member ? "Güncelle" : "Ekle"}
        </Button>
        <Button type="button" onClick={resetForm}>
          Formu Sıfırla
        </Button>
      </form>
    </div>
  );
};

export default Form;
