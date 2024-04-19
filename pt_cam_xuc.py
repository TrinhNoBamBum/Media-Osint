import pandas as pd
import nltk
import re
import numpy as np

# nltk.download('punkt')
# nltk.download('averaged_perceptron_tagger')
# nltk.download('cmudict')
#chạy lần đầu phải kích hoạt để tải dữ liệu về

def text_sentiment_analysis(text):
    # Tiền xử lý văn bản
    text = re.sub(r'\s+', ' ', text)  # Loại bỏ các khoảng trắng dư thừa

    # Tính toán các chỉ số phân tích cảm xúc
    word_list = nltk.word_tokenize(text)
    num_words = len(word_list)

    # Tính toán các chỉ số phân tích cảm xúc
    f = open("positive-words.txt", "r")
    pos = set(f.read().split("\n"))
    f.close()
    f = open('negative-words.txt', encoding = "ISO-8859-1") 
    neg = set(f.read().split("\n"))
    f.close()

    pos_score = sum(1 for word in word_list if word.lower() in pos)
    neg_score = sum(1 for word in word_list if word.lower() in neg)

    polarity = (pos_score - neg_score) / ((pos_score + neg_score) + 0.000001)
    subj = (pos_score + neg_score) / (num_words + 0.000001)

    # Các chỉ số khác
    sentence_list = nltk.sent_tokenize(text)
    num_sentences = len(sentence_list)
    avg_sen_len = num_words / num_sentences

    def is_complex(word):
        pos_tag = nltk.pos_tag([word])[0][1]
        complex_pos_tags = ['JJ', 'JJR', 'JJS', 'RB', 'RBR', 'RBS']
        return pos_tag in complex_pos_tags

    num_complex_words = sum(1 for word in word_list if is_complex(word))
    per_complex_words = 100 * (num_complex_words / num_words)
    fog_index = 0.4 * (avg_sen_len + per_complex_words)

    # Tính số âm tiết trung bình trên từ
    d = nltk.corpus.cmudict.dict()
    syl_counts = [sum(len([p for p in phonemes if p[-1].isdigit()]) for phonemes in d.get(word.lower(), [[]])) for word in word_list]
    syl_per_word = np.average(syl_counts)

    num_letters = sum(len(word) for word in word_list)
    avg_word_len = num_letters / num_words
    avg_words_per_sen = num_words / num_sentences

    # Trả về kết quả phân tích
    return {
        'POSITIVE_SCORE': pos_score,
        'NEGATIVE_SCORE': neg_score,
        'POLARITY SCORE': polarity,
        'SUBJECTIVITY SCORE': subj,
        'AVG SENTENCE LENGTH': avg_sen_len,
        'PERCENTAGE OF COMPLEX WORDS': per_complex_words,
        'FOG INDEX': fog_index,
        'AVG NUMBER OF WORDS PER SENTENCE': avg_words_per_sen,
        'COMPLEX WORD COUNT': num_complex_words,
        'WORD COUNT': num_words,
        'SYLLABLE PER WORD': syl_per_word,
    }

