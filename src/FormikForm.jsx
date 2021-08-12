import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Autosuggest from 'react-autosuggest'
import axios from 'axios'
import Error from './Error'

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Too short')
    .max(255, 'Must be a shorter than 255')
    .required('Must enter a name'),
  email: Yup.string()
    .email('Must be a valid email address')
    .max(255, 'Must be a shorter than 255')
    .required('Must enter a email'),
  country: Yup.string()
    .min(1, 'Too short')
    .max(255, 'Must be a shorter than 255')
    .required('Must enter a country'),
})

export default function FormikForm() {
  const [country, setCountry] = React.useState('')
  const [suggestions, setSuggestions] = React.useState([])

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        country: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true)

        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          resetForm()
          setCountry('')
          setSubmitting(false)
        }, 500)
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          {JSON.stringify(values)}
          {JSON.stringify(errors)}
          {JSON.stringify(touched)}
          <h2>A Great Form</h2>
          <div className='input-row'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              id='name'
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.name && errors.name ? 'has-error' : null}
            />
            <Error touched={touched.name} message={errors.name} />
          </div>

          <div className='input-row'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.email && errors.email ? 'has-error' : null}
            />
            <Error touched={touched.email} message={errors.email} />
          </div>

          <div className='input-row'>
            <label htmlFor='country'>Country</label>
            <Autosuggest
              inputProps={{
                placeholder: 'Type your country',
                autoComplete: 'abcd',
                name: 'country',
                id: 'country',
                value: country,
                onBlur: handleBlur,
                onChange: (_event, { newValue }) => {
                  setCountry(newValue)
                },
                className: touched.country && errors.country ? 'has-error' : null
              }}
              suggestions={suggestions}
              onSuggestionsFetchRequested={async ({ value }) => {
                if (!value) {
                  setSuggestions([])
                  return
                }
                try {
                  const result = await axios.get(
                    `https://restcountries.eu/rest/v2/name/${value}`
                  )
                  // console.log(result.data)
                  setSuggestions(
                    result.data.map((row) => ({
                      name: row.name,
                      flag: row.flag,
                    }))
                  )
                } catch (e) {
                  setSuggestions([])
                }
              }}
              onSuggestionsClearRequested={() => {
                setSuggestions([])
              }}
              onSuggestionSelected={(event, { suggestion, method }) => {
                if (method === 'enter') {
                  event.preventDefault()
                }
                // setCountry(suggestion.name)
                // set 'country' value to formik form with 'setFieldValue' function
                setFieldValue('country', suggestion.name)
              }}
              getSuggestionValue={(suggestion) => suggestion.name}
              renderSuggestion={(suggestion) => (
                <div>
                  <img
                    src={suggestion.flag}
                    alt={suggestion.name}
                    style={{ width: '25px' }}
                  />{' '}
                  {suggestion.name}
                </div>
              )}
            />
            <Error touched={touched.country} message={errors.country} />
          </div>

          <div className='input-row'>
            <button type='submit' disabled={isSubmitting}>
              Submit
            </button>
          </div>
        </form>
      )}
    </Formik>
  )
}
