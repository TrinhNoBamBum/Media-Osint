import re
from datetime import datetime

def Covert(input_string):

# Chuỗi đầu vào
    # Sử dụng regular expression để tìm số nguyên và ngày tháng
    integer_pattern = r'[\d,]+'
    date_pattern = r'[A-Za-z]{3} \d{1,2}, \d{4}'

    # Tìm số nguyên
    integer_match = re.search(integer_pattern, input_string)
    integer_value = int(integer_match.group().replace(',', ''))

    # Tìm ngày tháng
    date_match = re.search(date_pattern, input_string)
    date_value = datetime.strptime(date_match.group(), '%b %d, %Y').date()
    
    return {
        "view":integer_value,
        "date":date_value
    }
    # In kết quả