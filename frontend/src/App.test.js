import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login page by default', () => {
  render(<App />);
  
  // Targeting the heading with the role "heading" and the name "Login"
  const loginHeading = screen.getByRole('heading', { name: /login/i });
  expect(loginHeading).toBeInTheDocument();
});

test('renders register page', () => {
  window.history.pushState({}, 'Register Test', '/register');
  
  render(<App />);
  
  // Targeting the heading with the role "heading" and the name "Register"
  const registerHeading = screen.getByRole('heading', { name: /register/i });
  expect(registerHeading).toBeInTheDocument();
});

test('renders home page when authenticated', () => {
  localStorage.setItem('token', 'dummy_token');
  window.history.pushState({}, 'Home Test', '/home');

  render(<App />);
  
  const homeHeading = screen.getByText(/welcome to the payment portal/i);
  expect(homeHeading).toBeInTheDocument();
  localStorage.removeItem('token');
});

test('redirects to login if not authenticated', () => {
  localStorage.removeItem('token');
  window.history.pushState({}, 'Home Test', '/home');

  render(<App />);
  
  const loginHeading = screen.getByRole('heading', { name: /login/i });
  expect(loginHeading).toBeInTheDocument();
});
