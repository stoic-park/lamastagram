import React from "react";
import { Modal, Grid, Container } from "@material-ui/core";
import "./ImageModal.css";

function ImageModal({ imageUrl, open, setOpen }) {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Container maxWidth="xl">
        <Grid
          container
          spacing={12}
          xs={12}
          sm={12}
          md={8}
          lg={8}
          // style={modalStyle}
          // className={classes.paper}
          className="post_modal_container"
        >
          <div className="image_modal_container" onClick={() => setOpen(false)}>
            <img className="image_modal_image" src={imageUrl} alt="" />
          </div>
        </Grid>
      </Container>
    </Modal>
  );
}

export default ImageModal;
