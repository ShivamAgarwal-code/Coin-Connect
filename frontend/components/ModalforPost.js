import PostForm from "@/components/PostForm";

export const ModalforPost = ({ onClose, imageComponent }) => {
  return (
    <div className="modal-overlay z-20">
      <PostForm onCancel={onClose} imageComponent={imageComponent} />
    </div>
  );
};
