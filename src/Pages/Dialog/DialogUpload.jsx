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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function DialogUpload({ isShow, onHide, data }) {
  const inputRef = useRef(null);
  //   const tokenData = JSON.parse(localStorage.getItem(USER_KEY));
  //   const header = {
  //     Authorization: `Bearer ${tokenData.token}`,
  //   };

  const his = useHistory();
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = useState(false);
  const [PrmtID, setPrmtID] = useState("");
  const [Phonenumber, setPhonenumber] = useState("");
  const [StartTime, setStartTime] = useState("");
  const [StopTime, setStopTime] = useState("");
  const [Province, setProvince] = useState("");
  const [fileUpload, setFileUpload] = React.useState();
  const toast = useRef(null);
  const [isLoading, setLoading] = useState(false);

  const [slCode, setSLCode] = useState([]);
  const [slStart, setSLStart] = React.useState(dayjs("2022-04-17T15:30"));
  const [slStop, setSLStop] = React.useState(dayjs("2022-04-17T15:30"));
  const [dataExls, setDataExls] = useState([]);

  console.log("Start time:", slStart);
  console.log("Start time:", slStop);

  console.log("Data:", data);

  const handleCloseAlert = () => {
    setAlert(false);
  };
  const handleUpLoad = () => {
    setLoading(true);
    // console.log(fileUpload);
    let file = fileUpload;
    readXlsxFile(file).then((rows) => {
      // console.log("FIle:");

      console.log("Code:", slCode);
      let data = [];
      rows.forEach((row) => {
        console.log("Data file:", row);
        data.push({
          prmtId: slCode,
          stop: row[0],
          start: row[0],
          startTime: row[3],
          stopTime: row[4],
          province: row[1],
        });
      });
      setDataExls(data);
      console.log("Data:", data);
    });
    //add new msisid by File Exls
    AxiosReq.post(
      `/api/Special_Package/InsertMSISDNToSpecialList`,
      [{ dataExls }],
      {}
    ).then((res) => {
      if (res?.status === 200) {
        setLoading(false);
      }
    });
  };

  const option_Code = data?.map((x) => ({
    name: x.code,
    code: x.prmtId,
  }));

  return (
    <>
      {alert && (
        <Alert
          className="alert-wrapper "
          variant="filled"
          severity="success"
          onClose={handleCloseAlert}
        >
          <u>ທ່ານໄດ້ຢືນຢັນສຳເລັດ !</u>
        </Alert>
      )}
      {/* {isLoading ? (
        <Grid className="Loading loading-size">
          <Lottie
            loop
            animationData={Loading}
            play
            style={{ width: "300px", height: "300px" }}
          />
        </Grid>
      ) : null} */}
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
                ອັບໂຫລດໄຟລ <Queue />
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
                          value={slStart}
                          onChange={(e) => setSLStart(e.target.value)}
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
                          value={slStop}
                          className="DateStart"
                          onChange={(e) => setSLStop(e.value)}
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
                        <u className="center-2">ອັບໂຫລດໄຟລ</u>
                        <Grid item xs={12} className="center-2">
                          <DriveFolderUploadRounded className="icon-upload " />
                        </Grid>
                      </MDBCardTitle>

                      {/* < onClick={chooseFile}>Choose File</> */}
                      <Grid container className="center-2" item xs={12}>
                        <Grid item xs={12}>
                          <MDBCardText className="center-2">
                            <u>​ໄຟລຂອງທ່ານ : </u>
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
        </Grid>
      </Dialog>
    </>
  );
}
