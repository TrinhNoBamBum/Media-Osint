import json
from getURLselenium import call_url
from youtube_audio_to_text import update_dataPY
from filter_topic import topWork
from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import sys
import shutil
import whisper
from pytube import YouTube
from langdetect import detect


app = Flask(__name__)
CORS(app) 
#Nhóm theo topic cố định
#đọc file txt
def read_conditions_from_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        conditions = [line.strip() for line in file.readlines()]
    return conditions
#thêm dữ liệu vào file txt
def append_data_to_file(file_path, data):
    try:
        # Kiểm tra xem data có rỗng không
        if data:
            with open(file_path, 'a', encoding='utf-8') as file:
                # Kiểm tra xem tệp có rỗng không
                if file.tell() > 0:
                    file.write('\n')  # Thêm ký tự xuống dòng nếu tệp không rỗng
                file.write(data)
        else:
            print("Dữ liệu trống, không thêm vào tệp.")
    except Exception as e:
        print("Lỗi khi thêm dữ liệu vào tệp:", e)
#đọc file json
def read_json_file(file_path):
    with open(file_path, 'r',encoding='utf-8') as file:
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

#Nhóm thep topic được cố định trong file

def group_by_user(data, conditions):
    grouped_data = {key: [] for key in conditions}
    for item in data:
        for key in conditions:
            if key in item["title"]:
                grouped_data[key].append(item)
                break  # Thoát khỏi vòng lặp khi đã nhóm được
    return grouped_data

@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        # Đọc dữ liệu từ tệp JSON
        topic=read_conditions_from_file('topic.txt')
        file_path = 'transcriptions.json'
        data = read_json_file(file_path)
        dataCovert=group_by_user(data,topic)
        return jsonify(dataCovert), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

#api get topic
@app.route('/api/get_topic', methods=['GET'])
def get_topic():
    try:
        # Đọc dữ liệu từ tệp JSON
        topic=read_conditions_from_file('topic.txt')
        return jsonify(topic), 200
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
    
#api thêm chủ đề
@app.route('/api/add_topic', methods=['POST'])
def add_topic():
    try:
        # Trích xuất dữ liệu từ yêu cầu POST
        data = request.json
        #Đảm bảo rằng dữ liệu được trích xuất thành công
        if data is not None:
            # Gọi hàm append_data_to_file để thêm dữ liệu vào tệp
            append_data_to_file('topic.txt', data['data'])  # Giả sử 'topic' là key của dữ liệu bạn muốn nhận từ client
            return jsonify({'message': 'Dữ liệu đã được thêm vào tệp thành công'}), 200
        else:
            return jsonify({'error': 'Không tìm thấy dữ liệu trong yêu cầu'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)

#Y Tưởng : Khi load lên giao diện Dùng flask gọi api, lúc này dữ liệu  sẽ đươcj gọi lên, thông qua quá trình xử ký
# từ file để đưa về kiểu dữ liệu mong muốn  nhận được,   
# Ý 2: Khi bấm nút cập nhật, sẽ gọi api call lại dữ liệu( api lúc này sẽ có 2 modul, 1 là gọi để lấy tất cả link url, 2 là chạy để lọc ra thông tin của từng video đó)