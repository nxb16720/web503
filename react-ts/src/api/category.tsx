
import { ICategory } from "../interface/interfaceCategory";
import instance from "./instance";


const getAllCategory = () => {
    return instance.get('/categories')
}
const getOneCategory = (id: number) => {
    return instance.get('/categories/' + id)
}
const deleteCategory = (id: number) => {
    return instance.delete('/categories/' + id)
}
const addCategory = (category: ICategory) => {
    return instance.post('/categories', category)
}
const updateCategory = (category: ICategory) => {
    return instance.put('/categories/' + category._id, category)
}



export { getAllCategory, getOneCategory, deleteCategory, addCategory, updateCategory }