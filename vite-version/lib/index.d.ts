import { Interpolation } from "@emotion/react";

declare module 'react' {
  interface DOMAttributes<T> {
    css?: Interpolation
  }
}