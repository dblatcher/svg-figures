import { render } from '@testing-library/react';

import FunnyFaceLib from './funny-face-lib';

describe('FunnyFaceLib', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FunnyFaceLib />);
    expect(baseElement).toBeTruthy();
  });
});
