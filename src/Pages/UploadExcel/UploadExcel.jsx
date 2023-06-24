import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
// import {Button} from "@mui/material";
import Axios from "../../components/Axios";
import { Container } from "react-bootstrap";
import MyTable from "../../Table/Table";
import moment from "moment";
import {
  BUTTON_PRIMARY,
  BUTTON_SEARCH_PRIMARY,
  BUTTON_UPLOAD_PRIMARY,
} from "../../constants/index";
import {
  ArrowUpwardOutlined,
  Search,
  FileCopy,
  CloudUpload,
  SimCard,
} from "@material-ui/icons";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import readXlsxFile from "read-excel-file";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import TextField from "@mui/material/TextField";
import DatePick from "../../components/DatePick";
import { USER_KEY } from "../../constants";

export default function UploadExcel() {
  const [open, setOpen] = React.useState(false);
  const [phoneSearch, setPhoneSearch] = useState("");
  const [data, setData] = useState([]);
  const [openUpload, setOpenUpload] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [fileUpload, setFileUpload] = React.useState(null);

  const [addPhone, setAddPhone] = useState("");
  const [addProvince, setAddProvince] = useState("");
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [addCodeType, setAddCodeType] = useState("");
  const [dataCodeType, setDataCodeType] = useState([]);
  const [fileData, setFileData] = React.useState("");

  // Validate Form
  const [pkPhoneValidate, setPkPhoneValidate] = useState(false);
  const [pkProvinceValidate, setPkProvinceValidate] = useState(false);
  const [pkCodeTypeValidate, setPkCodeTypeValidate] = useState(false);
  const [pkStartDateValidate, setPkStartDateValidate] = useState(false);
  const [pkEndDateValidate, setPkEndDateValidate] = useState(false);
  const [searchPhoneValidate, setSearchPhoneValidate] = useState(false);
  const [token, setToken] = useState("");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem(USER_KEY));
    if (tokenData) {
      setToken(tokenData.token);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const _handleSearchNumber = (e) => {
    setPhoneSearch(e.target.value);
  };

  const handleClickOpenUploadFile = () => {
    setOpenUpload(true);
  };

  const handleCloseModalUpload = () => {
    setOpenUpload(false);
  };

  const _handleChangeCodeType = (e) => {
    setAddCodeType(e.target.value);
  };

  const _handlephone = (e) => {
    setAddPhone(e.target.value);
  };

  const _handleProvince = (e) => {
    setAddProvince(e.target.value);
  };

  const _handleSearch = () => {
    if (
      phoneSearch === "" ||
      phoneSearch === null ||
      phoneSearch === undefined
    ) {
      setSearchPhoneValidate(true);
      return;
    } else {
      setSearchPhoneValidate(false);
      // console.log(headers);
      Axios.get(`api/PromotionNumber?msisdn=${phoneSearch}`, {
        headers: headers,
      }).then((res) => {
        // console.log(res.data);
        if (res.status === 200) {
          var update = res.data.map((row, idx) => {
            row.id_idx = idx + 1;
            return row;
          });
          setData(update);
        }
      });
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      _handleSearch();
    }
  };

  useEffect(() => {
    Axios.get("api/QueryPrmtIdType", { headers: headers }).then((res) => {
      setDataCodeType(res.data);
    });
  }, [headers]);

  useEffect(() => {
    Axios.post(
      `api/PromotionNumber/GetPromotionNumber?page=1&limit=500`,
      {},
      { headers: headers }
    ).then((res) => {
      if (res.status === 200) {
        var update = res.data.map((row, idx) => {
          row.id_idx = idx + 1;
          return row;
        });
        setData(update);
      }
    });
  }, [token]);

  const _handleUploadFile = (e) => {
    let file = fileUpload;
    readXlsxFile(file).then((rows) => {
      let data = [];
      rows.forEach((row) => {
        data.push({
          prmtId: row[0],
          stop: row[1],
          start: row[2],
          startTime: row[3],
          stopTime: row[4],
          province: row[5],
        });
      });
      // console.log(data);
      setFileData(data);
      let all_count = data.length;
      let seek = 50;
      let count = 0;
      let times = Math.ceil(all_count / seek);

      // console.log({ data });

      let newSend = data.map((row) => {
        console.log(moment(row.startTime));
        row.startTime = moment(row.startTime);
        row.stopTime = moment(row.stopTime);
        return row;
      });
      // let send = {
      //   type: "ok",
      //   msisdn: newSend,
      // };
      // console.log(newSend);
      Axios.post("api/PromotionNumber", newSend, { headers: headers })
        .then((res) => {
          if (res.status === 200) {
            setAddPhone("");
            setAddProvince("");
            setStartDate(new Date());
            setEndDate(new Date());
            setOpen(false);
          }
          // console.log(res);
          seek += 50;
        })
        .catch((err) => {
          console.log({ err });
        });
      setOpenUpload(false);
    });
    let index = 0;
    var seek = 0;
    var newSend = fileUpload.filter(
      (row, idx) => idx < (index + 1) * seek && idx >= index * seek
    );
  };

  const columns = [
    { title: "ລ/ດ", field: "id_idx", maxWidth: 100 },
    {
      title: "ລະຫັດແພັກເກັດ",
      field: "prmtId",
    },
    {
      title: "ເບີໂທລະສັບ",
      field: "start",
    },
    {
      title: "ເບີໂທລະສັບ",
      field: "stop",
    },
    {
      title: "ວັນທີເລີ່ມ",
      field: "startTime",
      render: (row) => {
        return moment(row.startTime).format("DD-MM-YYYY HH:mm:ss");
      },
    },
    {
      title: "ວັນທີສິ້ນສຸດ",
      field: "stopTime",
      minWidth: 100,
      render: (row) => {
        return moment(row.stopTime).format("DD-MM-YYYY HH:mm:ss");
      },
    },
    {
      title: "ແຂວງ",
      field: "province",
    },
  ];

  return (
    <>
      <Container fluid className="mb-5" style={{ width: "100%" }}>
        <Grid container className="search mb-3">
          {/* <Grid item xs={4} lg={4}></Grid> */}
          <Grid item xs={5} lg={2}>
            <input
              type={"search"}
              maxLength="20"
              className="v-input input-1"
              placeholder="20577xxxxx"
              onChange={_handleSearchNumber}
              onKeyPress={handleEnter}
            />
          </Grid>
          <Grid item xs={2} lg={1}>
            <Button
              variant="contained"
              style={BUTTON_SEARCH_PRIMARY}
              onClick={(e) => _handleSearch()}
            >
              <Search />
            </Button>
          </Grid>
          {/* <Grid item xs={2} lg={2}> */}
          <Button
            variant="contained"
            style={BUTTON_PRIMARY}
            onClick={handleClickOpen}
          >
            <SimCard />
            ເພີ່ມເບີໂທ
          </Button>
          {/* </Grid> */}
          <Grid item xs={2} lg={2}>
            <Button
              variant="contained"
              style={BUTTON_UPLOAD_PRIMARY}
              onClick={handleClickOpenUploadFile}
            >
              <CloudUpload />
              ອັບໂຫລດໄຟລ
            </Button>
          </Grid>
        </Grid>

        <MyTable tTitle={"ຈັດການເບີໂປຼໂມຊັນ"} tData={data} tColumns={columns} />
      </Container>

      {/* Add File Phone Number */}
      <Dialog
        // TransitionComponent={Transition}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openUpload}
        onClose={handleCloseModalUpload}
      >
        <DialogTitle>ການອັບໂຫລດໄຟລເບີໂປຣໂມຊັນ</DialogTitle>
        <DialogContent>
          {/* <DialogContentText style={{ fontFamily: "noto sans lao" }}>
        ກະລຸນາປ້ອນຂໍ້ມູນທີ່ຕ້ອງການ
      </DialogContentText> */}
          {/* <input
        type="file"
        onChange={(e) => {
          setFileUpload(e.target.files[0]);
          // console.log(e.target.files[0]);
        }}
      /> */}
          <div className="text-center">
            <input
              type="file"
              id="file"
              name="file"
              onChange={(e) => {
                setFileUpload(e.target.files[0]);
              }}
            />
            <label htmlFor="file" className="center-icon label-2">
              <div>
                <CloudUpload className="btn-icon" style={{ fontSize: 60 }} />
              </div>{" "}
              ເລືອກໄຟລ
            </label>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            className="btn-secondary"
            variant="contained"
            onClick={handleCloseModalUpload}
          >
            ຍົກເລີກ
          </Button>
          <Button
            style={BUTTON_PRIMARY}
            variant="contained"
            onClick={_handleUploadFile}
          >
            ອັບໂຫລດ
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Phone number */}
      <Dialog
        // TransitionComponent={Transition}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>ການເພີ່ມເບີ</DialogTitle>
        <DialogContent>
          {/* <DialogContentText style={{ fontFamily: "noto sans lao" }}>
            ກະລຸນາປ້ອນຂໍ້ມູນທີ່ຕ້ອງການເພີ່ມຂໍ້ມູນໃຫ້ກັບປະເພດອາຫານ
          </DialogContentText> */}
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              ກະລຸນາເລືອກປະເພດແພັກເກັດໂປຣໂມຊັນ
            </InputLabel>
            <NativeSelect
              error={pkCodeTypeValidate}
              defaultValue={""}
              onChange={_handleChangeCodeType}
              inputProps={{
                name: "pkProCode",
                id: "uncontrolled-native",
              }}
            >
              {dataCodeType.map((row, idx) => {
                return (
                  <option key={idx} value={row.prmtId}>
                    {row.prmtId}
                  </option>
                );
              })}
            </NativeSelect>
          </FormControl>
          <TextField
            error={pkPhoneValidate}
            onChange={_handlephone}
            margin="dense"
            id="name"
            label="ກະລຸນາປ້ອນເບີໂທລະສັບ"
            type="text"
            fullWidth
            variant="standard"
            autoComplete="off"
          />
          <Grid container item xs={12}>
            <Grid container item xs={12} lg={12} spacing={0}>
              <Grid item xs={6}>
                <DatePick
                  error={pkStartDateValidate}
                  title="ວັນທີ່ເລີ່ມຕົ້ນ"
                  date={startDate}
                  onChange={setStartDate}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePick
                  error={pkEndDateValidate}
                  title="ວັນທີ່ສິ້ນສຸດ"
                  date={endDate}
                  onChange={setEndDate}
                />
              </Grid>
            </Grid>
          </Grid>
          <TextField
            error={pkProvinceValidate}
            onChange={_handleProvince}
            margin="dense"
            id="name"
            label="ກະລຸນາປ້ອນແຂວງ"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            className="btn-secondary"
            variant="contained"
            onClick={handleClose}
          >
            ຍົກເລີກ
          </Button>
          <Button
            variant="contained"
            // className="btn-primary"
            style={BUTTON_PRIMARY}
            onClick={() => {
              const data = [
                {
                  prmtId: addCodeType,
                  start: addPhone,
                  stop: addPhone,
                  startTime:
                    moment(endDate).format("YYYY-MM-DDTHH:mm:ss.00") + "Z",
                  stopTime:
                    moment(startDate).format("YYYY-MM-DDTHH:mm:ss.00") + "Z",
                  province: addProvince,
                },
              ];
              if (
                data[0].start === null ||
                data[0].start === "" ||
                (data[0].start === undefined) & (data[0].province === null) ||
                data[0].province === "" ||
                (data[0].province === undefined) &
                  (data[0].startTime === null) ||
                data[0].startTime === "" ||
                (data[0].startTime === undefined) &
                  (data[0].stopTime === null) ||
                data[0].stopTime === "" ||
                (data[0].stopTime === undefined) & (data[0].prmtId === null) ||
                data[0].prmtId === "" ||
                data[0].prmtId === undefined
              ) {
                setPkPhoneValidate(true);
                setPkProvinceValidate(true);
                setPkCodeTypeValidate(true);
                // setPkStartDateValidate(true);
                // setPkEndDateValidate(true);
              } else {
                Axios.post("api/PromotionNumber", data, {
                  headers: headers,
                }).then((res) => {
                  if (res.status === 200) {
                    setAddPhone("");
                    setAddProvince("");
                    setStartDate(new Date());
                    setEndDate(new Date());
                    setOpen(false);
                  }
                });
              }
            }}
          >
            ບັນທຶກ
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
