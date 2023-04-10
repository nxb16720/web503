
import axios from "axios";
import { IUser } from "../interface/interfaceSignup";
import instance from "./instance";
const header = `Bearer ${localStorage.getItem("token")}`

const getAllUser = () => {
    return instance.get('/users')
}
const getOneUser = (user: any) => {
    return instance.get('/users/' + user._id)
}
const deleteUser = (id: number) => {
    return instance.delete('/users/' + id)
}
const addUser = (user: any) => {
    return instance.post('/signup', user)
}
const signin = (user: any) => {
    return axios.post('/signin', user)
}
const updateUser = (user: IUser) => {
    return instance.put('/users/' + user._id, user)
}

export { getAllUser, getOneUser, deleteUser, addUser, updateUser, signin }