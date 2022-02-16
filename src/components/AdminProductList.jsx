import './adminproductlist.css';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import { userRequest } from '../requestMethods';
import {Link} from 'react-router-dom'
const AdminProductList = () => {
  const [getData, setData] = useState([]);
  
  const columns = [
    { field: '_id', headerName: 'ID', width: 210 },
    {
      field: 'img', headerName: 'Image', width: 400, renderCell: (params) => {
        return (
          <div className='productlist-img' >
            <img src={params.row.img} alt="img" />
            <span>{params.row.title}</span>
          </div>
        )
      }
    },
    {
      field: 'size',
      headerName: 'Size',
      width: 100,
    },
    {
      field: 'color',
      headerName: 'Color',
      width: 160,

    },
    {
      field: 'price',
      headerName: 'Price',
      width: 160,
    },
    {
      field: 'action', headerName: 'Action', width: 350, renderCell: (params) => {
        return (
          <div className='action' >
          <Link to={`/admin/updateproduct/${params.row._id}`} >
            <EditIcon color={'primary'}  /> 
          </Link>
            <DeleteOutlineIcon color={'error'} onClick={(e) =>  deleteProduct(e,params.row._id)} />
          </div>
        )
      },
      sortable: false,

    }
  ];

 

  const deleteProduct =  (e,params) => {
    e.stopPropagation();
    setData(getData.filter((item) => item._id !== params))
    const deleteProduct = async ()=>{
      try{
        const res = await userRequest.delete('/products/'+params);
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
        const res = await userRequest.get('/products');
        setData(res.data);
      }
      getProduct()
    } catch (err) {
      console.log(err);
    }
  }, [])



  return (
    <div style={{ height: '100vh', width: '100%' }} className="admin-product-list">
     <h1 className='productlist-title'>Product 🛍️</h1>
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

export default AdminProductList;