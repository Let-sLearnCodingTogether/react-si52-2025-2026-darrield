import { useState, type ChangeEvent, type FormEvent } from "react"
import { Button, Form } from "react-bootstrap"
import ApiClient from "../../../../utils/ApiClient"
import { NavLink } from "react-router"



interface SignUpForm{
    username : string,
    email : string,
    password : string
}

function SignUp() {

    const [form, setForm] = useState<SignUpForm>({
        username : "",
        email : "",
        password : ""
    })

        const handleInputChange = (event : ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target

        setForm({
            ...form,
            [name] : value
        })

    }

     const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try{
            const response = await ApiClient.post('/signup', form)
            console.log(response);

        } catch (error) {
            console.log(error);
        }


    }



    return  <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <div className="d-flex justify-content-between mb-3">
          <h2>Register Page</h2>
        </div>
        <div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={form.username}
                onChange={handleInputChange}
                name="username"
                type="text"
                placeholder="Enter username"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={form.email}
                onChange={handleInputChange}
                name="email"
                type="text"
                placeholder="Enter Email Address"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={form.password}
                onChange={handleInputChange}
                name="password"
                type="text"
                placeholder="Enter Password"
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Sign up
            </Button>
            <NavLink to="/signin">Sign In</NavLink>
          </Form>
        </div>
      </div>
    </div>
}

export default SignUp;