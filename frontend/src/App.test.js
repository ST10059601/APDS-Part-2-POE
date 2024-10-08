import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login page by default', () => {
  render(<App />);  // Remove MemoryRouter since App already has a Router
  const loginHeading = screen.getByText(/login/i);
  expect(loginHeading).toBeInTheDocument();
});

test('renders register page', () => {
  window.history.pushState({}, 'Register Test', '/register');  // Mock navigation to /register

  render(<App />);
  const registerHeading = screen.getByText(/register/i);
  expect(registerHeading).toBeInTheDocument();
});

test('renders home page when authenticated', () => {
  localStorage.setItem('token', 'dummy_token');  // Mock authentication by adding a token
  window.history.pushState({}, 'Home Test', '/home');  // Mock navigation to /home

  render(<App />);
  const homeHeading = screen.getByText(/welcome to the payment portal/i);
  expect(homeHeading).toBeInTheDocument();
  localStorage.removeItem('token');  // Clean up
});

test('redirects to login if not authenticated', () => {
  localStorage.removeItem('token');  // Ensure no authentication token is present
  window.history.pushState({}, 'Home Test', '/home');  // Mock navigation to /home

  render(<App />);
  const loginHeading = screen.getByText(/login/i);
  expect(loginHeading).toBeInTheDocument();
});
