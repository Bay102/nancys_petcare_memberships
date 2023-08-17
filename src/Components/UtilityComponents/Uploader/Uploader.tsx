import { useState } from 'react';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';
import styles from './uploader.module.css';

function Uploader() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('No selected file');
  return (
    <main>
      <form onClick={() => ''}>
        <input
          type="file"
          accept="image/*"
          className={styles.inputfield}
          hidden
         //  onChange={({ target: { files } }) => {
         //    files[0] && setFileName(files[0].name);
         //    if (files) {
         //      setImage(URL.createObjectURL(files[0]));
         //    }
         //  }}
        />

        {image ? (
          <img src={image} width={15} height={15} alt={fileName} />
        ) : (
          <>
            <MdCloudUpload color="#1475cf" size={10} />
          </>
        )}
      </form>

      <section className={styles.uploadedRow}>
        <AiFillFileImage color="#1475cf" />
        <span className={styles.uploadContent}>
          {fileName} -
          <MdDelete
            onClick={() => {
              setFileName('No selected File');
              setImage(null);
            }}
          />
        </span>
      </section>
    </main>
  );
}

export default Uploader;
