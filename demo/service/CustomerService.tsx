import { Demo } from '@/types'
import { BASE_MASTER } from '../../ihaaay.json'

export const CustomerService = {
    getCustomersMedium() {
        return fetch('/demo/data/customers-medium.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Customer[])
    },

    getCustomersLarge() {
        return fetch(`${BASE_MASTER}/users`)
            .then((res) => res.json())
            .then((d) => d.data as Demo.Customer[])
            .catch((error) => console.log(error))
    },

    getAllUsers() {
        return fetch(`${BASE_MASTER}/users`, { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data)
    }
}
