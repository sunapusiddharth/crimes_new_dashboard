import config from '../config';
import { authHeader, handleResponse } from '../helpers';

export const userService = {
    getAll,
    getById
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`http://${process.env.REACT_APP_API_HOST}/users/${id}`, requestOptions).then(handleResponse);
}