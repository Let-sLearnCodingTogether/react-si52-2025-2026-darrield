import { useState, type ChangeEvent, type FormEvent } from "react"
import { Button, Form } from "react-bootstrap"
import ApiClient from "../../../../utils/ApiClient"
import { NavLink, useNavigate } from "react-router"

interface SignInForm {
    email : string,
    password : string
}


function SignIn(){
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState<SignInForm>({
        email : "",
        password : ""
    })

    const onHandleChange = (event : ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target

        setForm({
            ...form,
            [name] : value
        })

    }

     const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try{
            const response = await ApiClient.post('/signin', form)
            console.log(response);

            if(response.status === 200) {

                localStorage.setItem("AuthToken", response.data.data.token)
                navigate("/movies", {
                    replace : true
                })
            }

        } catch (error) {
            console.log(error);
        } finally{
            setIsLoading(false)
        }


    }
    return <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
        <h1>Sign in page</h1>

    <div className="d-flex justify-content-between mb3">
        <Form onSubmit={handleSubmit}>
         <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={form.email}
                onChange={onHandleChange}
                name="email"
                type="text"
                placeholder="Enter Email Address"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={form.password}
                onChange={onHandleChange}
                name="password"
                type="password"
                placeholder="Enter Password"
              />
            </Form.Group>
            
                <div className="d-flex gap-5 mt-3">
                    <Button type="submit" variant="primary"
                    disabled={isLoading}>
                        {isLoading ? "Loading..." : "Sign In"}
                    </Button>

                    <NavLink to="/" className="btn btn-link">
                        Sign Up
                    </NavLink>
                </div>
            </Form>
            
            </div>
        </div>

}

export default SignIn