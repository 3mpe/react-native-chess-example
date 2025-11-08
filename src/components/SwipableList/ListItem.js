import React, {useRef} from 'react';
import {Swipeable} from './../../utils';

const SwipableListItem = ({
  onSwipeStart,
  onSwipeClose,
  item,
  children,
  renderRightActions,
  ...rest
}) => {
  const swipeableRef = useRef(null);

  return (
    <Swipeable
      ref={swipeableRef}
      onSwipeableWillOpen={() => onSwipeStart(swipeableRef)}
      onSwipeableWillClose={() => onSwipeClose(swipeableRef)}
      rightThreshold={80}
      {...rest}
      renderRightActions={(progress, dragX) =>
        renderRightActions(progress, dragX, item)
      }>
      {children}
    </Swipeable>
  );
};
export default SwipableListItem;
