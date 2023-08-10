import React from 'react'
import './App.css';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// formda kullanılan başlangıç değerlerini içeren nesne
const initialValues = {
  userType: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  companyName: "",
  companyCode: "",
};

const validationSchema = Yup.object().shape({
  userType: Yup.string().required("Kullanıcı tipini seçiniz."),
  firstName: Yup.string().test("isRequired", "Ad alanı zorunludur.", function (value) {
    return this.parent.userType === "bireysel" || this.parent.userType === "ticari" ? !!value : true; // !!value value değerinin boş olup olmadığını kontrol eder
  }),
  lastName: Yup.string().test("isRequired", "Soyad alanı zorunludur.", function (value) {
    return this.parent.userType === "bireysel" || this.parent.userType === "ticari" ? !!value : true; // true döndüğünde hata vermez
  }),
  email: Yup.string().test("isRequired", "E-posta alanı zorunludur.", function (value) {
    return this.parent.userType === "bireysel" || this.parent.userType === "ticari" ? !!value : true;
  }),
  password: Yup.string().test("isRequired", "Şifre alanı zorunludur.", function (value) {
    return this.parent.userType === "bireysel" || this.parent.userType === "ticari" ? !!value : true;
  })
    .min(8, "Şifre en az 8 karakter olmalıdır."),
  companyName: Yup.string().test("isRequired", "Şirket adı alanı zorunludur.", function (value) {
    return this.parent.userType === "ticari" ? !!value : true;
  }),
  companyCode: Yup.string().test("isRequired", "Şirket kodu alanı zorunludur.", function (value) {
    return this.parent.userType === "ticari" ? !!value : true;
  })
    .length(5, "Lütfen 5 karakterli şitket kodunu girin."),
});


/*
const validationSchema = Yup.object().shape({
  userType: Yup.string().required("Kullanıcı tipini seçiniz."),
  firstName: Yup.string().when("userType", {
    is: "bireysel",
    then: Yup.string().required("Ad alanı zorunludur."),
    otherwise: Yup.string()
  }),
  lastName: Yup.string().when("userType", {
    is: "bireysel",
    then: Yup.string().required("Soyad alanı zorunludur."),
    otherwise: Yup.string()
  }),
  email: Yup.string().when("userType", {
    is: "bireysel",
    then: Yup.string().email("Geçerli bir e-posta adresi giriniz.").required("E-posta alanı zorunludur."),
    otherwise: Yup.string()
  }),
  password: Yup.string().when("userType", {
    is: "bireysel",
    then: Yup.string().required("Şifre alanı zorunludur."),
    otherwise: Yup.string()
  }),
  companyName: Yup.string().when("userType", {
    is: "ticari",
    then: Yup.string().required("Şirket adı alanı zorunludur."),
    otherwise: Yup.string()
  }),
  companyCode: Yup.string().when("userType", {
    is: "ticari",
    then: Yup.string().required("Şirket kodu alanı zorunludur."),
    otherwise: Yup.string()
  }),
});

*/

/* 
userType alanı değeri değiştiğinde çalışır
yeni kullanıcı değerini newUserType olarak tutar ve
formik resetForm metodunu kullanarak formu resetler
kullanıcı tipi değiştiğinde diğer alanlar da sıfırlanmış olur
...initialValues, userType: newUserType yeni kullanıcı değeri buraya kopyalanmış
olur ...initialValues başlangıçtaki initial values değerlerini kopyalar
*/

const handleUserTypeChange = (e, formik) => {
  const newUserType = e.target.value;
  formik.resetForm({ values: { ...initialValues, userType: newUserType } });
};

const onSubmit = (values, { setSubmitting }) => {
  setTimeout(() => {
    console.log("Form verileri:", values);
    alert("Form başarıyla gönderildi.");
    setSubmitting(false); // formun gönderimi esnasında butonun aktif olmamasını sağlar
  }, 2000); 
};

