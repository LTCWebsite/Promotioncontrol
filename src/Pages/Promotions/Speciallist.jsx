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
import Lottie from "react-lottie-player";
import Loading from "../../Image/Lottie/Loading.json";
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
  const [searchnumber, setSearchNumber] = useState("");
  const [savePage, setsavePage] = useState(1);
  const [perPage] = useState(10);

  const history = useHistory();
  const [allpage, setAllpage] = useState(0);
  const [seletgroup, setseletgroup] = useState({ value: 0, label: "ທັງໝົດ" });
  const [selectCate, setSelectCate] = useState(0);
  const [selectPrmtId, setSelectPrmtId] = useState(0);

  const [dataTable, setdataTable] = useState([]);
  const [loading, setloading] = useState(true);
  const [emptyPage, setEmptyPage] = useState(false);
  const [packages, setPK] = useState([]);
  const [listSpecial, setSpeciallist] = useState([]);
  const [isLoading, setLoading] = useState("no");
  const [getSpecial, setGetSpecial] = useState("all");
  const [selectSpecial, setSelectSpecial] = useState(0);
  const [dataListPrmtId, setListPrmtId] = useState([]);
  const [ByPrmtId, setByPrmtId] = useState([]);
  const [idPrmtId, setIdPrmtId] = useState([]);
  const [slList, setslList] = useState(null);
  const [select, setSelect] = useState([]);
  const [List, setList] = useState([]);

  const dateNow = new Date();

  useEffect(() => {
    LoadData();
    LoadDataNew(savePage, perPage);
    Datapakage();
    // TableListSpecial();
  }, []);

  useEffect(() => {
    if (isLoading !== "no") {
      DataPackageList();
    }
  }, [slList]);

  console.log("Select", select);

  // const [getVIP, setGetVIP] = useState('all');
  function getValueSepcial(e) {
    setslList(e.value);
    // console.log(e.value)
  }

  //Show list selection special package list
  const options_Speciallist = List?.map((x) => ({
    value: x.prmtId,
    label: x.prmtId,
  }));
  const LoadData = () => {
    AxiosReq.get("http://172.28.26.146:1715/api/ListPrmtId").then((res) => {
      if (res.status === 200) {
        setList(res?.data);
        // console.log("ShowList", res?.data);
      }
    });
  };

  const DataPackageList = () => {
    AxiosReq.post(
      `api/Special_Package/QueryByPrmtIdSpecialPK?prmt_id=${slList}`,
      {
        headers: header,
      }
    ).then((res) => {
      if (res?.status === 200) {
        // console.log("---===>:", res);
        // setSelect(res);
        setSpeciallist(res?.data);
      }
    });
  };

  function getValueNetwork(e) {
    setGetNetwork(e.value);
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
    setLoading(true);
    setdataTable([]);
    setloading(true);
    let newValue = isNaN(parseInt(selectSpecial)) ? 0 : parseInt(selectSpecial);
    let newValue2 = isNaN(parseInt(seletgroup.value))
      ? 0
      : parseInt(seletgroup.value);
    let newValue3 = getVIP === "ທັງໝົດ" ? "all" : getVIP;
    let newValue4 = getNetwork === "ທັງໝົດ" ? "all" : getNetwork;

    AxiosReq.post(
      `api/Special_Package/QuerySpecialPkList?page=${page}&limit=${limit}`,
      {
        prmtId: newValue,
      },
      { headers: header }
    ).then((res) => {
      console.log("dataList", res?.data);
      if (res.status === 200) {
        setLoading(false);
        setsavePage(page);
        setSpeciallist(res.data?.data);
      }
    });
  };

  // console.log("PrmtId", dataListPrmtId);
  // console.log("ByPrmtId", ByPrmtId);

  const Row = ({ data }) => {
    const [openTable, setOpenTable] = useState(false);

    const findMsisdn = (e) => {
      setOpenTable(!openTable);
    };

    // console.log("List: ", dataTable);
    return (
      <>
        {isLoading ? (
          <Grid className="Loading loading-size">
            <Lottie
              loop
              animationData={Loading}
              play
              style={{ width: "300px", height: "300px" }}
            />
          </Grid>
        ) : (
          <Table style={{ marginTop: 15 }}>
            <TableHead className="head-table-Speciallis">
              <TableRow>
                <TableCell width={"10%"} align="center">
                  <u>ລ/ດ.</u>
                </TableCell>
                <TableCell width={"12%"}>
                  {" "}
                  <u>ປະເພດແພັກແກັດ</u>
                </TableCell>
                <TableCell width={"10%"} align="center">
                  <u>ເບີໂທ</u>
                </TableCell>
                <TableCell width={"15%"} align="center">
                  <u>ວັນທີເລີ່ມ</u>
                </TableCell>
                <TableCell width={"15%"} align="center">
                  <u>ວັນທີສິ້ນສຸດ</u>
                </TableCell>
                <TableCell width={"8%"}>
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
            {data?.map((res, idx) => {
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
        )}
      </>
    );
  };

  console.log("All list", options_Speciallist);

  // const HandleSearch = () => {
  //   if (search === "") {
  //     LoadData();
  //   } else {
  //     // console.log(search);
  //     setdataTable([]);
  //     setloading(true);
  //     Axios.post(
  //       `/api/MsisdnVIP/SearchMsisdn?username=${tokenData.user[0].value}&page=1&limit=1`,
  //       { msisdn: search },
  //       { headers: header }
  //     ).then((res) => {
  //       // console.log({ res });
  //       if (res.status === 200) {
  //         let count = res.data?.msisdnList.length;
  //         if (count > 0) {
  //           // console.log(count)
  //           setdataTable(res.data?.msisdnList);
  //           setloading(false);
  //           setAllpage(ceil(res.data?.dataCount / perPage));
  //         } else {
  //           setEmptyPage(true);
  //         }
  //         // console.log(res.data);
  //       }
  //     });
  //   }
  // };

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
                    options={options_Speciallist}
                    defaultValue={{ value: "all", label: "ທັງໝົດ" }}
                    styles={customStyles}
                    onChange={(e) => getValueSepcial(e)}
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
                      onChange={(e) => setSearchNumber(e.target.value)}
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
                      className="pagination"
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
