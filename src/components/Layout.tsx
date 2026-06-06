import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import Footer from '../sections/Footer'
import Chatbot from './chat/Chatbot'

export default function Layout() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-clip bg-brand-white">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}
