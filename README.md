# funny-face-lib

This is a react component library for adding customisable, animated faces to your project.

## installation

npm:
`npm i @dblatcher/funny-face`

yarn:
`yarn add @dblatcher/funny-face`

## Example usage

```JSX
import {
  FunnyFace,
  browShapes,
  expressions,
} from 'funny-face-lib';

export const MyComponentWithFaces = () => (
<div>
    <FunnyFace
        size={20}
        expression={expressions.HAPPY}
        profile ={
            eyeColor:"green",
            browShape: browShapes.THIN,
        }
    />
    <FunnyFace
        size={24}
        talking
        profile ={
            eyeColor:"blue",
            width: 0.7,
            browShape: browShapes.WIDE,
        }
    />
</div>
)
```
