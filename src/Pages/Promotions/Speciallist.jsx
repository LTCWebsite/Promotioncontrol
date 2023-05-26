import React, { useState } from "react";
import { Grid } from "@mui/material";
import { IconSearch } from "../Icon/Icon";
import OtherSelect from "react-select";
import { Button, TextField, Typography, InputAdornment } from "@mui/material";
import { MDBBtn } from "mdb-react-ui-kit";

function Speciallist() {
  const [getVIP, setGetVIP] = useState("all");
  const [dataVIPType, setDataVIPType] = useState([]);
  const [getNetwork, setGetNetwork] = useState("all");
  const [networkType, setnetworkType] = useState([]);
  const [search, setSearch] = useState("");

  function getValueVIP(e) {
    setGetVIP(e.value);
    // console.log(e.value)
  }

  function getValueNetwork(e) {
    setGetNetwork(e.value);
    // console.log(e.value)
  }

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: state.selectProps.menuColor,
      fontSize: "15px",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";
      return { ...provided, opacity, transition };
    },
    control: (base) => ({
      ...base,
      borderRadius: "7px",
      textAlign: "center",
    }),
  };

  const option_VIP = dataVIPType.map((x) => ({
    value: x.viptype,
    label: x.viptype,
  }));

  const option_NetworkTpre = networkType.map((x) => ({
    value: x.viptype,
    label: x.viptype,
  }));

  return (
    <>
      <Grid container className="head-model">
        <Grid className="main" item xs={12}>
          <u>ຂໍ້ມູນເບີເເພັກເກັດພິເສດ</u>
          <Grid xs={12} spacing={3}>
            <div
              style={{ display: "flex", padding: ".5rem", marginTop: "20px" }}
              className="wapper-manage"
            >
              <Grid xs={2}>
                <div>
                  <p className="manage-ft-text">ປະເພດ</p>
                  <OtherSelect
                    options={option_VIP}
                    defaultValue={{ value: "all", label: "ທັງໝົດ" }}
                    styles={customStyles}
                    onChange={(e) => getValueVIP(e)}
                  />
                </div>
              </Grid>
              <Grid xs={2}>
                <div>
                  <p className="manage-ft-text">ປະເພດເບີ</p>
                  <OtherSelect
                    options={option_NetworkTpre}
                    defaultValue={{ value: "all", label: "ທັງໝົດ" }}
                    styles={customStyles}
                    onChange={(e) => getValueNetwork(e)}
                  />
                </div>
              </Grid>
              <Grid xs={6}>
                <div style={{ display: "flex" }}>
                  <div>
                    <p className="manage-ft-text">ຄົ້ນຫາ</p>
                    <TextField
                      sx={{
                        width: { sm: 200, md: 300 },
                        "& .MuiInputBase-root": {
                          height: 38,
                          borderRadius: "7px",
                          fontFamily: "Poppins, Noto Sans Lao",
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconSearch />
                          </InputAdornment>
                        ),
                      }}
                      autoComplete="off"
                      id="standard-basic"
                      variant="outlined"
                      placeholder="205xxxxxxx"
                      // onKeyUp={HandleBack}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div style={{ marginLeft: "1.5rem", marginTop: "1.5rem" }}>
                    <Button
                      variant="contained"
                      className="btn-search"
                      // onClick={HandleSearch}
                    >
                      ຄົ້ນຫາ
                    </Button>
                  </div>
                </div>
              </Grid>
              <Grid style={{ display: "flex" }}>
                <div style={{ marginLeft: "1.5rem", marginTop: "1.5rem" }}>
                  <MDBBtn className="me-1" color="success">
                    Import Excel
                  </MDBBtn>
                  <MDBBtn className="me-1" color="danger">
                    ເພິ່ມໃໝ່
                  </MDBBtn>
                </div>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Speciallist;
