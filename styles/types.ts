export declare const myColors: (
  | 'black'
  | 'white'
  | 'light-grey-1'
  | 'light-grey-2'
  | 'light-grey-3'
  | 'green'
  | 'light-yellow'
  | 'epiroc-arctic-blue-1'
  | 'epiroc-arctic-blue-2'
  | 'epiroc-dark-blue'
  | 'epiroc-electric-green'
  | 'epiroc-grey'
  | 'epiroc-light-blue-1'
  | 'epiroc-light-blue-2'
  | 'epiroc-warm-grey-1'
  | 'epiroc-warm-grey-2'
  | 'epiroc-warm-grey-3'
  | 'epiroc-warm-grey-4'
  | 'epiroc-warm-grey-4-50'
  | 'epiroc-warm-grey-5'
  | 'epiroc-yellow'
)[];

export type TAvailableColors = typeof myColors[number];

export type TAvailableIconStyles =
  | 'circleFill'
  | 'pathFill'
  | 'pathStroke'
  | 'firstPathFill'
  | 'strokeFill'
  | 'identifierFill'
  | 'rectFill'
  | 'rectStroke'
  | 'pathAndCircleFill'
  | 'pathFillCircleStroke'
  | 'none';
