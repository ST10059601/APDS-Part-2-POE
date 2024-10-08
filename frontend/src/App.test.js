import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

test('renders login page by default', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  
  const loginHeading = screen.getByText(/login/i);  // Look for "Login" text in the DOM
  expect(loginHeading).toBeInTheDocument();  // Ensure it's in the document
});

test('renders register page', () => {
  render(
    <MemoryRouter initialEntries={['/register']}>
      <App />
    </MemoryRouter>
  );

  const registerHeading = screen.getByText(/register/i);  // Look for "Register" text in the DOM
  expect(registerHeading).toBeInTheDocument();  // Ensure it's in the document
});

test('renders home page when authenticated', () => {
  localStorage.setItem('token', 'dummy_token');  // Mock authentication by adding a token

  render(
    <MemoryRouter initialEntries={['/home']}>
      <App />
    </MemoryRouter>
  );

  const homeHeading = screen.getByText(/welcome to the payment portal/i);  // Check for Home component content
  expect(homeHeading).toBeInTheDocument();  // Ensure it's in the document
  localStorage.removeItem('token');  // Clean up
});

test('redirects to login if not authenticated', () => {
  localStorage.removeItem('token');  // Ensure no authentication token is present

  render(
    <MemoryRouter initialEntries={['/home']}>
      <App />
    </MemoryRouter>
  );

  const loginHeading = screen.getByText(/login/i);  // Since not authenticated, it should redirect to login
  expect(loginHeading).toBeInTheDocument();  // Ensure it's in the document
});
