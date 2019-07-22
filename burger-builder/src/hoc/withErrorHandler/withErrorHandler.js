import React, { useState, useEffect } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        const [error, setError] = useState(null);

        const reqInterceptors = axios.interceptors.request.use(req => {
            setError(null)
            return req;
        })

        const resInterceptors = axios.interceptors.response.use(res => res,
            err => {
                setError(err)
            })

        // Avoid memory leakage
        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptors);
                axios.interceptors.response.eject(resInterceptors);
            }
        }, [reqInterceptors, resInterceptors]);

        const errorConfirmedHandler = () => {
            setError(null)
        }

        return (
            <Aux>
                <Modal
                    show={error}
                    closemodal={errorConfirmedHandler}
                >
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        )
    }
}

export default withErrorHandler;