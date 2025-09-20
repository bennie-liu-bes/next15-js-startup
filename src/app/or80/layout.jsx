import NavBar from './components/NavBar'
export default function Or80Layout({ children }) {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  )
}
