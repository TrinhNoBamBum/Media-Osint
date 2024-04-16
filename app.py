import json
from getURLselenium import call_url
from youtube_audio_to_text import update_dataPY
from filter_topic import topWork
from flask import Flask, jsonify
from flask_cors import CORS
import os
import sys
import shutil
import whisper
from pytube import YouTube
from langdetect import detect


app = Flask(__name__)
CORS(app) 
conditions = ["China", "Gaza", "Ukraine"]
def read_json_file(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data

def group_data_by_custom_conditions(data, conditions):
    grouped_data = {key: [] for key in conditions}
    for item in data:
        for key in conditions:
            if key in item["content"]:
                grouped_data[key].append(item)
                break  # Thoát khỏi vòng lặp khi đã nhóm được
    return grouped_data

def group_data_by_topic(data):
    array_data=[]
    for item in data:
        item['topic']=topWork(item['content'])
        array_data.append(item)
    grouped_data = {}
    for item in array_data:
        content = item["topic"]
        if content not in grouped_data:
            grouped_data[content] = []
        grouped_data[content].append(item)
    grouped_list = list(grouped_data.values())
    return grouped_list




@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        # Đọc dữ liệu từ tệp JSON
        file_path = 'transcriptions.json'
        data = read_json_file(file_path)
        dataCovert=group_data_by_topic(data)
        return jsonify(dataCovert), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
#Viết api update 
@app.route('/api/update',methods=['PUT'])
def update_data():
    try:
        call_url("https://www.youtube.com/@BBCNews/videos")
        update_dataPY()
        return jsonify("Cập nhật dữ liệu thành công"),  200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True)

#Y Tưởng : Khi load lên giao diện Dùng flask gọi api, lúc này dữ liệu  sẽ đươcj gọi lên, thông qua quá trình xử ký
# từ file để đưa về kiểu dữ liệu mong muốn  nhận được,   
# Ý 2: Khi bấm nút cập nhật, sẽ gọi api call lại dữ liệu( api lúc này sẽ có 2 modul, 1 là gọi để lấy tất cả link url, 2 là chạy để lọc ra thông tin của từng video đó)