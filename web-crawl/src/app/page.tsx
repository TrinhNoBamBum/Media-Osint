'use client'
import Link from 'next/link'
import Image from "next/image";
import React from "react";
import { useState,useEffect } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation'
export default function Home() {
  const router = useRouter()
  const [isTRue, setTrue]=useState(false)
  const [crawlData, setCrawlData] = useState<any>();
  
  useEffect(()=>{
    const fetchData = async () => {
      try {
          const response = await axios.get('http://127.0.0.1:5000/api/data');
          console.log(response)
          setCrawlData(response.data)
      } catch (error) {
          console.error('Lỗi khi gọi API:', error);
      }
    };
    fetchData()
  },[])
  const handleUpdate=()=>{
    
    const fetchData = async () => {
      try {
          setTrue(true)
          const rp = await axios.put('http://127.0.0.1:5000/api/update');
          if(rp.status==200){
            setTrue(false)
          }
          
          console.log(rp)
       
      } catch (error) {
          console.error('Lỗi khi gọi API:', error);
      }
    };
    fetchData()
  }

  const handleGetDetail=(url:string)=>{
    router.push(`/Detailtopic/${url}`)
  }
  // console.log(crawlData?.["Ukraine"])
  return (
    <div>
    {isTRue===true ?(<div className="bg-gray-200 h-screen flex justify-center items-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Đang cập nhật dữ liệu.......................</h1>
      <p className="text-lg">Vui lòng chờ 1 chút</p>
    </div>
  </div>):(<div className="">
  <div className='bg-slate-100 py-1.5 flex justify-between px-5'><img src='Untitled.png' className='w-24 h-24'></img><div className='text-center '><h1 className='text-amber-600 font-bold text-4xl'>Hệ thống trinh sát mạng<br></br><h3 className='text-amber-600 font-bold text-4xl'>NDT</h3></h1></div><div><h3 className='font-bold'>Trinh No</h3> <h3 className="font-bold">Lớp :ANHTTT, c155, d1</h3></div></div>
  <div className='w-5/6 m-auto'>
  <h1 className="text-2xl font-bold mb-4">Theo dõi video Youtube</h1>
  {/* <button className="py-2 px-4 rounded-md text-white bg-indigo-400 " >Thêm chủ đề</button> */}
  <button className="py-2 px-4 rounded-md text-white bg-indigo-400 float-right" onClick={handleUpdate}>Cập nhật</button>
    <table className="min-w-full bg-white border rounded-lg overflow-hidden my-2">
      <thead className="bg-gray-100 border-b">
        <tr>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Số thứ tự</th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Chủ đề</th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Số lượng</th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Xem chi tiết</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {
          crawlData?.map((item:any,index:any)=>(

              <tr>
              <td className="py-3 px-4">{index+1}</td>
              <td className="py-3 px-4">{item[0]['topic']}</td>
              <td className="py-3 px-4">{item.length||0} video</td>
              <td className="py-3 px-4"><p className='button w-1/2' onClick={()=>handleGetDetail( item[0]['topic'])}>Xem chi tiết</p></td>
            </tr>

          ))
        }
        
      </tbody>
    </table>
    </div>
</div>)}
    </div>
  );
}
