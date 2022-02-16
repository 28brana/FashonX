import './adminproductlist.css';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DataGrid } from '@mui/x-data-grid';

import { useEffect, useState } from 'react';
import { userRequest } from '../requestMethods';
const AdminTransaction = () => {
  const [getData, setData] = useState([]);
  
  const columns = [
    { field: '_id', headerName: 'ID', width: 220 },
   
    {
      field: 'userId',
      headerName: 'User ID',
      width: 200,
    },
    {
      field: 'amount',
      headerName: 'Total Amount',
      width: 200,

    },
    {
      field: 'address',
      headerName: 'Address',
      width: 160,

    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,

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
            <button style={style} onClick={()=>changeStatus(params.row._id)} >Deliver</button>
            <DeleteOutlineIcon color={'error'} onClick={(e) =>  deleteProduct(e,params.row._id)} />
          </div>
        )
      },
      sortable: false,

    }
  ];


  const changeStatus=(id)=>{
    const index=getData.findIndex((obj=>obj._id===id));
    getData[index].status='Delivered';
    const adminReq=async()=>{
      try{
        const res=await  userRequest.put(`/orders/${id}`,{
          status:'Delivered'
        });

        console.log(res)

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
        const res = await userRequest.delete('/orders/'+params);
        console.log(res)

      }catch(err){
        console.log(err);
      }
    }
    deleteProduct();
  }


  useEffect(() => {
    try {
      const getProduct = async () => {
        const res = await userRequest.get('/orders');
        setData(res.data);
      }
      getProduct()
    } catch (err) {
      console.log(err);
    }
  }, [])



  return (
    <div style={{ height: '100vh', width: '100%' }} className="admin-product-list">
     <h1 className='productlist-title'>Order List 🏪</h1>
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

export default AdminTransaction;