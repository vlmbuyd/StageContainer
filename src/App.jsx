import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AgreementPage from "./pages/join/AgreementPage";
import CompanyHomePage from "./pages/company/CompanyHomePage";
import UserHomePage from "./pages/user/UserHomePage";
import RegistCompanyPage from "./pages/company/RegistCompanyPage";
import SearchItemPage from "./pages/company/SearchItemPage";
import SearchDetailPage from "./pages/company/SearchDetailPage";
import ChattingPage from "./pages/chat/ChattingPage";
import OrderRequestPage from "./pages/order/OrderRequestPage";
import Layout from "./components/layout/Layout";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/globalStyle";
import theme from "./styles/theme";
import { useContext, useEffect } from "react";
import { AuthenticationContext } from "./contexts/user";
import UserDetailPage from "./pages/join/UserDetailPage";
import SignUpSuccessPage from "./pages/join/SignUpSuccessPage";
import OrderCompletePage from "./pages/order/OrderCompletePage";
import OrderProgressPage from "./pages/order/OrderProgressPage";
import RegistCompletePage from "./pages/company/RegistCompletePage";
import NeedLoginPage from "./pages/NeedLoginPage";

function App() {
  const { isAuthenticated } = useContext(AuthenticationContext);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<UserHomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="join/agree" element={<AgreementPage />} />
              <Route path="join/user" element={<UserDetailPage />} />
              <Route path="join/success" element={<SignUpSuccessPage />} />

              <Route path="/company">
                <Route index element={<CompanyHomePage />} />
                {isAuthenticated ? (
                  <Route path="/company/regist">
                    <Route index element={<RegistCompanyPage />} />
                    <Route
                      path="/company/regist/complete"
                      element={<RegistCompletePage />}
                    />
                  </Route>
                ) : (
                  <Route path="/company/regist">
                    <Route index element={<NeedLoginPage />} />
                  </Route>
                )}

                <Route path="/company/search" element={<SearchItemPage />} />
                {isAuthenticated ? (
                  <Route path="/company/products/:id">
                    <Route index element={<SearchDetailPage />} />
                    <Route
                      path="/company/products/:id/chat"
                      element={<ChattingPage />}
                    />
                    <Route
                      path="/company/products/:id/order-request"
                      element={<OrderRequestPage />}
                    />
                    <Route
                      path="/company/products/:id/order-complete"
                      element={<OrderCompletePage />}
                    />
                    <Route
                      path="/company/products/:id/order-progress"
                      element={<OrderProgressPage />}
                    />
                  </Route>
                ) : (
                  <Route path="/company/products/:id">
                    <Route index element={<NeedLoginPage />} />
                  </Route>
                )}
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
