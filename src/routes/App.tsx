import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <header>
        <h1>Fake Store</h1>
        <nav>
          {/* put the navigation links here */}
          {/* put the cart view here */}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
