import {auth,log} from '/firebase/client'

export async function registerUser(event) { 
  event.preventDefault()
  const res = await fetch(
    'http://localhost:3000/api/user/singup',
    {
      body: JSON.stringify({
        email: event.target.email.value,
        password: event.target.password.value,
        name : event.target.name.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }
  )
  const result = await res.json()
  console.log(result)
}

export async function loginUser(event) {
  event.preventDefault()
  const value = evant.target
  log(value.email.value,value,password.value)
}

export async function forgotPassword(event) {
  event.preventDefault()
  await fetch(
    'http://localhost:3000/api/user/forgotpassword',
    {
      body: JSON.stringify({
        email: event.target.email.value,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }
  )
}