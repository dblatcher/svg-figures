import { ToothShape } from '../../../types';
import { toothShapes as defaultToothShapes } from '../../../defaults/toothShapes';

interface Props {
  maskUrl: string;
  toothList?: ToothShape[];
}

const { SQUARE, POINTY, LONG } = defaultToothShapes;

const defaultToothList = [SQUARE, POINTY, LONG, LONG, POINTY, SQUARE];

const plotTooth = (
  shape: ToothShape,
  toothIndex: number,
  toothCount: number
) => {
  const toothWidth = 100 / toothCount;
  const commands: string[] = shape.map((coord, index) => {
    const code = index > 0 ? 'L' : 'M';
    const [x, y] = coord.map((v) => v * toothWidth);
    return `${code} ${x + (toothIndex * toothWidth - 50)} ${y - 20}`;
  });
  return commands.join(' ');
};

const Teeth = ({ maskUrl, toothList = defaultToothList }: Props) => {
  return (
    <g mask={maskUrl}>
      {toothList.map((tooth, index) => (
        <path
          key={index}
          d={plotTooth(tooth, index, toothList.length)}
          stroke="black"
          fill="white"
        />
      ))}
    </g>
  );
};

export default Teeth;
