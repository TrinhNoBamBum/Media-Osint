'use client'
import Image from "next/image";
import React from "react";
import { useState,useEffect } from "react";
import LineMap from "@/app/LineMap/page";
import axios from 'axios';
const Detailtopic =({ params }: { params: { topic: string } })=>{

      const [view,setWiew]=useState(null)
      const handlSetView=(index:any)=>{
          setWiew(index)
      }
      const handeClose=()=>{
        setWiew(null)
      }
      const [crawlData, setCrawlData] = useState<any>();
      const [positive,setPositive]=useState(0)
      const [negative,setNegative]=useState(0)
      const [neutral,setNeutral]=useState(0)
    
      useEffect(()=>{
        const fetchData = async () => {
          try {
                const response:any = await axios.get('http://127.0.0.1:5000/api/data');
                console.log(response)
                setCrawlData(response?.data)
                 // Biến kiểm tra đã xử lý hay chưa
                setNegative(0)
                setNeutral(0)
                setPositive(0)
                response?.data[params?.topic].forEach((item: any) => {
                    
                        if (item.feeling == "NEGATIVE") {
                            setNegative(prev => prev + 1);
                        }
                        if (item.feeling == "POSITIVE") {
                            setPositive(prev => prev + 1);
                        }
                        if (item.feeling == "NEUTRAL") {
                            setNeutral(prev => prev + 1);
                        }
                        console.log(123)
                         // Đánh dấu là đã xử lý
                    
                })
             
                console.log("Data", negative, positive,neutral)
          } catch (error) {
              console.error('Lỗi khi gọi API:', error);
          }
        };
        fetchData()
      },[])
      
    return (
       
        <div className="p-5">
            <div className="font-mono text-2xl ">CHỦ ĐỀ :{params?.topic} </div>
            <div className="w-full flex border-solid border-2 border-slate-400 p-2 mb-2 justify-around">
                <div className="bg-red-500 font-mono text-2xl font-semibold text-white w-1/4 p-3">Tiêu cực
                <h3>{negative}</h3>
                </div>
                <div className="bg-green-400 font-mono text-2xl font-semibold text-white w-1/4 p-3">Tích cực
                <h3>{positive}</h3>
                </div>
                <div className="bg-blue-400 font-mono text-2xl font-semibold text-white w-1/4 p-3">Trung tính
                <h3>{neutral}</h3>
                </div>
            </div>
            <div className="flex">
                <div className="w-2/4 border-solid border-2 border-slate-400 p-2">
                    <h3 className="font-bold">Link url liên quan đến chủ đề {params?.topic}</h3>
                    <div className="divide-y divide-slate-400">
                        {
                            crawlData?.[`${params?.topic}`].map((item:any, index:any)=>(
                                    <div>
                                        <a href={item?.url} className="min-w-80">{item?.url}</a>
                                        <span className="float-right cursor-pointer text-indigo-700 underline ml-2" onClick={handeClose}>Đóng</span>
                                        <span className="float-right cursor-pointer text-indigo-700 underline" onClick={()=>handlSetView(index)}>View</span>
                                        
                                        {
                                            view!=index?(""):(<div className="border-solid border-2 border-gray-400 p-2">
                                                <ul>
                                                    <li>
                                                        <span className="font-semibold">Tiêu đề : </span> {item?.title}
                                                    </li>
                                                    <li >
                                                        <span className="font-semibold">Tóm tắt nội dung :  </span> {item?.summary }
                                                    </li>
                                                    <li>
                                                    <span className="font-semibold">Loại : </span> {item?.feeling=='POSITIVE'?<span className="bg-lime-400 rounded-full text-white px-2">Tích cực</span>:item.feeling=='NEGATIVE'?<span className="bg-red-500 rounded-full text-white px-2">Tiêu cực</span>:<span className="bg-blue-400 rounded-full text-white px-2">Trung tính</span>} 
                                                    </li>
                                                    <li>
                                                        <span className="font-semibold">View :</span>  {item?.view} view
                                                    </li>
                                                    <li>
                                                        <span className="font-semibold">Thời gian :</span> {item?.date}
                                                    </li>
                                                </ul>
                                            </div>)
                                        }
                                        
                                    </div> 
                            ))
                        }
                    </div>
                </div>
                <div className="w-2/4 border-solid border-2 border-slate-400 p-2">
                        <LineMap data={crawlData?.[`${params?.topic}`]}></LineMap>
                </div>

            </div>
            
        </div>
    )
}
export default Detailtopic
{/* <div>
<div className="flex">
    <a href={item?.url}>
        <li className="text-red-500 underline">{ count+1 +".  " + item?.url}</li>
    </a>
    <p className="px-10 underline cursor-pointer" onClick={()=>handlSetView(item.url)}>Xem nội dung</p>
    <p className="px-2 underline cursor-pointer" onClick={handleClose}>Đóng</p>
</div>
<div className="text-justify">{view===item.url?item?.content:""}</div>
</div> */}