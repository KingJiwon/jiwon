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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://notion-api.splitbee.io/v1/page/${notionId}`,
        )
          .then((res) => res.json())
          .then((resJson) => {
            setNotionData(resJson);
            setLoading(false);
          });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [notionId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.container}>
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
