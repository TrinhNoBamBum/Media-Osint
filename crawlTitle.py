from selenium import webdriver
import time
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

# Chỉ định đường dẫn đến tệp thực thi Chrome WebDriver
def get_Title(url):
    chrome_path = r'D:\DriverGoogle\chromedriver-win64\chromedriver.exe'

    # Khởi tạo trình duyệt Chrome
    driver = webdriver.Chrome(executable_path=chrome_path)
    driver.get(url)

    # Chờ một khoảng thời gian để trang web tải hoàn chỉnh
    time.sleep(5)

    # Tìm phần bình luận
    comment_section = driver.find_element(By.CSS_SELECTOR, "ytd-comments#comments")

    # Cuộn xuống phần bình luận
    driver.execute_script("arguments[0].scrollIntoView();", comment_section)

    # Chờ một khoảng thời gian để bình luận được tải
    time.sleep(50)

    # Lấy mã nguồn HTML của trang đã cuộn
    html = driver.page_source

    # Sử dụng BeautifulSoup để phân tích HTML
    soup = BeautifulSoup(html, 'html.parser')

    # Tìm tất cả các phần tử chứa bình luận
    comments=soup.find_all("yt-attributed-string",{'id':'content-text'})
    Arrcmt=[]
    for i in comments:
        Arrcmt.append(i.text)
    title = soup.find("h1",{'class':'ytd-watch-metadata'})
    view = soup.find("tp-yt-paper-tooltip",{'class':'ytd-watch-info-text'})
    driver.quit()
    return {
        "title":title.text,
        "view":view.text,
        "comments":Arrcmt
    }
# Gọi hàm với URL của video YouTube