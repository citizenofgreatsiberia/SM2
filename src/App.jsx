import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router"
import BackToTop from "./assets/components/backToTop/BackToTop.module"
import Header from "@components/header/Header.module"
import ProgressBar from "@components/progressBar/ProgressBar.module"

export default function App() {

  const theme = useSelector(state => state.theme)

  useEffect(() => {
    const root = document.documentElement
    root.className = theme
  }, [theme])

  return (
    <>
      <Header>
        <ProgressBar />
      </Header>
      <Outlet />
      <BackToTop />
    </>
  )
}
