import React, { useState } from "react";
import { Grid, Table, TableCell } from "@mui/material";
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
          <Grid xs={12}>
            <div
              style={{ display: "flex", padding: ".5rem", marginTop: "20px" }}
              className="wapper-manage wapper2"
            >
              <Grid xs={2} style={{ paddingRight: "5px" }}>
                <div>
                  <p className="manage-ft-text ">ປະເພດ</p>
                  <OtherSelect
                    className="input-search"
                    options={option_VIP}
                    defaultValue={{ value: "all", label: "ທັງໝົດ" }}
                    styles={customStyles}
                    onChange={(e) => getValueVIP(e)}
                  />
                </div>
              </Grid>
              <Grid xs={2} style={{ paddingRight: "5px" }}>
                <div>
                  <p className="manage-ft-text">ປະເພດເບີ</p>
                  <OtherSelect
                    className="input-search"
                    options={option_NetworkTpre}
                    defaultValue={{ value: "all", label: "ທັງໝົດ" }}
                    styles={customStyles}
                    onChange={(e) => getValueNetwork(e)}
                  />
                </div>
              </Grid>
              <Grid xs={5} style={{ paddingRight: "5px" }}>
                <div style={{ display: "flex", marginTop: "10px" }}>
                  <div>
                    <p className="manage-ft-text">ຄົ້ນຫາ</p>
                    <TextField
                      className="input-search "
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
              <Grid style={{ display: "flex" }} xs={3}>
                <div className="bt-group-import ">
                  <MDBBtn className="me-1 mt-20" color="success">
                    Import Excel
                  </MDBBtn>
                  <MDBBtn className="me-1 mt-20" color="danger">
                    ເພິ່ມໃໝ່
                  </MDBBtn>
                </div>
              </Grid>
            </div>
          </Grid>
          <Grid className="list-phone-special">
            <Grid item xs={12}>
              <Grid item xs={12}>
                Pagegination
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Speciallist;
