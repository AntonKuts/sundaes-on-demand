import { render } from '@testing-library/react';
import { OrderDetailsProvaider } from '../contexts/OrderDetails';

const renderWithContext = (ui, option) =>
    render (ui, {wrapper: OrderDetailsProvaider, ...option });

export * from '@testing-library/react';

export {renderWithContext as render };

