import styled from '@emotion/styled';

import { FunnyFaceLib } from '../../../funny-face-lib/src/index'

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <p>test app runs</p>
      <FunnyFaceLib />
    </StyledApp>
  );
}

export default App;
