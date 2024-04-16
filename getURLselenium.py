from selenium import webdriver
import time
from bs4 import BeautifulSoup

# Chỉ định đường dẫn đến tệp thực thi Chrome WebDriver
def call_url(urlOR):
    chrome_path = r'D:\DriverGoogle\chromedriver-win64\chromedriver.exe'

    # Tạo một đối tượng WebDriver
    driver = webdriver.Chrome(executable_path=chrome_path)
    driver.get(urlOR)

    # Chờ 5 giây để trang web tải hoàn chỉnh
    time.sleep(5)
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    links = soup.find_all('a', href=True)
    youtube_links = []
    for link in links:
        href = link['href']
        if '/watch' in href:
            youtube_links.append(href)

    # Lưu các liên kết vào tệp văn bản
    new_links = set("https://www.youtube.com" + link for link in youtube_links)
    file_path = "youtube_links.txt"

    # Đọc các liên kết từ tệp cũ
    old_links = set()
    try:
        with open(file_path, "r") as file:
            for line in file:
                old_links.add(line.strip())
    except FileNotFoundError:
        pass

    # Lọc ra các liên kết mới so với tệp cũ
    new_unique_links = new_links - old_links

    # Ghi các liên kết mới vào tệp mới
    new_file_path = "new_youtube_links.txt"
    with open(new_file_path, "w") as file:
        for link in new_unique_links:
            file.write(link + "\n")

    with open(file_path , "a") as file:
        for link in new_unique_links:
            file.write(link + "\n")
    driver.quit()
