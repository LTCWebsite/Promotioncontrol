import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { MDBBtn } from "mdb-react-ui-kit";
import { useHistory } from "react-router";
// import { AxiosReq } from "MyApp/Components/Axios";
import Alert from "@mui/material/Alert";
import { USER_KEY } from "../../../Constants";
import { Add, Checklist, Queue, Recommend } from "@mui/icons-material";
import AxiosReq from "../../../Components/Axios/AxiosReq";
import { Grid } from "@mui/material";
import { InputText } from "primereact/inputtext";
import dayjs from "dayjs";
import { Dropdown } from "primereact/dropdown";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

export default function DialogAddnewlist({ isShow, onHide, addNew, data }) {
  const tokenData = JSON.parse(localStorage.getItem(USER_KEY));
  const header = {
    Authorization: `Bearer ${tokenData.token}`,
  };

  const his = useHistory();
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = useState(false);
  const [PrmtID, setPrmtID] = useState("");
  const [Phonenumber, setPhonenumber] = useState("");
  const [StartTime, setStartTime] = useState("");
  const [StopTime, setStopTime] = useState("");
  const [Province, setProvince] = useState("");
  const [slCode, setSLCode] = useState([]);
  const [slStart, setSLStart] = React.useState(dayjs("2023-04-17T15:30"));
  const [slStop, setSLStop] = React.useState(dayjs("2023-05-17T15:30"));

  // console.log("ScoreS:", score);

  console.log("PrmtID:", PrmtID);
  console.log("Phone:", Phonenumber);
  console.log("Startime:", StartTime);
  console.log("Stoptime:", StopTime);
  console.log("Province:", Province);

  const option_Code = data?.map((x) => ({
    name: x.code,
    code: x.prmtId,
  }));

  const handleSelectDateStart = () => {
    setSLStart(slStart);
  };
  const handleSelectDateStop = () => {
    setSLStop(slStop);
  };

  const handleAppnewlist = () => {
    AxiosReq.post(
      `/api/Special_Package/InsertMSISDNToSpecialList`,
      [
        {
          prmtId: PrmtID,
          start: Phonenumber,
          stop: Phonenumber,
          startTime: StartTime,
          stopTime: StopTime,
          province: Province,
        },
      ],
      { headers: header }
    ).then((res) => {
      if (res?.status === 200) {
        // isLoading(false);
        setAlert(true);
        console.log("Successful...");
        onHide();
      }
    });
  };

  useEffect(() => {
    handleAppnewlist();
  }, []);

  const handleCloseAlert = () => {
    setAlert(false);
  };

  if (alert) {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }

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
      <Dialog
        open={isShow}
        style={{ width: "60vw", minWidth: "50vw" }}
        visible={isShow}
        onHide={() => {
          onHide(!isShow);
          addNew(true);
        }}
        item
      >
        <Grid item xs={12} lg="none">
          <Grid item xs={12}>
            <Grid item xs={12}></Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12} className="center-2">
              <u className="f-20 Success">
                ເພິ່ມເບີພິເສດໃໝ່ <Queue />
              </u>
            </Grid>
            <Grid container className="center-2 mt-10" item xs={12} spacing={2}>
              <Grid item xs={6}>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <u className="pdr-42">Code : </u>
                  </span>
                  <Dropdown
                    value={slCode}
                    onChange={(e) => setSLCode(e.value)}
                    options={option_Code}
                    optionLabel="name"
                    editable
                    // defaultValue={{ value: "all", label: "ທັງໝົດ" }}
                    placeholder="ເລືອກເເຟ໋ກເກັດ"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <u className="pdr-35"> Phone :</u>
                  </span>
                  <InputText
                    placeholder="Phonenumber ..."
                    onChange={(e) => setPhonenumber(e.target.value)}
                  />
                </div>
              </Grid>
            </Grid>
            <Grid container className="center-2 mt-10" item xs={12} spacing={2}>
              <Grid item xs={6}>
                <Grid container item xs={12} className="p-inputgroup">
                  <Grid item xs={12}>
                    <div className="p-inputgroup ">
                      <span className=" p-inputgroup-addon hight-startime">
                        <u className="font-12 ">Start Time:</u>
                      </span>
                      <div className="p-inputgroup-addon date-start">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DateTimePicker"]}>
                            <DateTimePicker
                              value={slStart}
                              className="DateStart"
                              onChange={handleSelectDateStart}
                              dateFormat="yyyy-MM-dd"
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </div>
                    </div>
                  </Grid>

                  {/* <InputText
                    placeholder="Start Time ..."
                    onChange={(e) => setStartTime(e.target.value)}
                  /> */}
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <Grid item xs={12}>
                  <div className="p-inputgroup ">
                    <span className=" p-inputgroup-addon hight-startime">
                      <u className="font-12 pdr-60">Start Time:</u>
                    </span>
                    <div className="p-inputgroup-addon date-start">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DateTimePicker"]}>
                          <DateTimePicker
                            value={slStart}
                            className="DateStart"
                            onChange={handleSelectDateStart}
                            dateFormat="yyyy-MM-dd"
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid container className="center-2 mt-10" item xs={12} spacing={2}>
              <Grid item xs={12}>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <u className="pdr-16"> Province:</u>
                  </span>
                  <InputText
                    placeholder="Province..."
                    onChange={(e) => setProvince(e.target.value)}
                  />
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
                onClick={handleAppnewlist}
              >
                <u className="f-15"> ຢືນຢັນ</u>
              </MDBBtn>
            </div>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