const App = () => {
  return (
    <div className='form-container'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isValid, dirty, isSubmitting, values, errors, touched, handleChange, handleBlur, handleSubmit, ...formik }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <h1>Form</h1>
            </div>
            {/* 
              as="" olarak belirtilen alanlar örneğin as="input" dersek
              normal metin girişi olduğunu belirtiyoruz as="select" dersek
              bir seçim listesi dropdown oluşturur
            */}
            <div className='part'>
              <label htmlFor="userType">Kullanıcı Tipi</label>
              <Field
                as="select"
                id="userType"
                name="userType"
                onChange={(e) => handleUserTypeChange(e, formik)} 
                onBlur={handleBlur}
              >
                <option value="">Seçiniz</option>
                <option value="bireysel">Bireysel Kullanıcı</option>
                <option value="ticari">Ticari Kullanıcı</option>
              </Field>
              {touched.userType && errors.userType && <div className='errorMsg'>{errors.userType}</div>}
            </div>

            <div className='part'>
              <label htmlFor="firstName">Ad</label>
              <Field
                as="input"
                type="text"
                id="firstName"
                name="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!values.userType}
              />
              {touched.firstName && errors.firstName && <div className='errorMsg'>{errors.firstName}</div>}
            </div>

            <div className='part'>
              <label htmlFor="lastName">Soyad</label>
              <Field
                as="input"
                type="text"
                id="lastName"
                name="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!values.userType}
              />
              {touched.lastName && errors.lastName && <div className='errorMsg'>{errors.lastName}</div>}
            </div>

            <div className='part'>
              <label htmlFor="email">E-posta</label>
              <Field
                as="input"
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!values.userType}
              />
              {touched.email && errors.email && <div className='errorMsg'>{errors.email}</div>}
            </div>

            <div className='part'>
              <label htmlFor="password">Şifre</label>
              <Field
                as="input"
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!values.userType}
              />
              {touched.password && errors.password && <div className='errorMsg'>{errors.password}</div>}
            </div>

            {/** Şirket Adı ve Şirket Kodu alanları görünür olacak ama veri girilmesi engellenecek */}
            <div className='part'>
                  <label htmlFor="companyName">Şirket Adı</label>
                  <Field
                    as="input"
                    type="text"
                    id="companyName"
                    name="companyName"
                    disabled={values.userType === "bireysel" || !values.userType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.companyName && errors.companyName && <div className='errorMsg'>{errors.companyName}</div>}
                </div>

                <div className='part'>
                  <label htmlFor="companyCode">Şirket Kodu</label>
                  <Field
                    as="input"
                    type="text"
                    id="companyCode"
                    name="companyCode"
                    disabled={values.userType === "bireysel" || !values.userType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.companyCode && errors.companyCode && <div className='errorMsg'>{errors.companyCode}</div>}
                </div>

                {/* 
                Şirket adı şirket kodu kısımlarını sadece ticari kullanıcı seçildiğinde görünür yapmak için
                {values.userType === "ticari" && ( // Şirket adı ve şirket kodu sadece "ticari" kullanıcı seçildiğinde görünecek
                  <>
                    <div className='part'>
                      <label htmlFor="companyName">Şirket Adı</label>
                      <Field
                        as="input"
                        type="text"
                        id="companyName"
                        name="companyName"
                        disabled={values.userType === "bireysel" || !values.userType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.companyName && errors.companyName && <div className='errorMsg'>{errors.companyName}</div>}
                    </div>

                    <div className='part'>
                      <label htmlFor="companyCode">Şirket Kodu</label>
                      <Field
                        as="input"
                        type="text"
                        id="companyCode"
                        name="companyCode"
                        disabled={values.userType === "bireysel" || !values.userType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.companyCode && errors.companyCode && <div className='errorMsg'>{errors.companyCode}</div>}
                    </div>

                  </>
                )} */}

            <button type="submit" disabled={!isValid || !dirty || isSubmitting}>
              {isSubmitting ? "Gönderiliyor..." : "Gönder"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default App