import { useState } from 'react'
import { withRouter } from "next/router";
import Layout from "../../../../components/Layout"
import {Button, Form, FormGroup, Input} from "reactstrap";
import {resetPassword} from "../../../../actions/authAction";

const ResetPassword = ({router}) => {
    const [values, setValues] = useState({
        name: '',
        newPassword: '',
        error: '',
        message: '',
        showForm: true
    })

    const {name, newPassword, error, message, showForm} = values

    const handleSubmit = e => {
        e.preventDefault()
        resetPassword({
            newPassword,
            resetPasswordLink: router.query.id
        }).then(data => {
            if (data.error) {
                setValues({...values, error: data.error, showForm: false, newPassword: ''})
            } else{
                setValues({...values, message: data.message, showForm: false, newPassword: '', error: false})
            }
        })
    }

    const handleChange = e => (
        setValues({...values, message: '', error: '', newPassword: e.target.value})
    )

    const showError = () => (
        error ? <div className="alert alert-danger">{error}</div> : ''
    )
    const showMessage = () => (
        message ? <div className="alert alert-success">{message}</div> : ''
    )

    const passwordResetForm = () => (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Input
                    onChange={handleChange}
                    type="password"
                    className="form-control input-block"
                    value={newPassword}
                    placeholder="new password"
                    required
                />
            </FormGroup>
            <Button type="submit" color="secondary">Change password</Button>
        </Form>
    )

    return (
        <Layout>
            <div className="row margin-none">
                <div className="col md-12">
                    <h2>Reset Password</h2>

                    <div className="col md-5">
                        {showError()}
                        {showMessage()}
                        {showForm && passwordResetForm()}
                    </div>
                </div>
            </div>
        </Layout>
    )

}

export default withRouter(ResetPassword)