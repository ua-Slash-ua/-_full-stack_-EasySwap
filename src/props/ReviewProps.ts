export type ReviewPhoto = {
  createdAt: string;
  updatedAt: string;
  alt: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  focalX: number;
  focalY: number;
  id: string;
  url: string;
  thumbnailURL: string | null;
};

export type ReviewProps = {
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  photo: ReviewPhoto;
  id: string;
};

