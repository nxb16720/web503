import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'


import LayoutWeb from './layouts/LayoutWeb'
import HomePage from './pages/Home'
import LayoutAdmin from './layouts/LayoutAdmin'
import Dashboard from './pages/admin/Dashboard'
import ProductManager from './pages/admin/ProductManager'
import ProductAdd from './pages/admin/ProductAdd'
import ProductPage from './pages/Product'
import ProductDetail from './pages/ProductDetail'
import ProductUpdate from './pages/admin/ProductUpdate'
import { Iproduct } from './interface/interfaceProduct'
import { getAllProduct, getOneProduct } from './api/product'
import { deleteProduct } from './api/product'
import { addProduct } from './api/product'
import { updateProduct } from './api/product'
import CategoryManager from './pages/admin/CategoryManager'
import CategoryAdd from './pages/admin/CategoryAdd'
import CategoryUpdate from './pages/admin/CategoryUpdate'
import { ICategory } from './interface/interfaceCategory'
import { addCategory, deleteCategory, getAllCategory, updateCategory } from './api/category'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import { IUser } from './interface/interfaceSignup'
import { addUser, getAllUser, getOneUser } from './api/signup'

import SearchProduct from './pages/SearchProduct'
import SearchCategory from './pages/SearchCategory'


function App() {
  const [products, setProduct] = useState<Iproduct[]>([])
  const [categorys, setCategory] = useState<ICategory[]>([])
  const [users, setUser] = useState<IUser[]>([])
  const [search, setSearch] = useState<any>()
  const [user, setUse] = useState<any>()


  useEffect(() => {
    getAllProduct().then(({ data }) => setProduct(data.docs))
  }, [])

  useEffect(() => {
    getAllCategory().then(({ data }) => setCategory(data))
  }, [])

  useEffect(() => {
    getAllUser().then(({ data }) => setUser(data))
  }, [])
  const onHandleRemoveP = (id: number) => {
    deleteProduct(id).then(() => setProduct(products.filter(p => p._id != id)))
  }
  const onHandleAddP = (product: Iproduct) => {
    addProduct(product).then(() => getAllProduct().then(({ data }) => setProduct(data.docs)))
  }
  const onHandleUpdateP = (product: Iproduct) => {
    updateProduct(product).then(() => getAllProduct().then(({ data }) => setProduct(data.docs)))
  }

  const onHandleRemoveC = (id: number) => {
    deleteCategory(id).then(() => setCategory(categorys.filter(c => c._id != id)))
  }
  const onHandleAddC = (category: ICategory) => {
    addCategory(category).then(() => getAllCategory().then(({ data }) => setCategory(data)))
  }
  const onHandleUpdateC = (category: ICategory) => {
    updateCategory(category).then(() => getAllCategory().then(({ data }) => setCategory(data)))
  }

  const onHandleAddU = (user: IUser) => {
    addUser(user).then(() => setUser([...users, user]))
  }

  const onHandleSeach = (id: number) => {
    getOneProduct(id).then(({ data }) => setSearch(data))
  }
  const onHandleUser = (user: any) => {
    getOneUser(user).then(() => console.log(user))
  }
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<LayoutWeb user={users} category={categorys} product={products} onSearch={onHandleSeach} />}>
          <Route index element={<HomePage />} />
          <Route path='search' element={<SearchProduct search={search} />} />
          <Route path='searchC/:id' element={<SearchCategory category={categorys} product={products} />} />
          <Route path='product' >
            <Route index element={<ProductPage product={products} />} />
            <Route path=':id' element={<ProductDetail product={products} />} />
          </Route>
          <Route path='auth'>
            <Route index element={<Signin user={users} onUser={onHandleUser} />} />
            <Route path='signup' element={<Signup onAdd={onHandleAddU} />} />
          </Route>
        </Route>


        <Route path='/admin' element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path='product'>
            <Route index element={<ProductManager product={products} onRemove={onHandleRemoveP} />} />
            <Route path='add' element={<ProductAdd onAdd={onHandleAddP} category={categorys} />} />
            <Route path='update/:id' element={<ProductUpdate onUpdate={onHandleUpdateP} products={products} category={categorys} />} />

          </Route>

          <Route path='category'>
            <Route index element={<CategoryManager category={categorys} onRemove={onHandleRemoveC} />} />
            <Route path='add' element={<CategoryAdd onAdd={onHandleAddC} />} />
            <Route path='update/:id' element={<CategoryUpdate onUpdate={onHandleUpdateC} category={categorys} />} />

          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
