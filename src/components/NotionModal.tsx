import React, { useEffect, useState } from 'react';
import 'react-notion/src/styles.css';
import { NotionRenderer } from 'react-notion';
import style from '../style/components/NotionModal.module.scss';

interface NotionModalProps {
  handleCloseModal: () => void;
  notionId: string;
}

export default function NotionModal({
  handleCloseModal,
  notionId,
}: NotionModalProps) {
  const [notionData, setNotionData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(`https://notion-api.splitbee.io/v1/page/${notionId}`)
          .then((res) => res.json())
          .then((resJson) => {
            setNotionData(resJson);
          });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [notionId]);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      handleCloseModal();
    }
  };

  return (
    <div
      className={style.container}
      onClick={handleClickOutside}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      role="button"
    >
      <div className={style.modalContent}>
        <button
          type="button"
          className={style.closeButton}
          onClick={handleCloseModal}
        >
          Close
        </button>
        {notionData && Object.keys(notionData).length > 0 && (
          <NotionRenderer blockMap={notionData} />
        )}
      </div>
    </div>
  );
}
