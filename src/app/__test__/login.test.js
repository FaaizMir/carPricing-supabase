// __tests__/page.test.js

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import supabase from '../Supabase'; 
import login from './Login'; 


describe('Page Component', () => {
  it('renders form and submits data', async () => {
    const { getByLabelText, getByText } = render(<Page />);
    
    fireEvent.change(getByLabelText(/Make/i), { target: { value: 'Toyota' } });
    fireEvent.change(getByLabelText(/Model/i), { target: { value: 'Camry' } });
    fireEvent.change(getByLabelText(/Year/i), { target: { value: '2022' } });
    fireEvent.change(getByLabelText(/Price/i), { target: { value: '25000' } });
    fireEvent.change(getByLabelText(/Specifications/i), { target: { value: 'Test specs' } });
    
    fireEvent.click(getByText(/Add Car/i));

    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith('cartable');
      expect(supabase.from().insert).toHaveBeenCalledWith(
        [{ make: 'Toyota', model: 'Camry', year: '2022', price: '25000', specs: 'Test specs' }],
        { headers: { Authorization: 'Bearer null' } }
      );
    });
  });
});
