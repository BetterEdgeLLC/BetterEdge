import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import TutorialsPage from './pages/TutorialsPage';
import BonusPage from './pages/BonusPage';

import SettingsLayout from './pages/settings/SettingsLayout';
import ProfilePage from './pages/settings/ProfilePage';
import SubscriptionsPage from './pages/settings/SubscriptionsPage';
import ReferralPage from './pages/settings/ReferralPage';
import PreferencesPage from './pages/settings/PreferencesPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected member area */}
          <Route path="/dashboard" element={
            <ProtectedRoute><DashboardPage /></ProtectedRoute>
          } />
          <Route path="/tutorials" element={
            <ProtectedRoute><TutorialsPage /></ProtectedRoute>
          } />
          <Route path="/bonus" element={
            <ProtectedRoute><BonusPage /></ProtectedRoute>
          } />

          {/* Settings (nested) */}
          <Route path="/settings" element={
            <ProtectedRoute><SettingsLayout /></ProtectedRoute>
          }>
            <Route index element={<Navigate to="/settings/profile" replace />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="subscriptions" element={<SubscriptionsPage />} />
            <Route path="referral" element={<ReferralPage />} />
            <Route path="preferences" element={<PreferencesPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
