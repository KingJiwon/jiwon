import React, { useEffect, useState } from 'react';

import { NotionRenderer } from 'react-notion-x';
import { ExtendedRecordMap } from 'notion-types';
import style from '../style/components/NotionModal.module.scss';

interface NotionModalProps {
  handleCloseModal: () => void;
  notionId: string;
}

export default function NotionModal({
  handleCloseModal,
  notionId,
}: NotionModalProps) {
  const [notionData, setNotionData] = useState<ExtendedRecordMap>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://notion-api.splitbee.io/v1/page/${notionId}`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setNotionData(data);
        setLoading(false);
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
          <NotionRenderer recordMap={notionData} fullPage darkMode={false} />
        )}
      </div>
    </div>
  );
}
