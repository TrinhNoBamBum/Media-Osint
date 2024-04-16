'use client'
import Image from "next/image";
import React from "react";
import { useState,useEffect } from "react";
import axios from 'axios';
const China =()=>{
    interface VideoItem {
        content: string;
        url: string;
      }
      
      interface CrawlData {
        China: VideoItem[];
        Gaza: VideoItem[];
        Ukraine: VideoItem[];
      }
      
      const [view,setWiew]=useState(null)
      const handlSetView=(index:any)=>{
          setWiew(index)
      }
      const handleClose=()=>{
          setWiew(null)
      }
      const [crawlData, setCrawlData] = useState<CrawlData>();
    
      useEffect(()=>{
        const fetchData = async () => {
          try {
              const response:CrawlData = await axios.get('http://127.0.0.1:5000/api/data');
              console.log(response)
              setCrawlData(response?.data)
          } catch (error) {
              console.error('Lỗi khi gọi API:', error);
          }
        };
        fetchData()
      },[])
    return (
       
        <div>
            <h3>Link url liên quan đến China</h3>
            <ul>
                {
                    crawlData?.["China"]?.map((item:any, index:any)=>(<div><div className="flex"><a href={item?.url}><li className="text-red-500 underline">{ index+1 +".  " + item?.url}</li></a><p className="px-10 underline cursor-pointer" onClick={()=>handlSetView(index)}>Xem nội dung</p> <p className="px-2 underline cursor-pointer" onClick={handleClose}>Đóng</p></div><div>{view===index?item?.content:""}</div></div>))
                }
            </ul>
        </div>
    )
}
export default China