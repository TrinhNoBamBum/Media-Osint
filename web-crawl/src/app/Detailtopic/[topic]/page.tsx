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
    
      useEffect(()=>{
        const fetchData = async () => {
          try {
              const response:any = await axios.get('http://127.0.0.1:5000/api/data');
              console.log(response)
              setCrawlData(response?.data)
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
                <h3>100</h3>
                </div>
                <div className="bg-green-400 font-mono text-2xl font-semibold text-white w-1/4 p-3">Tích cực
                <h3>20</h3>
                </div>
                <div className="bg-blue-400 font-mono text-2xl font-semibold text-white w-1/4 p-3">Trung tính
                <h3>5</h3>
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
                                                        Tiêu đề :
                                                    </li>
                                                    <li>
                                                        Tóm tắt nội dung :
                                                    </li>
                                                    <li>
                                                        Loại : <span className="bg-lime-400 rounded-full text-white px-2">Tích cực</span>
                                                    </li>
                                                    <li>
                                                        View :
                                                    </li>
                                                    <li>
                                                        Thời gian
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
                        <LineMap></LineMap>
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