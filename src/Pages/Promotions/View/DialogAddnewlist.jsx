import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { MDBBtn } from "mdb-react-ui-kit";

// import checklist from "./../../Assets/Images/checklist.png";
// import { Close } from "@material-ui/icons";
import { useHistory } from "react-router";
import { Grid } from "@mui/material";

export default function DialogAddnewlist({ isShow, onHide }) {
  const his = useHistory();

  const backStart = () => {
    his.push("/app/dashboard");
    onHide();
  };
  return (
    <Dialog
      style={{ width: "50vw", minWidth: 500 }}
      visible={isShow}
      onHide={onHide}
      item
    >
      <Grid item xs={12} lg="none">
        <Grid item xs={12}>
          <Grid item xs={12} className="center-2">
            {/* <img src={checklist} width="80px" height="80px" /> */}
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <h3 className="icon-image"></h3>
          </Grid>
          <Grid item xs={12} className="center-2">
            <h2>ທ່ານໄດ້ສົ່ງແບບຟອມປະເມີນສຳເລັດແລ້ວ</h2>
          </Grid>
          <Grid className="center-2" item xs={12}>
            <h4 className="m-0 ">
              ຂໍຂອບໃຈສຳລັບການປະເມີນແບບຟອມຂອງທ່ານ, ມັນມີຜົນດີສຳລັບພວກເຮົາຫລາຍ!
            </h4>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div className="center-2 ">
            <MDBBtn
              lassName="me-1"
              className="btn-succes btn-back1 btn-successful"
              label="Show"
              icon="pi pi-external-link"
              onClick={backStart}
            >
              ປິດ
            </MDBBtn>
          </div>
        </Grid>
      </Grid>
    </Dialog>
  );
}
