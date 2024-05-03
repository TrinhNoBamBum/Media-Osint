import json
from getURLselenium import call_url
from youtube_audio_to_text import update_dataPY
from filter_topic import topWork,end_Result
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
        title_lowercase = item["title"].lower()
        for key in conditions:
            key_lowercase = key.lower() 
            if key_lowercase in title_lowercase:
                grouped_data[key].append(item)
                break  # Thoát khỏi vòng lặp khi đã nhóm được
    return grouped_data

#Hàm thêm dữ liệu vao file json
def add_to_json(json_file_path, new_item):
    existing_data = []
    with open(json_file_path, "r", encoding="utf-8") as json_file:
        existing_data = json.load(json_file)

    # Thêm đối tượng mới vào danh sách
    existing_data.append(new_item)

    # Ghi lại dữ liệu đã được cập nhật vào tệp JSON
    with open(json_file_path, "w", encoding="utf-8") as json_file:
        json.dump(existing_data, json_file, ensure_ascii=False, indent=4)
    print("Đã thêm phần tử mới vào tệp JSON.")


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
    
#API get page
@app.route('/api/get_pages',methods=['GET'])
def get_pages():
    try:
        # Đọc dữ liệu từ tệp JSON
        file_path = 'url_page.json'
        data = read_json_file(file_path)
        return jsonify(data), 200
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
@app.route('/api/update',methods=['POST'])
def update_data():
    data = request.json
    try:
        call_url(data['urlPage'])
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
#api thêm page
@app.route('/api/add_page',methods=['POST'])
def add_page():
    try:
        data = request.json
        if data is not None:
            # Gọi hàm append_data_to_file để thêm dữ liệu vào tệp
            add_to_json('url_page.json',data['data'])
            return jsonify({'message': 'Dữ liệu đã được thêm vào tệp thành công'}), 200
        else:
            return jsonify({'error': 'Không tìm thấy dữ liệu trong yêu cầu'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

#api call Key Comment
@app.route('/api/call_key_comment',methods=['POST'])
def get_key_comment():
    try:
        data=request.json
 
        arr=[]
        if data is not None:
            
            arr=end_Result(data['comments'])
            return jsonify(arr), 200
        else:
            return jsonify({'error': 'Không tìm thấy dữ liệu trong yêu cầu'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True)

#Y Tưởng : Khi load lên giao diện Dùng flask gọi api, lúc này dữ liệu  sẽ đươcj gọi lên, thông qua quá trình xử ký
# từ file để đưa về kiểu dữ liệu mong muốn  nhận được,   
# Ý 2: Khi bấm nút cập nhật, sẽ gọi api call lại dữ liệu( api lúc này sẽ có 2 modul, 1 là gọi để lấy tất cả link url, 2 là chạy để lọc ra thông tin của từng video đó)