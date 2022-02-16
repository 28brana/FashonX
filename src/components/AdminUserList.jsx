import './adminproductlist.css';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DataGrid } from '@mui/x-data-grid';

import { useEffect, useState } from 'react';
import { userRequest } from '../requestMethods';
const AdminUserList = () => {
  const [getData, setData] = useState([]);
  
  const columns = [
    { field: '_id', headerName: 'ID', width: 220 },
   
    {
      field: 'username',
      headerName: 'Username',
      width: 200,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,

    },
    {
      field: 'isAdmin',
      headerName: 'Admin',
      width: 160,

    },
    {
      field: 'createdAt',
      headerName: 'CreatedAt',
      width: 200,
      renderCell:(params)=>{
        var date = new Date(params.row.createdAt);
        return <div>{date.getMonth()+1 + '/' + date.getDate() + '/' +  date.getFullYear()}
        </div>
      }

    },
    
    {
      field: 'action', headerName: 'Action', width: 350, renderCell: (params) => {
        const style={
          color:'white',
          backgroundColor:'#3f51b5',
          padding:'0.6em',
          borderRadius:'5px',
          cursor:'pointer'
        }
        return (
          <div className='action' >
            <button style={style} onClick={()=>makeAdmin(params.row._id,params.row.isAdmin)} >Admin</button>
            <DeleteOutlineIcon color={'error'} onClick={(e) =>  deleteProduct(e,params.row._id)} />
          </div>
        )
      },
      sortable: false,

    }
  ];


  const makeAdmin=(id,admin)=>{
    const index=getData.findIndex((obj=>obj._id===id));
    getData[index].isAdmin=!admin;
    const adminReq=async()=>{
      try{
        await  userRequest.put(`/user/${id}`,{
          isAdmin:!admin
        });

        // console.log(res)

      }catch(err){
        console.log(err);
      }
    }
    adminReq();
  }


  
 

  const deleteProduct =  (e,params) => {
    e.stopPropagation();
    setData(getData.filter((item) => item._id !== params))
    const deleteProduct = async ()=>{
      try{
        await userRequest.delete('/user/'+params);
        

      }catch(err){
        console.log(err);
      }
    }
    deleteProduct();
  }


  useEffect(() => {
    try {
      const getProduct = async () => {
        const res = await userRequest.get('/user');
        setData(res.data);
      }
      getProduct()
    } catch (err) {
      console.log(err);
    }
  }, [])



  return (
    <div style={{ height: '100vh', width: '100%' }} className="admin-product-list">
     <h1 className='productlist-title'>User List 👤</h1>
      <DataGrid
        rows={getData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        rowHeight={100}
        getRowId={(row) => row._id}
      />

    </div>
  )
}

export default AdminUserList;