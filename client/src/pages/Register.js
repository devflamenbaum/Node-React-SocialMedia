import React, { useContext } from 'react'
import { useForm } from '../hooks/hooks'
import { useMutation } from '@apollo/client'
import { Button, Form, Icon } from 'semantic-ui-react'
import { toast } from 'react-toastify';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth'

function Register(props) {

    const context = useContext(AuthContext)
    const { handleOnChange, handleSubmit, values } = useForm(register, { 
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })


    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, { data: {register: userData }}){
            toast.success(<div style={{display: 'flex', alignItems: 'center'}}><Icon name="check" style={{fontSize: 20, marginRight: 10}}/>Register Success!!!</div>)
            context.login(userData)
            props.history.push({
                pathname: '/'
            })
           console.log(userData)
       },
        onError(error){
            const { errors } = error.graphQLErrors && error.graphQLErrors[0].extensions
            console.log(errors)
            for(let message of Object.values(errors)){
                toast.error(<div style={{display: 'flex', alignItems: 'center'}}><Icon name="times circle" style={{fontSize: 20, marginRight: 10}}/>{message}</div>)
            }
        },
        variables: values,
    })

    function register(){
        addUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={handleSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Sign in</h1>
                <Form.Input 
                    label="Username:" 
                    placeholder="Username..."
                    name="username" 
                    value={values.username}
                    onChange={handleOnChange}  
                />
                <Form.Input 
                    label="Email:" 
                    placeholder="email..."
                    name="email" 
                    value={values.email}
                    onChange={handleOnChange}  
                />
                <Form.Input
                    type="password" 
                    label="Password:" 
                    placeholder="password..."
                    name="password" 
                    value={values.password}
                    onChange={handleOnChange}  
                />
                <Form.Input
                    type="password" 
                    label="Confirm Password:" 
                    placeholder="confirm password..."
                    name="confirmPassword" 
                    value={values.confirmPassword}
                    onChange={handleOnChange}  
                />
                <Button color="teal">Submit</Button>
            </Form>
        </div>
    )
}

const REGISTER_USER = gql`

    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!

    ){
        register(
            registerInput: {
                username: $username,
                email: $email,
                password: $password,
                confirmPassword: $confirmPassword,
            }
        ){
            id email username createdAt token
        }
    }
`

export default Register;
