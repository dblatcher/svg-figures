import { render } from '@testing-library/react';
import { UIForHead } from './UIForHead';



describe('UIForHead', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UIForHead />);
    expect(baseElement).toBeTruthy();
  });
});
