import React from "react";
import { Modal, Grid, Container } from "@material-ui/core";
import "./ImageModal.css";

function ImageModal({ imageUrl, open, setOpen }) {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Container spacing={12} maxWidth="xl">
        {/* <Grid item xs={12} sm={12} md={8} lg={8}> */}
        <div className="image_modal_container" onClick={() => setOpen(false)}>
          <img className="image_modal_image" src={imageUrl} alt="" />
        </div>
        {/* </Grid> */}
      </Container>
    </Modal>
  );
}

export default ImageModal;
