import React from 'react'
import Error from './Error'

function validate(values) {
  let errors = {}

  if (!values.name) {
    errors.name = 'Required'
  }

  return errors
}

export default function VanillaForm() {
  console.log('VanillaForm')
  const [submitting, setSubmitting] = React.useState(false)
  const [name, setName] = React.useState('')
  const [errors, setErrors] = React.useState({})

  React.useEffect(() => {
    setErrors(validate({ name }))
  }, [name])

  console.log('errors', errors)

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()

        if (Object.keys(validate({ name })) > 0) {
          return
        }

        setSubmitting(true)

        // submit form
        setTimeout(() => {
          const values = { name }
          alert(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 500)
      }}
    >
      <h2>An Average Form</h2>

      <div className='input-row'>
        <label>Name</label>
        <input
          type='text'
          name='name'
          onChange={(event) => setName(event.target.value)}
          value={name}
          className={errors.name ? 'has-error' : null}
        />
        <Error message={errors.name} />
      </div>
      <div className='input-row'>
        <button type='submit' disabled={submitting}>
          Submit
        </button>
      </div>
    </form>
  )
}
