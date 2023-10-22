/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './dogAvatar.module.css';
import { ChangeEvent, useEffect, useState } from 'react';
import { supabase } from '../../../supabase.config';
import { toast } from 'react-toastify';
import { FcAddImage, FcDownload } from 'react-icons/fc';

type AvatarType = {
  url: string | null | undefined;
  size?: string;
  onUpload: any;
};

export default function DogAvatar({ url, onUpload }: AvatarType) {
  const [avatarUrl, setAvatarUrl] = useState<any>(null);
  const [uploading, setUploading] = useState<any>(false);

  useEffect(() => {
    if (url) downloadImage(url, 'dog_avatars');
  }, [url]);

  async function downloadImage(path: string, SB_bucket: string) {
    if (path) {
      try {
        const { data, error } = await supabase.storage
          .from(SB_bucket)
          .download(path);
        if (error) {
          throw error;
        }
        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error: any) {
        console.log('Error downloading image: ', error.message);
        toast.error('Error downloading image: ', error.message);
      }
    }
  }

  async function uploadAvatar(event: ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('dog_avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(event, filePath);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={styles.imageWrapper}>
      {avatarUrl ? (
        <img src={avatarUrl} alt="Avatar" className={styles.avatar} />
      ) : (
        <div className={styles.noImage} />
      )}
      <div className={styles.picContainer}>
        {!url && (
          <>
            <label className={styles.uploadBtn} htmlFor="dogPic">
              {uploading ? <FcDownload /> : <FcAddImage />}
            </label>

            <input
              style={{
                visibility: 'hidden',
                position: 'absolute',
              }}
              type="file"
              id="dogPic"
              accept="image/*"
              onChange={uploadAvatar}
              disabled={uploading}
            />
          </>
        )}
      </div>
    </div>
  );
}
