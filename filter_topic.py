from collections import Counter
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

# Đoạn văn bản của bạn
def topWork(text):

    # Sử dụng word_tokenize để tách các từ từ đoạn văn bản
    words = word_tokenize(text)

    # Chuyển đổi các từ thành chữ thường để tránh sự phân biệt chữ hoa chữ thường
    words = [word.lower() for word in words]

    # Loại bỏ stop words (từ dừng) như 'là', 'và', 'của'...
    stop_words = set(stopwords.words('english'))
    words = [word for word in words if word.isalpha() and word not in stop_words]

    # Đếm số lần xuất hiện của mỗi từ
    word_counts = Counter(words)

    # Trích xuất từ xuất hiện nhiều nhất
    most_common_word = word_counts.most_common(1)[0]
    return most_common_word[0]