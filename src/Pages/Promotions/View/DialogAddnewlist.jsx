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

export default function DialogAddnewlist({ isShow, onHide, addNew }) {
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

  // console.log("ScoreS:", score);

  console.log("PrmtID:", PrmtID);
  console.log("Phone:", Phonenumber);
  console.log("Startime:", StartTime);
  console.log("Stoptime:", StopTime);
  console.log("Province:", Province);

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
        style={{ width: "40vw", minWidth: 500 }}
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
                    <u className="pdr-30">PrmtID:</u>
                  </span>
                  <InputText
                    placeholder="PrmtID ..."
                    onChange={(e) => setPrmtID(e.target.value)}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <u className="pdr-30"> Phone :</u>
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
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <u>Start Time:</u>
                  </span>
                  <InputText
                    placeholder="Start Time ..."
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <u>Stop Time:</u>
                  </span>
                  <InputText
                    placeholder="Stop Time:"
                    onChange={(e) => setStopTime(e.target.value)}
                  />
                </div>
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
