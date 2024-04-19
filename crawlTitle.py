from selenium import webdriver
import time
from bs4 import BeautifulSoup

# Chỉ định đường dẫn đến tệp thực thi Chrome WebDriver
def get_Title(urlOR):
    chrome_path = r'D:\DriverGoogle\chromedriver-win64\chromedriver.exe'

    # Tạo một đối tượng WebDriver
    driver = webdriver.Chrome(executable_path=chrome_path)
    driver.get(urlOR)

    # Chờ 5 giây để trang web tải hoàn chỉnh
    time.sleep(5)
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    title = soup.find("h1",{'class':'ytd-watch-metadata'})
    view = soup.find("tp-yt-paper-tooltip",{'class':'ytd-watch-info-text'})
    return {
        "title":title.text,
        "view":view.text
    }
