import { render } from '@testing-library/react';
import { UIForFunnyFace } from './UIForFunnyFace';



describe('UIForFunnyFace', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UIForFunnyFace />);
    expect(baseElement).toBeTruthy();
  });
});
