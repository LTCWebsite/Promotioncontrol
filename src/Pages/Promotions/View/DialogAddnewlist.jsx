import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { MDBBtn } from "mdb-react-ui-kit";
import { useHistory } from "react-router";
// import { AxiosReq } from "MyApp/Components/Axios";
import Alert from "@mui/material/Alert";
import { USER_KEY } from "../../../Constants";
import { Checklist, Recommend } from "@mui/icons-material";
import AxiosReq from "../../../Components/Axios/AxiosReq";
import { Grid } from "@mui/material";

export default function DialogAddnewlist({ isShow, onHide, addNew }) {
  const his = useHistory();
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = useState(false);

  // console.log("ScoreS:", score);

  const handleApprove = () => {
    // isLoading(true);
    AxiosReq.post(
      `/api/Special_Package/InsertMSISDNToSpecialList`,
      {
        prmtId: "Test1",
        start: "2022-05-16T20:22:00",
        stop: "2022-12-31T23:59:59",
        startTime: "2022-05-16T20:22:00",
        stopTime: "2022-12-31T23:59:59",
        province: "VTE",
      },
      {
        // headers: header,
      }
    ).then((res) => {
      if (res?.status === 200) {
        // isLoading(false);
      }
    });
  };

  useEffect(() => {
    handleApprove();
  }, []);

  const handleCloseAlert = () => {
    setAlert(false);
  };

  useEffect(() => {
    if (alert) {
      const timeout = setTimeout(() => {
        setAlert(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [alert]);

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
        style={{ width: "50vw", minWidth: 500 }}
        visible={isShow}
        onHide={() => {
          onHide(!isShow);
          addNew(true);
        }}
        item
      >
        <Grid item xs={12} lg="none">
          <Grid item xs={12}>
            <Grid item xs={12} className="center-2">
              {/* <img src={Checklist} width="80px" height="80px" /> */}
              <Recommend className="icon-confirme" />
            </Grid>
          </Grid>
          <Grid container item xs={12} className="center-2">
            <Grid item xs={12}>
              <h3 className="icon-image"></h3>
            </Grid>
            <Grid item xs={12} className="center-2">
              <u>ທ່ານແນ່ໃຈແລ້ວບໍທີ່ຈະອະນຸມັດ...?</u>
            </Grid>
            <Grid className="center-2" item xs={12}>
              <u className="m-0 center-2">
                ກະລຸນາກວດສອບໃຫ້ແນ່ໃຈກ່ອນການອະນຸມັດທຸກຄັ້ງ!
              </u>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div className="center-2 ">
              <MDBBtn
                lassName="me-1"
                color="success"
                className="btn-back1 btn-successful"
                label="Show"
                icon="pi pi-external-link"
                onClick={handleApprove}
              >
                ຢືນຢັນ
              </MDBBtn>
            </div>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
