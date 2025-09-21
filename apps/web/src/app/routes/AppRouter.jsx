import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchCategories } from '../store/slices/categoriesSlice'
import Home from '../../pages/Home'
import Category from '../../pages/Category'
import Subcategory from '../../pages/Subcategory'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'

export default function AppRouter(){
  const dispatch = useDispatch()
  useEffect(()=>{ dispatch(fetchCategories()) },[dispatch])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/c/:category" element={<Category />} />
          <Route path="/c/:category/:subcategory" element={<Subcategory />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
