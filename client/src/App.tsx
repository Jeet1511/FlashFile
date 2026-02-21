import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import FileView from './pages/FileView';

const App: React.FC = () => {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/file/:code" element={<FileView />} />
            </Routes>
        </div>
    );
};

export default App;
