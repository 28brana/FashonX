import { LineChart, Line, XAxis,  CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useMemo, useState } from "react";
import { userRequest } from '../requestMethods';
import './adminhome.css'
import { useSelector } from 'react-redux';
const HomeBox=({title,data,color,bg})=>{
    const style={
        backgroundColor:color,
        backgroundImage:bg
    }
    return(
        
        <div className="dashboard_cards" style={style}>
            <div className="dashboard_cards_txt">
                <h5>{title}</h5>
                <span>{data}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="rgba(255,255,255,0.3)" fillOpacity="1" d="M0,128L34.3,112C68.6,96,137,64,206,96C274.3,128,343,224,411,250.7C480,277,549,235,617,213.3C685.7,192,754,192,823,181.3C891.4,171,960,149,1029,117.3C1097.1,85,1166,43,1234,58.7C1302.9,75,1371,149,1406,186.7L1440,224L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z">
                </path>
            </svg>
        </div>
    )
}

const AdminHome =()=>{
    const [userStats, setUserStats] = useState([]);
 

    const [getRevenu,setRevenu]=useState(0);
    const [getUsers,setUsers]=useState(0);
    const [getProducts,setProducts]=useState(0);
    const user=useSelector(state=>state.user)

    const MONTHS = useMemo(
    () => [
        "Jan",
        "Feb",
        "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Agu",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        []
      );
    
      useEffect(() => {
        const getStats = async () => {
          try {
            const res = await userRequest.get("/user/stats");
            let arr=[]
            res.data.map((item) =>
              arr.push({ name: MONTHS[item._id - 1], "Active User": item.total })
            );
            setUserStats(arr);
            let sum=0;
            for(let i=0;i<res.data.length;i++){
                sum+=res.data[i].total
            }
            setUsers(sum)
           
          } catch {}
        };
        getStats();
      }, [MONTHS]);

      useEffect(()=>{
          const getIncome=async()=>{
              try{

                  const res=await userRequest.get('/orders/income')
                  let sum=0;
                    for(let i=0;i<res.data.length;i++){
                        sum+=res.data[i].total
                    }
                  setRevenu(sum)
              }catch(err){
                  console.log(err);
              }
          }
          const getProduct=async()=>{
            try{

                const res=await userRequest.get('/products')
                
                setProducts(res.data.length)
            }catch(err){
                console.log(err);
            }
          }
          getProduct();
          getIncome();
      },[])


    return(
        <div className="admin-home">
           <h1 className='admin-title'>Welcome {user.currentUser.username} 👋  </h1>
           <div className="admin-home-info">
               <HomeBox color='#875fc0' bg='linear-gradient(315deg, #eb4786 0%, #b854a6 74%)' title="evenue" data={"Rs "+getRevenu}/>
               <HomeBox color='rgb(0 102 140)' title="Users" data={getUsers}/>
               <HomeBox color='#eb4786' bg={'linear-gradient(315deg, #ffb72c 0%, #f57f59 74%)'} title="Products" data={getProducts}/>
             </div>
            <div className="chart">
            <h3 className="chartTitle">User Analytics</h3>
                <ResponsiveContainer width='90%' aspect={4/1}>
                    <LineChart data={userStats}>
                        <XAxis dataKey={"name"} stroke="#5550bd" />
                        <Line type="monotone" dataKey="Active User" stroke="#5550bd"/>
                        <Tooltip/>
                        <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
                    </LineChart>

                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default AdminHome

