import React, { useState, useEffect } from "react";
import { Grid, Table, TableBody, TableCell, TableHead } from "@mui/material";
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
import AxiosReq from "../../Components/Axios/AxiosReq";
import { EditNote, Visibility } from "@mui/icons-material";

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
  const [packages, setPK] = useState([]);
  const [listSpecial, setSpeciallist] = useState([]);
  const dateNow = new Date();

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

  // const option_cate = dataCate.map((x) => ({
  //   value: x.id,
  //   label: x.catename,
  // }));

  const option_NetworkTpre = networkType.map((x) => ({
    value: x.viptype,
    label: x.viptype,
  }));

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

  const Datapakage = () => {
    // AxiosReq.get("ListPrmtId")
    //   .then((res) => {
    //     if (res.status === 200) {
    //       setPK(res);
    //     }
    //   })
    //   .catch((er) => {
    //     console.log(er);
    //   });
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

    AxiosReq.post(
      `api/Special_Package/QuerySpecialPkList?page=1&limit=1000`,

      { headers: header }
    ).then((res) => {
      console.log("dataList", res?.data);
      if (res.status === 200) {
        setsavePage(page);
        setSpeciallist(res);

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

  console.log("Data:", listSpecial);

  const Row = ({ data }) => {
    const [openTable, setOpenTable] = useState(false);

    const findMsisdn = (e) => {
      setOpenTable(!openTable);
    };

    console.log("List: ", data);
    return (
      <>
        <Table style={{ marginTop: 15 }}>
          <TableHead className="head-table-Speciallis">
            <TableRow>
              <TableCell width={"10%"} align="center">
                <u>ລ/ດ.</u>
              </TableCell>
              <TableCell width={"10%"}>ປະເພດແພັກແກັດ</TableCell>
              <TableCell width={"10%"} align="center">
                <u>ເບີໂທ</u>
              </TableCell>
              <TableCell width={"15%"} align="center">
                <u>ວັນທີເລີ່ມ</u>
              </TableCell>
              <TableCell width={"15%"} align="center">
                <u>ວັນທີສິ້ນສຸດ</u>
              </TableCell>
              <TableCell width={"10%"}>
                {" "}
                <u>ເເຂວງ</u>{" "}
              </TableCell>
              <TableCell align="center">
                {" "}
                <u>ສະຖານະ</u>{" "}
              </TableCell>
              <TableCell align="center">
                {" "}
                <u>ຈັດການ</u>{" "}
              </TableCell>
            </TableRow>
          </TableHead>
          {data?.data?.data?.map((res, idx) => {
            let status;
            let numDay = moment
              .duration(moment(res?.stopTime).diff(moment(dateNow)))
              .asDays()
              .toFixed(0);

            return (
              <>
                <TableBody>
                  <TableCell align="center" width={"10%"}>
                    {idx + 1}
                  </TableCell>
                  <TableCell align="left" width={"10%"}>
                    {res?.prmtId}
                  </TableCell>
                  <TableCell align="center" width={"15%"}>
                    {res?.msisdn}
                  </TableCell>
                  <TableCell align="center" width={"15%"}>
                    {moment(res?.startTime).format("DD-MM-YYYY HH:mm:ss")}
                  </TableCell>
                  <TableCell align="center" width={"15%"}>
                    {moment(res?.stopTime).format("DD-MM-YYYY HH:mm:ss")}
                  </TableCell>
                  <TableCell align="left" width={"10%"}>
                    {res?.province}
                  </TableCell>
                  <TableCell align="center">
                    {numDay > 0 ? (
                      <MDBBtn rounded color="success">
                        Active
                      </MDBBtn>
                    ) : (
                      <MDBBtn rounded color="danger">
                        Deactive
                      </MDBBtn>
                    )}
                  </TableCell>
                  <TableCell width={"15%"} align="right">
                    <Grid container spacing={2}>
                      <Grid item xs={5} className="btn-view">
                        <MDBBtn
                          color="success"
                          // sx={{textAlign}}
                          variant="contained"
                          size="sm"
                          // className="btn-view"
                          // onClick={() => view_datapackage()}
                        >
                          <Visibility className="icon-view" />
                        </MDBBtn>
                      </Grid>
                      <Grid item xs={5}>
                        <MDBBtn
                          color="success"
                          // sx={{textAlign}}
                          variant="contained"
                          size="sm"
                          // className="btn-view"
                          // onClick={() => view_pofile()}
                        >
                          <EditNote />
                        </MDBBtn>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableBody>
              </>
            );
          })}
        </Table>
      </>
    );
  };

  useEffect(() => {
    LoadDataNew(savePage, perPage);
    Datapakage();
    // TableListSpecial();
  }, [selectCate, seletgroup, getVIP, getNetwork]);

  console.log("packages:", listSpecial);
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
                  <p className="manage-ft-text ">ປະເພດແພັກແກັດ</p>
                  <OtherSelect
                    className="input-search"
                    options={""}
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
                    // styles={customStyles}
                    onChange={(e) => getValueNetwork(e)}
                    isDisabled
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
                <Grid
                  item
                  xs={12}
                  className="bt-group-import floatRight pdr-20"
                >
                  <MDBBtn className="me-1 mt-20" color="success">
                    Import Excel
                  </MDBBtn>
                  <MDBBtn className="me-1 mt-20" color="danger">
                    ເພິ່ມໃໝ່
                  </MDBBtn>
                </Grid>
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
                <Row data={listSpecial} />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Speciallist;
