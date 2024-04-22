import {
  Grid,
  Typography,
  Button,
  TextField,
  Fade,
  Tooltip,
  Slider,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import SaveIcon from "@mui/icons-material/Save";
import Cropper from "react-easy-crop";
import CloseIcon from "@mui/icons-material/Close";
import AWS from "aws-sdk";
import ImageIcon from "@mui/icons-material/Image";
import { axiosBaseInstance } from "../../../Service/axios-instance";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "20px !important",
    fontFamily: "Montserrat !important",
    fontWeight: "900 !important",
    color: "#4690CD",
  },
  sub_title: {
    fontSize: "16px !important",
    fontFamily: "Montserrat !important",
    fontWeight: "900 !important",
    color: "#777B7E",
  },

  grid_chargebee_actions: {
    width: "100%",
    flexWrap: "nowrap",

    background: "transparent",
    gap: 10,
  },
  grid_chargebee_action: {
    width: "100% !important",
    padding: "20px  !important",
    gap: "10px  !important",
    flexWrap: "nowrap !important",
    borderRadius: "10px  !important",

    "&:hover": {
      background: "#00000012 !important",
      cursor: "pointer",

      "&:hover $chargebee_arrow_icon": {
        opacity: 1,
      },
    },
  },
  grid_chargebee_action_icon: {
    width: "10% !important",
    display: "flex !important",
    alignItems: "center !important",
    justifyContent: "center !important",
  },
  chargebee_action_icon: {
    width: "18px  !important",
    height: "18px  !important",
  },
  grid_chargebee_arrow: {
    width: "100% !important",
    display: "flex !important",
    alignItems: "center !important",
    justifyContent: "flex-end !important",
  },
  chargebee_arrow_icon: {
    width: "18px  !important",
    height: "18px  !important",
    opacity: 0,
    color: "#31313A",
    transition: "opacity 1s",
  },
  grid_chargebee_action_text: {
    width: "100% !important",
    display: "flex !important",
    alignItems: "center !important",
    justifyContent: "flex-start !important",
  },
  chargebee_action_text: {
    fontSize: "16px !important",
    fontFamily: "montserrat !important",
    color: "#31313A !important",
    fontWeight: "900 !important",
  },

  default_image_container: {
    position: "relative",
    "&:hover": {
      opacity: 0.7,
      cursor: "pointer",

      "& $edit_image": {
        opacity: 1,
      },
    },
  },
  default_image: {
    width: "136px",
    height: "136px",
    background:
      "transparent url('img/Justin-DP.png') 0% 0% no-repeat padding-box",
    borderRadius: 75,

    // "&:hover": {
    //   opacity: 0.7,
    //   cursor: "pointer",
    //
    //   "& $edit_image": {
    //     opacity: 1,
    //   },
    // },
  },
  edit_image: {
    transition: ".5s ease !important",
    opacity: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
    color: "white",
  },
}));
const SettingProfile = ({ customer }) => {
  const classes = useStyles();
  const { user } = useAuth0();

  const [updateUser, setUpdateUser] = useState(user);
  const [chargebee, setChargebee] = useState(null);

  const handleUserNameChange = (event) => {
    setUpdateUser({ ...updateUser, name: event.target.value });
  };

  const handleUserNicknameChange = (event) => {
    setUpdateUser({ ...updateUser, nickname: event.target.value });
  };

  const handleUserEmailChange = (event) => {
    setUpdateUser({ ...updateUser, email: event.target.value });
  };

  const handleUpdateUser = () => {
    const updateUserAuth0 = async () => {
      try {
        const response = await axiosBaseInstance.put(
          "/customer/auth0",
          {
            email: updateUser.email,
            name: updateUser.name,
            nickname: updateUser.nickname,
          },
          {
            params: {
              user_id: user.sub,
            },
          },
        );
        window.location.reload(true);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    updateUserAuth0();
  };

  const areFieldsIdentical = (obj1, obj2, fields) => {
    for (const field of fields) {
      if (obj1[field] !== obj2[field]) {
        return false;
      }
    }
    return true;
  };

  //============================================================================
  // Image Crop
  //============================================================================
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        selectedImage,
        croppedAreaPixels,
        0,
      );
      setCroppedImage(croppedImage);

      const base64String = croppedImage.split(",")[1];

      // Convert base64 to binary
      const binaryData = atob(base64String);

      //------------------------------------------------------------------------
      // Test cropped image download
      //------------------------------------------------------------------------
      // Create a Uint8Array from the binary data
      const uint8Array = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
      }
      //
      // // Create a Blob from the Uint8Array
      // const blob = new Blob([uint8Array], { type: "application/octet-stream" });
      //
      // // Create a Blob URL
      // const blobUrl = URL.createObjectURL(blob);
      //
      // // Create an anchor element for downloading
      // const a = document.createElement("a");
      // a.href = blobUrl;
      // a.download = "profile.jpeg"; // Set your desired filename here
      //
      // // Trigger a click event on the anchor element to start the download
      // a.click();
      //
      // // Cleanup: Revoke the Blob URL after the download
      // URL.revokeObjectURL(blobUrl);
      try {
        AWS.config.update({
          region: "us-east-1",
          accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
          secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
        });

        const S3 = new AWS.S3();
        const params = {
          Bucket: `${process.env.REACT_APP_CUSTOMER_BUCKET}`,
          Key: `${customer._id}`,
          Body: uint8Array,
          ContentEncoding: "base64",
          ContentType: "image/jpeg", // Adjust the content type as needed
          ACL: "public-read", // Make the uploaded file public
        };

        const responseS3 = await S3.upload(params).promise();
        if (responseS3.Location) {
          const response = await axiosBaseInstance.put(
            "/customer/auth0/image",
            {
              url: responseS3.Location,
              name: updateUser.name,
              nickname: updateUser.nickname,
            },
            {
              params: {
                user_id: user.sub,
              },
            },
          );
          setProfileImage(response.data.user.picture);
          setUpdateUser({ ...updateUser, picture: response.data.user.picture });
          setSelectedImage(null);
        }
      } catch (error) {
        console.error(error);
      }
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
      image.src = url;
    });

  const getRadianAngle = (degreeValue) => {
    return (degreeValue * Math.PI) / 180;
  };
  const rotateSize = (width, height, rotation) => {
    const rotRad = getRadianAngle(rotation);

    return {
      width:
        Math.abs(Math.cos(rotRad) * width) +
        Math.abs(Math.sin(rotRad) * height),
      height:
        Math.abs(Math.sin(rotRad) * width) +
        Math.abs(Math.cos(rotRad) * height),
    };
  };

  const getCroppedImg = async (imageSrc, pixelCrop, flip) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }

    // const rotRad = getRadianAngle(rotation);

    // calculate bounding box of the rotated image
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
      image.width,
      image.height,
      0, // rotation
    );

    // set canvas size to match the bounding box
    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    // translate canvas context to a central location to allow rotating and flipping around the center
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    // ctx.rotate(rotRad);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-image.width / 2, -image.height / 2);

    // draw rotated image
    ctx.drawImage(image, 0, 0);

    const croppedCanvas = document.createElement("canvas");

    const croppedCtx = croppedCanvas.getContext("2d");

    if (!croppedCtx) {
      return null;
    }

    // Set the size of the cropped canvas
    croppedCanvas.width = pixelCrop.width;
    croppedCanvas.height = pixelCrop.height;

    // Draw the cropped image onto the new canvas
    croppedCtx.drawImage(
      canvas,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    );

    // As Base64 string
    return croppedCanvas.toDataURL("image/jpeg");

    // As a blob
    return new Promise((resolve, reject) => {
      croppedCanvas.toBlob((file) => {
        resolve(URL.createObjectURL(file));
      }, "image/jpeg");
    });
  };

  //============================================================================
  // Image Select
  //============================================================================
  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(updateUser.picture);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSelectImage = () => {
    fileInputRef.current.click();
  };

  //============================================================================
  // Main Render
  //============================================================================
  return (
    <Grid item id="personal-anchor" style={{ width: "100%" }}>
      <Fade key={`personal_card`} in={true} timeout={2000}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{
            width: "100%",
            padding: "20px",
            gap: 15,
          }}
        >
          <Grid item style={{ width: "100%" }}>
            <Typography className={classes.title}>Personal Info</Typography>
          </Grid>

          <Grid item style={{ width: "100%" }}>
            <Typography className={classes.sub_title}>
              Update your photo and personal details here
            </Typography>
          </Grid>

          <Grid item style={{ width: "100%" }}>
            <Grid
              container
              spacing={0}
              direction="row"
              alignItems="center"
              justifyContent="center"
              style={{
                width: "100%",
                paddingTop: 20,
                paddingBottom: 20,
                flexWrap: "nowrap",
                gap: 20,
              }}
            >
              <Grid item style={{}}>
                {selectedImage ? (
                  <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{
                      width: "100%",
                      // height: "100%",
                      // padding: "20px",
                      // gap: 20,
                    }}
                  >
                    <Grid
                      item
                      style={{
                        width: "100%",
                        width: 200,
                        height: 200,
                        position: "relative",
                      }}
                    >
                      <Cropper
                        image={selectedImage}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        cropShape="round"
                        showGrid={false}
                        onCropChange={onCropChange}
                        onCropComplete={onCropComplete}
                        onZoomChange={onZoomChange}
                        style={{
                          containerStyle: {
                            maxWidth: 200,
                            maxHeight: 200,
                            display: "flex",
                            width: "100%",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item style={{ width: "100%" }}>
                      <Slider
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby="Zoom"
                        onChange={(e, zoom) => onZoomChange(zoom)}
                        classes={{ container: "slider" }}
                      />
                    </Grid>

                    <Grid item style={{ width: "100%" }}>
                      <Grid
                        container
                        spacing={0}
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        style={{
                          width: "100%",
                          flexWrap: "nowrap",
                          gap: 10,
                        }}
                      >
                        <Grid item>
                          <Button
                            sx={{
                              borderRadius: 100,
                              border: "none",
                              height: "33px",
                              minWidth: "100px",
                              border: "1px solid #D3D3D3",
                              background: "white",
                              ":hover": {
                                opacity: 0.6,
                              },

                              ":disabled": {
                                background: "grey",
                                color: "white",
                              },

                              fontSize: 12,
                              fontFamily: "montserrat",
                              fontWeight: 900,
                              color: "#3E454B",
                              textWrap: "nowrap",
                              paddingLeft: 3,
                              paddingRight: 3,
                            }}
                            onClick={() => setSelectedImage(null)}
                          >
                            <CloseIcon style={{ fontSize: 16 }} />
                          </Button>
                        </Grid>

                        <Grid item>
                          <Button
                            sx={{
                              borderRadius: 100,
                              border: "none",
                              height: "33px",
                              minWidth: "100px",
                              border: "none",
                              background:
                                "transparent linear-gradient(118deg, #4699CF 0%, #4673C4 100%) 0% 0% no-repeat padding-box",
                              ":hover": {
                                opacity: 0.6,
                              },

                              ":disabled": {
                                background: "grey",
                                color: "white",
                              },

                              fontSize: 12,
                              fontFamily: "montserrat",
                              fontWeight: 900,
                              color: "white",
                              textWrap: "nowrap",
                              paddingLeft: 3,
                              paddingRight: 3,
                            }}
                            onClick={showCroppedImage}
                          >
                            <SaveIcon style={{ fontSize: 16 }} />
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                ) : (
                  <div className={classes.default_image_container}>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />

                    <img
                      className={classes.default_image}
                      src={profileImage ?? "/static/user-big.png"}
                      onClick={handleSelectImage}
                    />
                    <ImageIcon className={classes.edit_image} />
                  </div>
                )}
              </Grid>

              <Grid item style={{ width: "100%" }}>
                <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  style={{
                    width: "100%",
                    flexWrap: "nowrap",
                    gap: 10,
                  }}
                >
                  <Grid item style={{ width: "100%" }}>
                    <Grid
                      container
                      spacing={0}
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      style={{
                        width: "100%",
                        flexWrap: "nowrap",
                        gap: 10,
                      }}
                    >
                      <Grid
                        item
                        style={{
                          width: "100%",
                          flexDirection: "column !important",
                        }}
                      >
                        <Typography className={classes.label}>Name:</Typography>
                        <TextField
                          fullWidth
                          type="text"
                          id="name"
                          value={updateUser.name}
                          onChange={(e) => handleUserNameChange(e)}
                          inputProps={{
                            style: {
                              fontSize: 12,
                              fontFamily: "Montserrat",
                              fontWeight: 900,
                            },
                          }}
                          InputProps={{
                            sx: { borderRadius: "10px" },
                          }}
                        />
                      </Grid>

                      <Grid
                        item
                        style={{
                          width: "100%",
                          flexDirection: "column !important",
                        }}
                      >
                        <Typography className={classes.label}>
                          Nickname:
                        </Typography>
                        <TextField
                          fullWidth
                          type="text"
                          id="nickname"
                          value={updateUser.nickname}
                          onChange={(e) => handleUserNicknameChange(e)}
                          inputProps={{
                            style: {
                              fontSize: 12,
                              fontFamily: "Montserrat",
                              fontWeight: 900,
                            },
                          }}
                          InputProps={{
                            sx: { borderRadius: "10px" },
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    style={{
                      width: "100%",
                      flexDirection: "column !important",
                    }}
                  >
                    <Typography className={classes.label}>Email:</Typography>
                    <TextField
                      fullWidth
                      type="text"
                      id="email"
                      value={updateUser.email}
                      onChange={(e) => handleUserEmailChange(e)}
                      inputProps={{
                        style: {
                          fontSize: 12,
                          fontFamily: "Montserrat",
                          fontWeight: 900,
                        },
                      }}
                      InputProps={{
                        sx: { borderRadius: "10px" },
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item style={{ width: "100%" }}>
            <Grid
              container
              spacing={0}
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              style={{
                width: "100%",
                flexWrap: "nowrap",
                gap: 10,
                padding: "20px",
              }}
            >
              <Grid item style={{}}>
                <Button
                  disabled={areFieldsIdentical(user, updateUser, [
                    "email",
                    "name",
                    "nickname",
                  ])}
                  sx={{
                    borderRadius: 100,
                    border: "none",
                    height: "33px",
                    minWidth: "150px",
                    border: "1px solid #D3D3D3",
                    background: "white",
                    ":hover": {
                      opacity: 0.6,
                    },

                    ":disabled": {
                      background: "grey",
                      color: "white",
                    },

                    fontSize: 12,
                    fontFamily: "montserrat",
                    fontWeight: 900,
                    color: "#3E454B",
                    textWrap: "nowrap",
                    paddingLeft: 3,
                    paddingRight: 3,
                    textTransform: "none",
                  }}
                  // endIcon={<SaveIcon />}
                  onClick={() => {
                    setUpdateUser(user);
                  }}
                >
                  Cancel
                </Button>
              </Grid>

              <Grid item style={{}}>
                <Tooltip
                  title="Clicking this button will prompt a re-login"
                  placement="top"
                >
                  <Button
                    disabled={areFieldsIdentical(user, updateUser, [
                      "email",
                      "name",
                      "nickname",
                    ])}
                    sx={{
                      borderRadius: 100,
                      border: "none",
                      height: "33px",
                      minWidth: "150px",
                      border: "none",
                      background:
                        "transparent linear-gradient(118deg, #4699CF 0%, #4673C4 100%) 0% 0% no-repeat padding-box",
                      ":hover": {
                        opacity: 0.6,
                      },

                      ":disabled": {
                        background: "grey",
                        color: "white",
                      },

                      fontSize: 12,
                      fontFamily: "montserrat",
                      fontWeight: 900,
                      color: "white",
                      textWrap: "nowrap",
                      paddingLeft: 3,
                      paddingRight: 3,
                      textTransform: "none",
                    }}
                    endIcon={
                      <SaveIcon
                        style={{
                          fontSize: 16,
                        }}
                      />
                    }
                    onClick={handleUpdateUser}
                  >
                    Save
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fade>
    </Grid>
  );
};

SettingProfile.propTypes = {
  customer: PropTypes.object.isRequired,
};

export default SettingProfile;
