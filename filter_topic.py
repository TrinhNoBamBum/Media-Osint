from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from collections import Counter

def read_file_to_array(filename):
    # Mảng để lưu các dòng từ file
    lines = []

    # Đọc nội dung từ file và thêm vào mảng
    with open(filename, 'r',  encoding='utf-8') as file:
        for line in file:
            lines.append(line.strip())  # Xóa ký tự xuống dòng thừa (nếu có)
    return lines
def topWork(text):
    # Sử dụng word_tokenize để tách các từ từ đoạn văn bản
    words = word_tokenize(text)
    content_array = read_file_to_array("stopVI.txt")
    # Chuyển đổi các từ thành chữ thường để tránh sự phân biệt chữ hoa chữ thường
    words = [word.lower() for word in words]

    # Loại bỏ stop words (từ dừng) như 'là', 'và', 'của'...
    stop_words = set(stopwords.words('english'))
    words = [word for word in words if word.isalpha() and word not in stop_words and word not in content_array]

    # Đếm số lần xuất hiện của mỗi từ
    word_counts = Counter(words)
    arr=[]
    for word, count in word_counts.items():
        arr.append({"name":word, "value":count})
    return arr
def end_Result(data):
    grouped_data = {}
    for item in data:
        feeling = item["feeling_cmt"]
        if feeling not in grouped_data:
            grouped_data[feeling] = []
        grouped_data[feeling].append(item["content_cmt"])

    # Gộp nội dung lại với nhau cho mỗi nhóm
    result = []
    for feeling, contents in grouped_data.items():
        combined_content = " ".join(contents)
        result.append({"content_cmt": combined_content, "feeling_cmt": feeling})

    
    arr1=[]
    for i in result:
        arr1.append({"name":i['feeling_cmt'],"data":topWork(i['content_cmt'])})
    return arr1
