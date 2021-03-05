import React, { useRef } from 'react';
import { Checkbox } from 'antd';
import { PauseCircleOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';
import styles from './index.less';

interface IProps {
  id: string;
  text: string;
  index: number;
  onMove: Function;
  value: string;
  dragable: boolean;
  checked: boolean;
  onCheck: Function;
  limitState: number;
  disabled: boolean;
}

interface IItem {
  type: string;
  id: string;
  index: number;
}

const DragItem: React.FC<IProps> = ({
  id,
  text,
  index,
  onMove,
  value,
  dragable,
  checked,
  onCheck,
  limitState,
  disabled,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: 'topic',
    hover(item: IItem, monitor: DropTargetMonitor) {
      if (!ref.current || !dragable) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    canDrop: () => dragable,
  });
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'topic', id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: () => dragable,
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  const onChange = (e: CheckboxChangeEvent) => {
    onCheck(e.target.checked, index);
  };
  const getDisabled = () => {
    if (disabled) {
      return true;
    }
    if (limitState === -1 && checked) {
      return true;
    }
    if (limitState === 1 && !checked) {
      return true;
    }
    return false;
  };
  return (
    <div
      ref={ref}
      style={{ opacity, cursor: dragable ? 'move' : 'default' }}
      className={styles.listWrap}
    >
      <Checkbox
        disabled={getDisabled()}
        checked={checked}
        value={value}
        onChange={onChange}
      ></Checkbox>
      <div>{text}</div>
      {dragable && <PauseCircleOutlined className={styles['anticon-pause']} />}
    </div>
  );
};

export default DragItem;
