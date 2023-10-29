import Header from '../partials/Header'
import Form from '../../components/shared/Form'

const Home = () => {
  return (
    <div className="bg-[#F9F9FA]">
    <Header />
    <main className="flex mx-auto" 
          style={{ justifyContent: "center" }}>
      <Form  />
    </main>
</div>
  )
}

export default Home