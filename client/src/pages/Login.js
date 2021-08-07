import React, { useContext } from 'react'
import { useForm } from '../hooks/hooks'
import { useMutation } from '@apollo/client'
import { Button, Form, Icon } from 'semantic-ui-react'
import { toast } from 'react-toastify';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth'

function Login(props) {

    const context = useContext(AuthContext);
    const { handleOnChange, handleSubmit, values } = useForm(loginUserCallback, { 
        username: '',
        password: ''
    })


    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(proxy, { data: { login: userData}}){
            toast.success(<div style={{display: 'flex', alignItems: 'center'}}><Icon name="check" style={{fontSize: 20, marginRight: 10}}/>You have successfully Logged in!!!</div>)
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

    function loginUserCallback(){
        loginUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={handleSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
                <Form.Input 
                    label="Username:" 
                    placeholder="Username..."
                    name="username" 
                    value={values.username}
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
                <Button align="center" color="teal">Login</Button>
            </Form>
        </div>
    )
}

const LOGIN_USER = gql`

    mutation login(
        $username: String!
        $password: String!
    ){
        login(
            username: $username, password: $password
        ){
            id email username createdAt token
        }
    }
`

export default Login;
