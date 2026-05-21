import React, { useState } from "react";
import { uploadProductImage } from "@/api/product.api";
import { CreateProductImage } from "@/interfaces/product.interface";
import { openModal } from "@/redux/slice/app.slice";
import { ModalState } from "@/redux/state/app.state";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

export default function useImages() {
  const dispatch = useDispatch<AppDispatch>();

  const [images, setImages] = useState<CreateProductImage>({
    thumbnail: "",
    details: [],
  });
  const [imageFile, setImageFile] = useState<{
    thumbnail?: File;
    details: File[];
  }>({ details: [] });

  const [countImageDetailInput, setCountImageDetailInput] = useState<number>(1);

  const addNewImageDetailInput = () => {
    const maxIndex = images.details.length ?? 1;
    setCountImageDetailInput((prev) => {
      if (prev === maxIndex) return prev + 1;
      return prev;
    });
  };

  const removeImageDetailInput = (index: number) => {
    setCountImageDetailInput((prev) => (prev === 1 ? prev : prev - 1));
    setImages((prev) => ({
      ...prev,
      details: prev.details.filter((_, i) => i !== index),
    }));
  };

  const onchangeImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files, dataset } = e.target;
    if (!files?.length) return;

    const file = files[0];

    setImageFile((prev) => {
      if (name === "thumbnail") {
        return { ...prev, thumbnail: file };
      } else {
        const fileIndexDataset = dataset.imgIndex;
        if (fileIndexDataset === undefined) return prev;
        const fileIndex = Number(fileIndexDataset);

        const currentFileList = [...(prev.details ?? [])];

        const existingFile = currentFileList.find((f) => f.name === file.name);

        if (existingFile) {
          setCountImageDetailInput((prev) => prev - 1);
          return prev;
        }

        if (currentFileList[fileIndex]) {
          currentFileList[fileIndex] = file;
        } else {
          currentFileList.push(file);
        }
        return { ...prev, details: currentFileList };
      }
    });
  };

  const uploadImageFile = async () => {
    if (!imageFile.thumbnail)
      return dispatch(
        openModal({
          message: "Không có ảnh bìa nào được chọn!",
          state: ModalState.WARNING,
        })
      );
    if (imageFile.details.length == 0)
      return dispatch(
        openModal({
          message: "Không có ảnh chi tiết nào được chọn!",
          state: ModalState.WARNING,
        })
      );
    const dataUpload = {
      thumbnail: imageFile.thumbnail!,
      details: imageFile.details,
    };
    const imageUploaded = await uploadProductImage(dataUpload);

    const { message, success, data } = imageUploaded;
    if (success) {
      const { details, thumbnail } = data!;
      setImages((prev) => ({
        ...prev,
        thumbnail: thumbnail.url,
        details: details.map((detail) => detail.url),
      }));
    }
    return dispatch(
      openModal({
        message,
        state: success ? ModalState.SUCCESS : ModalState.ERROR,
      })
    );
  };

  const validateImages = (images: CreateProductImage) => {
    const result = { ok: true, message: "" };
    const { thumbnail, details } = images;
    if (!thumbnail) {
      result.message = "Chưa chọn ảnh bìa cho sản phẩm!";
      result.ok = false;
      return result;
    }
    if (!details.length) {
      result.message = "Chưa chọn ảnh chi tiết nào!";
      result.ok = false;
      return result;
    }
    details.forEach((file) => {
      if (!file) {
        result.message = "Chưa chọn ảnh chi tiết cho sản phẩm!";
        result.ok = false;
      }
    });
    return result;
  };

  return {
    images,
    setImages,
    imageFile,
    onchangeImages,
    addNewImageDetailInput,
    countImageDetailInput,
    removeImageDetailInput,
    uploadImageFile,
    validateImages,
  };
}
