'use client'
import Link from 'next/link'
import Image from "next/image";
import React from "react";
import { useState,useEffect } from "react";
import axios from 'axios';
import Modal from './modal/page';
import { useRouter } from 'next/navigation'
import WordMap from './WordMap/page';
import ProgressBar from './ProcessBar/page';
import PieMap from './PieMap/page';
import ModalAddPage from './ModalAddPage/page';
export default function Home() {
  const router = useRouter()
  const [isTRue, setTrue]=useState(false)
  const [crawlData, setCrawlData] = useState<any>();
  const[topics,setTopics]=useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const openModal1 = () => setIsOpen1(true);
  const closeModal1 = () => setIsOpen1(false);
  const [namePage,setNamePage]=useState('')
  const [url, setUrl]=useState('')
  const [topic, setTopic] = useState('');
  const[pages,setPages]=useState<any>()
  const [urlPage,setUrlPage]=useState<any>(null)
  

  useEffect(()=>{
    const get_topic=async()=>{
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/get_topic');
        setTopics(response.data)
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    }
    get_topic()
  },[isOpen])

  //get page
  useEffect(()=>{
    const get_page=async()=>{
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/get_pages');
        setPages(response.data)
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    }
    get_page()
  },[isOpen1])
  useEffect(()=>{
    const fetchData = async () => {
      try {
          const response = await axios.get('http://127.0.0.1:5000/api/data');
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
        if(urlPage){
          setTrue(true)
          const rp = await axios.post('http://127.0.0.1:5000/api/update',{urlPage});
          if(rp.status==200){
            setTrue(false)
          }
  
        }
        else{
          console.log("Chọn page cần cập nhật")
        }   
      } catch (error) {
          console.error('Lỗi khi gọi API:', error);
      }
    };
    fetchData()
  }

  //api thêm topic
  const handleAddTopic=(data:string)=>{
    const addTopic=async()=>{
      try {

        const rp = await axios.post('http://127.0.0.1:5000/api/add_topic',{data});
        setIsOpen(false)
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    }
    addTopic()
  }
  //api thêm page thu thập
  const handleAddPage=()=>{
    const addPage=async()=>{
      const data={
        title:namePage,
        url:url
      }
      try {
        const rp = await axios.post('http://127.0.0.1:5000/api/add_page',{data});
        setIsOpen1(false)
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    }
    addPage()
  }
  //input

  const handleChange = (e:any) => {
      setTopic(e.target.value);
  };
  const handleChangeNamePage=(e:any)=>{
    setNamePage(e.target.value)
  }
  const handleChangeUrl=(e:any)=>{
    setUrl(e.target.value)
  }

  const handleChangeCheck = (event:any, item:any) => {
    setUrlPage(item)
  };
  const handleGetDetail=(url:string)=>{
    router.push(`/Detailtopic/${encodeToHex(url)}`)
  }
  // console.log(crawlData?.["Ukraine"])
  //end-code url
 
  function encodeToHex(text:any) {
    var hexString = '';
    for (var i = 0; i < text.length; i++) {
        var hex = text.charCodeAt(i).toString(16);
        hexString += ('000' + hex).slice(-4); // Đảm bảo rằng mỗi ký tự được biểu diễn bằng 4 ký tự HEX
    }
    return hexString.toUpperCase(); // Chuyển chuỗi HEX thành chữ in hoa để dễ đọc và xử lý
}

  return (
    <div>
    {isTRue===true ?(<div className="bg-gray-200 h-screen flex justify-center items-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Đang cập nhật dữ liệu.......................</h1>
      <p className="text-lg">Vui lòng chờ 1 chút</p>
    </div>
  </div>):(
  <div>
  <div className='p-4 flex gap-10'>
    {
      pages?.map((item:any)=>(
        <div className="flex items-start justify-between shadow-lg bg-slate-50 w-1/6 text-center font-bold">
          <div className="flex items-center">
            <a href={item?.url}>
              <img src="youtube.png" className="w-24 h-24" alt="YouTube Logo" />
            </a>
            <h1>{item?.title}</h1>
          </div>
          <div className="flex items-center">
            <input type="checkbox" onChange={(e:any)=>handleChangeCheck(e,item?.url)} className="mr-1 cursor-pointer" />
          </div>
        </div>
      ))
    }
    <div className='flex  cursor-pointer shadow-lg bg-slate-50 w-1/12 text-center justify-center items-center font-bold' onClick={openModal1}>
      <img src="add.png" className="w-24 h-24" alt="" />
    </div>
  </div>
  <div className="flex">
  
  {/* <div className='bg-slate-100 py-1.5 flex justify-between px-5'><img src='Untitled.png' className='w-24 h-24'></img><div className='text-center '><h1 className='text-amber-600 font-bold text-4xl'>Hệ thống trinh sát mạng<br></br><h3 className='text-amber-600 font-bold text-4xl'>NDT</h3></h1></div><div><h3 className='font-bold'>Trinh No</h3> <h3 className="font-bold">Lớp :ANHTTT, c155, d1</h3></div></div> */}
  
  <div className='w-1/2 m-auto border-solid border-2 border-slate-400 p-2'>
  <button className="py-2 px-4 rounded-md text-white bg-indigo-400 " onClick={openModal}>Thêm chủ đề</button>
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
          topics?.map((item:any, index:any)=>(
              <tr>
              <td className="py-3 px-4">{index+1}</td>
              <td className="py-3 px-4">{item}</td>
              <td className="py-3 px-4">{crawlData?.[`${item}`]?.length||0} video</td>
              <td className="py-3 px-4 justify-center flex"><p className='button w-1/2' onClick={()=>handleGetDetail( item)}>Xem</p></td>
            </tr>
          ))

        }
        
      </tbody>
    </table>
    </div>
    <div className='w-1/2  border-solid border-2 border-slate-400 p-2'> 
        <PieMap crawlData={crawlData}/>
    </div>
  </div>
  </div>)}
  <Modal isOpen={isOpen} onClose={closeModal}>
    <div className='flex gap-2'>
      <input
        type="text"
        name='topic'
        value={topic}
        onChange={handleChange}
        placeholder="Nhập Topic........."
        className="border border-gray-300 rounded-md p-2 w-full"
      />
      <button className='py-2 px-4 rounded-md text-white bg-indigo-400 ' onClick={()=>handleAddTopic(topic)}>OK</button>
    </div>
  </Modal>
  <ModalAddPage isOpen1={isOpen1} onClose1={closeModal1}>
    <div className='grid gap-y-4'>
      <input
        type="text"
        name='page'
        value={namePage}
        onChange={handleChangeNamePage}
        placeholder="Nhập tên trang........."
        className="border border-gray-300 rounded-md p-2 w-full"
      />
      
      <input
        type="text"
        name='url'
        value={url}
        onChange={handleChangeUrl}
        placeholder="Nhập Url........."
        className="border border-gray-300 rounded-md p-2 w-full"
      />
      <button className='py-2 px-4 rounded-md text-white bg-indigo-400 ' onClick={handleAddPage}>OK</button>
    </div>
  </ModalAddPage>
  </div>
  );
}
