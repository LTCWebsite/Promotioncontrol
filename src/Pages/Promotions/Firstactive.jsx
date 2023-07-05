import React, { useState, useEffect } from "react";
import { Grid, Table, TableCell, TableHead } from "@mui/material";
import {
  IconArrowDown,
  IconArrowUp,
  IconSearch,
  Icon_View,
} from "../Icon/Icon";
import { Button, TextField, Typography, InputAdornment } from "@mui/material";
import { MDBBtn } from "mdb-react-ui-kit";
import TableRow from "@mui/material/TableRow";
import { tableCellClasses } from "@mui/material";
import moment from "moment";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import ManageTT from "./ManageTT";
import { useHistory, useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Axios from "../../Components/Axios/Axios";
import { USER_KEY } from "../../Constants";
import { ceil } from "lodash";
import { Add, EditNote, Pages, Visibility } from "@mui/icons-material";
import AxiosReq from "../../Components/Axios/AxiosReq";
import { TableBody } from "mui-datatables";
import DialogUpload from "../Dialog/DialogUpload";
import DialogFirstAc from "../Dialog/DialogFirstAc";
import { Pagination } from "antd";

function Firstactive() {
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
  const [dataFirst, setDataFirst] = useState(false);
  const [alldata, setAlldata] = useState([]);
  const [dataPackage, setDataPackage] = useState([]);
  const [refesh, setRefesh] = useState(false);
  const [load, setUpload] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [pageSize, setPageSize] = useState(10); // Items per page
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    LoadDataNew();
  }, [currentPage, pageSize]);

  const LoadDataNew = () => {
    setAlldata([]);
    setloading(true);
    AxiosReq.post(
      `api/Churn/GetChurn?page=${currentPage}&limit=${pageSize}`,
      {},
      { headers: header },
      { username: `${userName}` }
    ).then((res) => {
      // console.log("Data first active: ", res);
      if (res.status === 200) {
        setDataPackage(res?.data);
        console.log("dataPackage", res);
        setTimeout(() => {
          setloading(false);
        }, 800);
        setAllpage(ceil(res.data.total / perPage));
      }
    });
  };

  // console.log("package:", dataPackage);

  const TableFirstactive = ({ data }) => {
    return (
      <>
        {/* {isLoading ? (
      <Grid className="Loading loading-size">
        <Lottie
          loop
          animationData={Loading}
          play
          style={{ width: "300px", height: "300px" }}
        />
      </Grid>
    ) : ( */}
        <Table style={{ marginTop: 15 }}>
          <TableHead className="head-table-Speciallis">
            <TableRow>
              <TableCell width={"8%"} align="center">
                <u>ລ/ດ.</u>
              </TableCell>
              <TableCell width={"8%"}>
                {" "}
                <u>ປະເພດເບີ</u>
              </TableCell>
              <TableCell width={"8%"}>
                {" "}
                <u>ປະເພດກຸ່ມເບີ</u>
              </TableCell>
              <TableCell width={"8%"} align="center">
                <u>ເບີໂທ</u>
              </TableCell>
              <TableCell width={"8%"} align="center">
                <u>ວັນທີເລີ່ມ</u>
              </TableCell>
              <TableCell width={"8%"} align="center">
                <u>ວັນທີສິ້ນສຸດ</u>
              </TableCell>
              <TableCell width={"10%"}>
                {" "}
                <u>ເເຂວງ, ເມືອງ</u>
              </TableCell>
              <TableCell>
                {" "}
                <u>ມູນຄ່າໂທ</u>{" "}
              </TableCell>
              <TableCell>
                {" "}
                <u>ສະຖານະ</u>{" "}
              </TableCell>
              <TableCell>
                {" "}
                <u>ເວລານຳໃຊ້</u>{" "}
              </TableCell>
              <TableCell align="center">
                {" "}
                <u>ຈັດການ</u>{" "}
              </TableCell>
            </TableRow>
          </TableHead>

          {data?.map((res, idx) => {
            // console.log("res:", res);
            return (
              <>
                <TableRow>
                  <TableCell align="center">{idx + 1}</TableCell>
                  <TableCell>{res?.product}</TableCell>
                  <TableCell>{res?.typegroup}</TableCell>
                  <TableCell>{res?.msisdn}</TableCell>
                  <TableCell>{res?.adate}</TableCell>
                  <TableCell>{res?.activeStop}</TableCell>
                  <TableCell>{res?.province + ", " + res?.district}</TableCell>
                  <TableCell>{res?.balance}</TableCell>
                  <TableCell>{res?.status}</TableCell>
                  <TableCell>{res?.timeActive}</TableCell>
                  <TableCell>
                    <Grid container spacing={2}>
                      <Grid item xs={5} className="btn-view">
                        <MDBBtn
                          color="success"
                          // sx={{textAlign}}
                          variant="contained"
                          size="sm"
                          // className="btn-view"
                          // onClick={viewSpecial}
                        >
                          <Visibility className="icon-view" />
                        </MDBBtn>
                      </Grid>
                      {/* <Grid item xs={5}>
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
                      </Grid> */}
                    </Grid>
                  </TableCell>
                </TableRow>
              </>
            );
          })}
        </Table>
      </>
    );
  };

  //Search by msisdn
  const HandleSearch = () => {
    if (search === "") {
      LoadDataNew();
    } else {
      console.log(search);
      // setdataTable([]);
      setLoading(true);
      Axios.post(
        `http://172.28.26.146:1715/api/Special_Package/QueryByMsisdnSpecialPK?msisdn=${search}`,
        { headers: header }
      ).then((res) => {
        console.log({ res });
        if (res.status === 200) {
          setdataTable(res?.data?.data);
          setLoading(false);
        }
      });
    }
  };

  const onShowSizeChange = (current, pageSize) => {
    // console.log(current, pageSize);
  };

  return (
    <>
      <DialogFirstAc
        isShow={load}
        onHide={(e) => setUpload(e)}
        addNew={(e) => {
          setRefesh(e);
        }}
        data={dataPackage}
      />
      {/* <DialogUpload
        isShow={load}
        onHide={(e) => setUpload(e)}
        addNew={(e) => {
          setRefesh(e);
        }}
        data={dataPackage}
      /> */}
      <Grid container className="head-model">
        <Grid className="main" item xs={12}>
          <u>ຂໍ້ມູນເບີເເພັກເກັດພິເສດ</u>
          <Grid xs={12}>
            <Grid
              item
              xs={12}
              style={{ display: "flex", padding: ".5rem", marginTop: "20px" }}
              className="wapper-manage "
            >
              <Grid xs={12}>
                <div style={{ display: "flex", marginTop: "10px" }}>
                  <div>
                    <p className="manage-ft-text">ຄົ້ນຫາ</p>
                    <TextField
                      className="input-search "
                      sx={{
                        width: { sm: 300, md: 400 },
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
                      onClick={HandleSearch}
                    >
                      ຄົ້ນຫາ
                    </Button>
                  </div>
                </div>
              </Grid>
              <Grid
                style={{
                  display: "flex",
                  marginTop: "5px",
                }}
                xs={12}
              >
                <Grid xs={12} className="bt-group-import floatRight pdr-20">
                  {/* <MDBBtn
                    className=" mt-20 btn-import"
                    color="success"
                    size="sm"
                    onClick={() => setUpload(true)}
                  >
                    <Add /> Import Excel
                  </MDBBtn> */}
                  <MDBBtn
                    className="me-1 mt-20"
                    color="success"
                    onClick={() => setUpload(true)}
                  >
                    Import Excel
                  </MDBBtn>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid className="list-phone-special">
            <Grid item xs={12}>
              <div style={{ display: "flex", padding: "1em", float: "right" }}>
                <div style={{ paddingTop: ".25rem" }}>
                  <Stack spacing={1}>
                    <Pagination
                      // defaultCurrent={}
                      showSizeChanger
                      // onShowSizeChange={onShowSizeChange}
                      current={currentPage}
                      pageSize={pageSize}
                      total={totalItems}
                      pageRangeDisplayed={5}
                      marginPagesDisplayed={2}
                      onChange={(page, pageSize) => {
                        setCurrentPage(page);
                        setPageSize(pageSize);
                      }}
                    />
                  </Stack>
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <TableFirstactive data={dataPackage} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Firstactive;
