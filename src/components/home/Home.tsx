import Form from "../shared/form/Form";

const Home: React.FC = (): React.JSX.Element => {
  return (
    <main className="flex mx-auto" style={{ justifyContent: "center" }}>
      <Form formType="login" />
    </main>
  );
};

export default Home;
