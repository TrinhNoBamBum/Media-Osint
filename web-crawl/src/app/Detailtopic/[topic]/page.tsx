'use client'
import Image from "next/image";
import React from "react";
import { useState,useEffect } from "react";
import axios from 'axios';
const Detailtopic =({ params }: { params: { topic: string } })=>{

      const [view,setWiew]=useState(null)
      const handlSetView=(index:any)=>{
          setWiew(index)
      }
      const handleClose=()=>{
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
       
        <div className="p-10">
            <h3 className="font-bold">Link url liên quan đến chủ đề {params?.topic}</h3>
            <ul>
                {
                    crawlData?.map((ob:any, index:any)=>{
                        if(ob[0]?.['topic']===params.topic){
                           
                            return ob.map((item:any,count:any)=>
                                     (
                                        <div>
                                            <div className="flex">
                                                <a href={item?.url}>
                                                    <li className="text-red-500 underline">{ count+1 +".  " + item?.url}</li>
                                                </a>
                                                <p className="px-10 underline cursor-pointer" onClick={()=>handlSetView(item.url)}>Xem nội dung</p>
                                                <p className="px-2 underline cursor-pointer" onClick={handleClose}>Đóng</p>
                                            </div>
                                            <div className="text-justify">{view===item.url?item?.content:""}</div>
                                        </div>
                                    )
                            )
                        }
                        return null;
                        
                    })
                }
            </ul>
        </div>
    )
}
export default Detailtopic