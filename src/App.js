import React, { useEffect, useState } from "react";

import AppRouter from "./Router";

function App() {
  //
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>copy</footer>
    </>
  );
}

export default App;
