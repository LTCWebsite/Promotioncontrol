import React, { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBFile,
} from "mdb-react-ui-kit";
import { useHistory } from "react-router";
// import { AxiosReq } from "MyApp/Components/Axios";
import Alert from "@mui/material/Alert";
// import { USER_KEY } from "../../../Constants";
import {
  Add,
  Checklist,
  CloudCircle,
  DriveFolderUploadRounded,
  Queue,
  Recommend,
  Upload,
} from "@mui/icons-material";
import { Grid, TextField } from "@mui/material";
import readXlsxFile from "read-excel-file";
import { Dropdown } from "primereact/dropdown";
import AxiosReq from "../../Components/Axios/AxiosReq";
import Lottie from "react-lottie-player";
import Loading from "../../Image/Lottie/Loading.json";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

import moment from "moment";

export default function DialogFirstAc({ isShow, onHide, data }) {
  //   const tokenData = JSON.parse(localStorage.getItem(USER_KEY));
  //   const header = {
  //     Authorization: `Bearer ${tokenData.token}`,
  //   };

  const his = useHistory();
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = useState(false);
  const [fileUpload, setFileUpload] = React.useState();
  const toast = useRef(null);
  const [isLoading, setLoading] = useState(false);

  const [slCode, setSLCode] = useState([]);
  const [slStart, setSLStart] = React.useState(dayjs("2023-04-17T15:30"));
  const [slStop, setSLStop] = React.useState(dayjs("2023-05-17T15:30"));
  const dateNow = new Date();

  console.log("Data:", data);

  console.log("STart", slStart);
  console.log("STop", slStop);

  const handleCloseAlert = () => {
    setAlert(false);
  };
  const handleUpLoad = () => {
    // setLoading(true);
    // console.log(fileUpload);
    let file = fileUpload;
    readXlsxFile(file).then((rows) => {
      // console.log("FIle:");

      // console.log("Code:", slCode);
      let data = [];
      rows.forEach((row) => {
        // console.log("Data file:", row);
        data.push({
          prmtId: slCode?.code,
          stop: row[0].toString(),
          start: row[0].toString(),
          startTime: slStart,
          stopTime: slStop,
          province: row[1],
        });
      });

      //add new msisid by File Exls
      // setDataExls(data);

      AxiosReq.post(
        `/api/Special_Package/InsertMSISDNToSpecialList`,
        [{ data }],
        {}
      ).then((res) => {
        if (res?.status === 200) {
          console.log("Succesful : ", res);
          onHide();
          setAlert(true);

          setTimeout(() => {
            setAlert(false);
          }, 3000);
        }
      });
    });
  };

  const option_Code = data?.map((x) => ({
    name: x.code,
    code: x.prmtId,
  }));

  // console.log("Start time:", slStart);
  // console.log("Stop Time:", slStop);

  return (
    <>
      {alert && (
        <Alert
          className="alert-wrapper "
          variant="filled"
          severity="success"
          onClose={handleCloseAlert}
        >
          <u>ທ່ານໄດ້ອັບໂຫລດສຳເລັດ !</u>
        </Alert>
      )}
      <Dialog
        open={isShow}
        style={{ width: "50vw", minWidth: 500 }}
        visible={isShow}
        onHide={() => {
          onHide(!isShow);
          //   addNew(true);
        }}
        item
      >
        <Grid item xs={12} lg="none">
          <Grid container item xs={12}>
            <Grid item xs={12} className="center-2">
              <u className="f-20 Success">
                ອັບໂຫລດໄຟລ ອັບເດດເບີໃຫມ່ <Queue />
              </u>
            </Grid>
            <Grid container className="center-2 mt-10" item xs={12} spacing={1}>
              <Grid item xs={4}>
                <div className="card flex justify-content-center">
                  <span className="span-head-select">
                    <u>Code :</u>
                  </span>
                  <Dropdown
                    value={slCode}
                    onChange={(e) => setSLCode(e.value)}
                    options={option_Code}
                    optionLabel="name"
                    editable
                    className="w-full md:w-14rem"
                    // defaultValue={{ value: "all", label: "ທັງໝົດ" }}
                    placeholder="ເລືອກເເຟ໋ກເກັດ"
                  />
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="justify-content-center">
                  <span className="span-head-select">
                    <u>Start Time:</u>
                  </span>
                  <Grid className="starttime">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <DateTimePicker
                          label="ເລືອກວັນທີເລີ່ມ"
                          onChange={(e) =>
                            setSLStart(
                              moment(e.toString()).format("YYYY-MM-DDTHH:mm:ss")
                            )
                          }
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className=" justify-content-center">
                  <span className="span-head-select">
                    <u>Stop Time:</u>
                  </span>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <DateTimePicker
                          label="ເລືອກວັນທີສິ້ນສຸດ"
                          className="DateStart"
                          onChange={(e) =>
                            setSLStop(
                              moment(e.toString()).format("YYYY-MM-DDTHH:mm:ss")
                            )
                          }
                          dateFormat="yyyy-MM-dd"
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} className="">
                <div className="center-2">
                  <MDBCard className="card-uploadfile ">
                    <MDBCardBody>
                      <MDBCardTitle>
                        {" "}
                        {/* <u className="center-2">ອັບໂຫລດໄຟລ</u> */}
                        <Grid item xs={12} className="center-2">
                          <DriveFolderUploadRounded className="icon-upload " />
                        </Grid>
                      </MDBCardTitle>

                      {/* < onClick={chooseFile}>Choose File</> */}
                      <Grid container className="center-2" item xs={12}>
                        <Grid item xs={12}>
                          <MDBCardText className="center-2">
                            <u>ເລືອກ​ໄຟລຂອງທ່ານ : </u>
                          </MDBCardText>
                        </Grid>
                        <Grid item xs={12} className="center-2">
                          <TextField
                            type="file"
                            // onChange={onUpload}
                            className="btn-uploadfile1"
                            onChange={(e) => setFileUpload(e.target.files[0])}
                          />
                        </Grid>
                      </Grid>
                    </MDBCardBody>
                  </MDBCard>
                </div>
              </Grid>
            </Grid>
          </Grid>
          {isLoading ? (
            <Grid className="Loading loading-size">
              <Lottie
                loop
                animationData={Loading}
                play
                style={{ width: "100px", height: "100px" }}
              />
            </Grid>
          ) : (
            <Grid item xs={6}>
              <div className="center-2 ">
                <MDBBtn
                  lassName="me-1"
                  color="success"
                  className="btn-confirm mt-20"
                  label="Show"
                  icon="pi pi-external-link"
                  onClick={handleUpLoad}
                >
                  <u className="f-20"> ຢືນຢັນ</u>
                </MDBBtn>
              </div>
            </Grid>
          )}
        </Grid>
      </Dialog>
    </>
  );
}
