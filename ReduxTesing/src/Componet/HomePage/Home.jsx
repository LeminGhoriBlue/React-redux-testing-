import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { edits, deletes, callApi } from '../../Reduxs/Action/index.js';
import { Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Header from '../../CommonComponent/Header/Header';

const Home = () => {

  const dispatch = useDispatch();
  let storeAllData = useSelector(state => state.login);
  const [open, setOpen] = React.useState(false);
  const [dailog, setDailog] = useState('');
  const [ina, setIna] = useState();
  const [editState, setEditState] = useState({})

  useEffect(() => {
    dispatch(callApi())
  }, [])

  const input = (e) => {
    const { name, value } = e.target;
    setEditState((pre) => {
      return ({ ...pre, [name]: value })
    })
  }

  const deleteData = (val, index) => {
    console.log(index)
    handleClickOpen()
    setEditState(val);
    setDailog("delete");
    setIna(index);
  }

  const editData = (e, index) => {
    handleClickOpen()
    setEditState(e);
    setIna(index);
    setDailog("edit");
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editSubmit = (e) => {
    dispatch(edits(editState, ina))
    handleClose();
  }

  const deletew = () => {
    dispatch(deletes(ina))
    handleClose();
  }

  return (
    <>
      <div className="main">
        <div className="inner">
          <Header buttonName="Add Data" title="Table" pathName="add" />
          <div className="table-responsive table-striped">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col" style={{ minWidth: "120px" }}>User States</th>
                  <th scope="col">Title</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {storeAllData?.data.map((val, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{(val.userId == 0) ? 'panding' : (val.userId == 1) ? 'susses' : 'rejected'}</td>
                      <td>{val.title}</td>
                      <td><i data-testid="btn-edit" id="btn-edit" onClick={() => { editData(val, index) }} className="material-icons" >edit</i></td>
                      <td><i data-testid="btn-delete" id="btn-delete" onClick={() => { deleteData(val, index) }} className="material-icons" >close</i></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        {(dailog == 'edit') ? (
          <Dialog open={open} onClose={handleClose} className="MuiPaper-r">
            <DialogTitle>Edit Data</DialogTitle>
            <DialogContent >
              <FormControl fullWidth className='m5'>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={editState?.userId}
                  label="Age"
                  data-testid="Age"
                  name="userId"
                  onChange={input}
                >
                  <MenuItem value={0}>panding</MenuItem>
                  <MenuItem value={1}>susses</MenuItem>
                  <MenuItem value={2}>rejected</MenuItem>
                </Select>
              </FormControl>
              <input
                autoFocus
                margin="dense"
                id="TITLE"
                label="TITLE"
                data-testid="TITLE"
                type="text"
                fullWidth
                name="title"
                value={editState?.title}
                variant="standard"
                onChange={input}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button data-testid="editYes" onClick={() => { editSubmit(editState, ina) }}>Submit</Button>
            </DialogActions>
          </Dialog>
        ) :
          <Dialog open={open} onClose={handleClose} className="MuiPaper-r">
            <DialogTitle>Are You Sure You Want To Delete This Data</DialogTitle>
            <DialogContent >

              <div className='d-flex'><div className='dailog-lebel'>
                <div>id</div>
                <div>:</div>
              </div>{editState.id}</div>
              <div className='d-flex'><div className='dailog-lebel'>
                <div>State</div>
                <div>:</div>
              </div>{(editState.userId == 0) ? 'panding' : (editState.userId == 1) ? 'susses' : 'rejected'}</div>
              <div className='d-flex'><div className='dailog-lebel'>
                <div>Title</div>
                <div>:</div>
              </div>{editState.title}</div>
              <div className='d-flex'><div className='dailog-lebel'>
                <div>Body</div>
                <div>:</div>
              </div>{editState.body}</div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>No</Button>
              <Button data-testid="DaleteYes" onClick={() => { deletew() }}>Yes</Button>
            </DialogActions>
          </Dialog>
        }
      </div>
    </>
  )
}

export default Home;
