import React, { FC, useState } from 'react';
import styles from './index.less';

interface BtnAnchorProps {
  dataSource: { label: string; idName: string }[];
}
const BtnAnchor: FC<BtnAnchorProps> = ({ children, dataSource = [] }) => {
  const [currentKey, setCurrentKey] = useState('');
  const handleCurrentKey = (item: any) => {
    let id = item.idName.split('#')[1];
    let anchorElement = document.getElementById(id);
    if (anchorElement) {
      anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
    setCurrentKey(item.idName);
  };
  return (
    <div className={styles['btn-anchor']}>
      <div>
        {dataSource.map((item) => (
          <span key={item.idName} onClick={handleCurrentKey.bind(null, item)}>
            <a
              className={[
                styles['label'],
                currentKey === item.idName ? styles['active'] : '',
              ].join(' ')}
            >
              {item.label}
            </a>
          </span>
        ))}
      </div>
      {children}
    </div>
  );
};

export default BtnAnchor;
