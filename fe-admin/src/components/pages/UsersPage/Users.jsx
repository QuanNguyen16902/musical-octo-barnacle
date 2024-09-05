import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserService from "../../../service/user.service";
import "../datatable.css";
import SearchField from "../SearchField";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";

function Users() {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  // Fetch users with optional search keyword
  const fetchUsers = async (keyword = '') => {
    try {
      let response;
      if (keyword) {
        response = await UserService.searchUser(keyword);
        setSearchResults(response.data);
      } else {
        response = await UserService.getUsers();
        setData(response.data);
        setSearchResults([]); // Clear search results when fetching all users
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch all users on initial load
  }, []);

  // Handle delete dialog
  const handleDelete = async () => {
    try {
      await UserService.deleteUser(deleteId);
      fetchUsers(); // Fetch users again to update the list
      toast.success("Xóa thành công!");
    } catch (error) {
      toast.error("Xóa không thành công!");
    } finally {
      setOpenDelete(false);
    }
  };

  const handleOpenDeleteDialog = (id) => {
    setDeleteId(id);
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpenDelete(false);
    setOpenEdit(false);
  };

  // Handle edit user
  const handleEditUser = (userId) => {
    setEditUserId(userId);
    setOpenEdit(true);
  };

  // Handle search
  const handleSearch = (keyword) => {
    fetchUsers(keyword); 
  };

  // Prepare data for DataGrid
  const rows = (searchResults.length > 0 ? searchResults : data).map((item) => ({
    id: item.id,
    username: item.username,
    email: item.email,
    enabled: item.enabled,
    roles: item.roles || [],
  }));

  const columns = [
    { field: "id", headerName: "ID", width: 40 },
    {
      field: "user",
      headerName: "Người dùng",
      width: 180,
      renderCell: (params) => (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={
              "https://th.bing.com/th/id/OIP.ghZN_FaqJ8PdAWZKqcsU0wHaE6?w=244&h=180&c=7&r=0&o=5&pid=1.7"
            }
            alt="avatar"
          />
          {params.row.username}
        </div>
      ),
    },
    { field: "email", headerName: "Email", width: 230 },
    {
      field: "roles",
      headerName: "Quyền",
      width: 300,
      renderCell: (params) => (
        <div>
          {params.value.map((role) => (
            <div key={role.id} className="rolesName">{role.name}</div>
          ))}
        </div>
      ),
    },
    {
      field: "enabled",
      headerName: "Tình trạng",
      width: 160,
      renderCell: (params) => (
        <div className={`cellWithStatus ${params.row.enabled === true ? 'active' : 'inactive'}`}>
          {params.row.enabled === true ? "Kích hoạt" : "Chưa kích hoạt"}
        </div>
      ),
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Hành động",
      width: 200,
      renderCell: (params) => (
        <div className="cellAction">
          <button
            style={{
              textDecoration: "none",
              border: "none",
              background: "none",
            }}
            onClick={() => handleEditUser(params.row.id)}
          >
            <div className="viewButton">
              <i className="bi bi-pencil-square"></i>
            </div>
          </button>
          <div
            className="deleteButton"
            onClick={() => handleOpenDeleteDialog(params.row.id)}
          >
            <i className="bi bi-trash"></i>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh sách Người dùng
        <SearchField label={"Tra cứu người dùng"} onSearch={handleSearch} />
        <button className="link" onClick={() => setOpenAdd(true)}>
          <i className="bi bi-person-add hover"></i>&nbsp;
          <span>Thêm</span>
        </button>
        <AddUserModal
          open={openAdd}
          onClose={() => setOpenAdd(false)}
          onAddUser={() => fetchUsers()} // Refetch users after adding
        />
      </div>
      <DataGrid
        className="datagrid"
        rows={rows}
        columns={columns.concat(actionColumn)}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          setSelectedRows(ids);
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5]}
      />
      <Dialog
        open={openDelete}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Xác nhận xóa"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa người dùng có <b>ID {deleteId}</b>? Hành
            động này không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>
          <Button onClick={handleDelete} autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
      {openEdit && (
        <EditUserModal
          open={openEdit}
          onClose={handleClose}
          userId={editUserId}
          onEditUser={() => fetchUsers()} // Refetch users after editing
        />
      )}
    </div>
  );
}

export default Users;