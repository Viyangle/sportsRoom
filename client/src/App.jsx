import { Routes, Route } from 'react-router-dom'
import MainPage from "./pages/MainPage.jsx";
import UserPage from "./pages/UserPage.jsx";
import ActivityPage from "./pages/ActivityPage.jsx";
import ManagementPage from "./pages/ManagementPage.jsx";
import './App.css'

function App() {
    return (
        <div className="app-container">
            <Routes>
                <Route
                    path="/"
                    element={
                        <MainPage />
                    }
                />
                <Route
                    path="/user"
                    element={
                        <UserPage />
                    }
                />
                <Route
                    path="/activity/:id"
                    element={
                        <ActivityPage />
                    }
                />
                <Route
                    path="/management"
                    element={
                        <ManagementPage />
                    }
                />
            </Routes>
        </div>
    );
}

export default App
