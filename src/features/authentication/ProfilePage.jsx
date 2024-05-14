// import { useState } from "react";

import { useState } from "react";
import { useUpdateUser } from "./hooks/useUpdateUser";

import useUser from "./hooks/useUser";

import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Spinner from "../../ui/Spinner";

function ProfilePage() {
  const [fullName, setfullName] = useState("");
  const [password, setpassword] = useState("");
  const { updateUser, isUpdating } = useUpdateUser();
  const { user } = useUser();
  const { avatar: userPic } = user?.user_metadata;
  const [avatar, setAvatar] = useState(userPic);
  const [file, setFile] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    let avatar = file;
    updateUser(
      { fullName, password, avatar },
      {
        onSettled: () => {
          setFile(null);
          setfullName("");
          setpassword("");
        },
      }
    );
  }

  if (isUpdating) {
    return <Spinner />;
  }

  function handleUpload(file) {
    if (file) {
      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.addEventListener("load", () => {
        let url = reader.result;

        setAvatar(url);
      });
    }
  }
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box noValidate sx={{ mt: 1 }}>
          <Avatar alt="User Photo" sx={{ width: 56, height: 56 }}>
            <img
              src={userPic !== "" ? userPic : `./img/default-user.jpg`}
              alt="user-pic"
            />
          </Avatar>
          <TextField
            margin="normal"
            id="fullName"
            label=""
            name="name"
            disabled
            value={user?.user_metadata?.fullName}
            InputLabelProps={{
              style: {
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                fontSize: "15px",
              },
            }}
            inputProps={{
              style: {
                width: "350px",
                height: "20px",
              },
            }}
          />
          <br />
          <TextField
            disabled
            value={user?.user_metadata?.email}
            margin="normal"
            name="email"
            label=""
            type="email"
            id="email"
            InputLabelProps={{
              style: {
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                fontSize: "15px",
              },
            }}
            inputProps={{
              style: {
                width: "350px",
                height: "20px",
              },
            }}
          />
        </Box>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box noValidate sx={{ mt: 1 }}>
            <Avatar alt="User Photo" sx={{ width: 56, height: 56 }}>
              <img src={avatar || "./img/default-user.jpg"} alt="user-pic" />
            </Avatar>

            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={(e) => {
                handleUpload(e.target.files[0]);
                setFile(e.target.files[0]);
              }}
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span">
                Upload
              </Button>
            </label>

            <br />
            <TextField
              margin="normal"
              id="newName"
              label="newName"
              name="name"
              value={fullName}
              onChange={(e) => setfullName(e.target.value)}
              InputLabelProps={{
                style: {
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  fontSize: "15px",
                },
              }}
              inputProps={{
                style: {
                  width: "350px",
                  height: "20px",
                },
              }}
            />
            <br />
            <TextField
              margin="normal"
              id="newPassword"
              label="newPassword"
              name="name"
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              InputLabelProps={{
                style: {
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  fontSize: "15px",
                },
              }}
              inputProps={{
                style: {
                  width: "350px",
                  height: "20px",
                },
              }}
            />
            <br />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              UpDate User
            </Button>
          </Box>
        </Box>
      </form>
    </Grid>
  );
}

export default ProfilePage;
