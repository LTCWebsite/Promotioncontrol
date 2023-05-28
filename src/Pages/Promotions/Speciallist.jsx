import React, { useState, useEffect } from "react";
import { Grid, Table, TableCell } from "@mui/material";
import {
  IconArrowDown,
  IconArrowUp,
  IconSearch,
  Icon_View,
} from "../Icon/Icon";
import OtherSelect from "react-select";
import { Button, TextField, Typography, InputAdornment } from "@mui/material";
import { MDBBtn } from "mdb-react-ui-kit";
import TableRow from "@mui/material/TableRow";
import { tableCellClasses } from "@mui/material";
import moment from "moment";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import ManageTT from "./ManageTT";
import { useHistory, useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Axios from "../../Components/Axios/Axios";
import { USER_KEY } from "../../Constants";
import { ceil } from "lodash";

function Speciallist() {
  const tokenData = JSON.parse(localStorage.getItem(USER_KEY));
  const header = {
    Authorization: `Bearer ${tokenData.token}`,
  };
  const userName = tokenData.user[0].value;
  const [getVIP, setGetVIP] = useState("all");
  const [dataVIPType, setDataVIPType] = useState([]);
  const [getNetwork, setGetNetwork] = useState("all");
  const [networkType, setnetworkType] = useState([]);
  const [search, setSearch] = useState("");
  const [savePage, setsavePage] = useState(1);
  const history = useHistory();
  const [allpage, setAllpage] = useState(0);
  const [perPage] = useState(10);
  const [seletgroup, setseletgroup] = useState({ value: 0, label: "ທັງໝົດ" });
  const [selectCate, setSelectCate] = useState(0);
  const [dataTable, setdataTable] = useState([]);
  const [loading, setloading] = useState(true);
  const [emptyPage, setEmptyPage] = useState(false);

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

  function Row(props) {
    const { row } = props;
    const [openTable, setOpenTable] = useState(false);

    const findMsisdn = (e) => {
      setOpenTable(!openTable);
    };

    return (
      <>
        <TableRow
          sx={{
            [`& .${tableCellClasses.root}`]: {
              borderBottom: "none",
            },
          }}
        >
          <TableCell align="center">
            <Button
              variant=""
              aria-label="expand row"
              size="small"
              onClick={() => findMsisdn(row.msisdn)}
            >
              {openTable ? (
                <span style={{ display: "flex" }}>
                  <span className="icon-show">
                    <IconArrowUp />
                  </span>
                  <span className="btn-show">ປິດ</span>
                </span>
              ) : (
                <span style={{ display: "flex" }}>
                  <span className="icon-show">
                    <IconArrowDown />
                  </span>
                  <span className="btn-show">ແພັກເກັດ</span>
                </span>
              )}
            </Button>
          </TableCell>
          <TableCell align="left">
            <div>
              <span>{row.msisdn}</span>
              <br />
              <span className="group-type">
                {row.phoneType === null ? "-" : row.phoneType}
              </span>
            </div>
          </TableCell>
          <TableCell align="left">{row.vipType}</TableCell>

          <TableCell align="left">{row.cateName}</TableCell>
          <TableCell>
            <span>{row.groupName}</span>
          </TableCell>
          <TableCell>{moment(row.registerDate).format("DD-MM-YYYY")}</TableCell>
          <TableCell>
            {row.stopDate === "" ? (
              <span> - </span>
            ) : (
              moment(row.stopDate).format("DD-MM-YYYY")
            )}
          </TableCell>
          <TableCell align="center">
            <span className={row.status === "True" ? "status" : "status-dis"}>
              {row.status === "True" ? "Active" : "Disactive"}
            </span>
          </TableCell>
          <TableCell align="center">
            <Button
              // sx={{textAlign}}
              variant="contained"
              size="small"
              className="btn-view"
              onClick={() => view_pofile(row.msisdn)}
            >
              <Icon_View />
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            style={{ background: "#CFCFCF", paddingBottom: 0, paddingTop: 0 }}
            colSpan={9}
          >
            <Collapse in={openTable} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <ManageTT msisdn={row.msisdn} />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }

  const view_pofile = (e) => {
    let data = dataTable.filter((x) => x.msisdn === e);
    let sendPage = {
      data1: data[0],
      data2: savePage,
    };
    console.log(sendPage);
    history.push({ pathname: "/home/profile", state: sendPage });
  };

  const handlePage = (x) => {
    // setsavePage(x);
    LoadDataNew(x, perPage);
    // console.log(savePage);
  };

  const LoadDataNew = (page, limit) => {
    setdataTable([]);
    setloading(true);
    let newValue = isNaN(parseInt(selectCate)) ? 0 : parseInt(selectCate);
    let newValue2 = isNaN(parseInt(seletgroup.value))
      ? 0
      : parseInt(seletgroup.value);
    let newValue3 = getVIP === "ທັງໝົດ" ? "all" : getVIP;
    let newValue4 = getNetwork === "ທັງໝົດ" ? "all" : getNetwork;

    Axios.post(
      `/api/Group/QueryMsisdnInGroup?username=${userName}&page=${page}&limit=${limit}`,
      {
        cateId: newValue,
        groupId: newValue2,
        vipType: newValue3,
        phoneType: newValue4,
      },
      { headers: header }
    ).then((res) => {
      if (res.status === 200) {
        setsavePage(page);
        if (res.data.resultCode === 201) {
          // console.log("br mi data");
          setEmptyPage(true);
        } else {
          let count = res.data?.msisdnList?.length;
          // console.log(res.data?.msisdnList);
          // setsavePage(1)
          if (count > 0) {
            setEmptyPage(false);
            setdataTable((newValue = res.data?.msisdnList));
            setloading(false);
            setAllpage(ceil(res.data?.dataCount / perPage));
          } else {
            setEmptyPage(true);
          }
        }
      }
    });
  };

  useEffect(() => {
    LoadDataNew(savePage, perPage);
  }, [selectCate, seletgroup, getVIP, getNetwork]);

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
              <div style={{ display: "flex", padding: "1em", float: "right" }}>
                <div style={{ paddingTop: ".25rem" }}>
                  <Stack spacing={1}>
                    <Pagination
                      count={allpage}
                      page={savePage === 1 ? 1 : savePage}
                      defaultPage={1}
                      siblingCount={0}
                      shape="rounded"
                      onChange={(e, x) => handlePage(x)}
                      // onChange={handlePage}
                    />
                  </Stack>
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div>
                <table className="list-phone">
                  <tr>
                    <th width={120}>#</th>
                    <th>ໝາຍເລກ</th>
                    <th>ປະເພດ</th>
                    <th>ໝວດໝູ່</th>
                    <th>ປະເພດກຸ່ມ</th>
                    <th>ວັນທີຮັບນະໂຍບາຍ</th>
                    <th width={120}>ວັນທີສິ້ນສຸດນະໂຍບາຍ</th>
                    <th>ສະຖານະ</th>
                    <th>ລາຍລະອຽດ</th>
                  </tr>
                </table>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Speciallist;
