import os
import json
from pytube import YouTube
from langdetect import detect
import whisper
from crawlTitle import get_Title
from pt_cam_xuc import text_sentiment_analysis
from tom_tat_doc import Tom_Tat
from covert import Covert
from tom_tat_VN import tom_tat_vn
from pt_cam_xuc_vn import pt_cam_xuc_vnmese
from feeling import feelingVI, feelingEN
# Function to process YouTube URL, transcribe, and save result to JSON
def process_youtube_url(url):
    try:
        info=get_Title(url)
        print("Thông tin cmt",info['comments'])
        c_m_t=[]
        for i in info['comments']:
            c_m_t.append({
                "content_cmt":i,
                "feeling_cmt":feelingVI(pt_cam_xuc_vnmese(i))
            })
        print("Thật là ảo ma",c_m_t)
        global date_view
        if info['view']:
            date_view=Covert(info['view'])
        else:
            date_view={
                "view":0,
                "date":'0-0-0'
            }
        # Create a YouTube object from the URL
        yt = YouTube(url)
        # Get the audio stream
        audio_stream = yt.streams.filter(only_audio=True).first()
        # Download the audio stream
        output_path = "YoutubeAudios"
        filename = "audio.mp3"
        audio_stream.download(output_path=output_path, filename=filename)
        print(f"Audio downloaded from {url}")

        # Load the base model and transcribe the audio
        model = whisper.load_model("base")
        result = model.transcribe(f"{output_path}/{filename}")
        transcribed_text = result["text"]
        language = detect(transcribed_text)
        print(f"Detected language: {language}")
        print(transcribed_text)
        global tom_tat
        global cam_xuc
        if(language=='vi'):
            tom_tat=tom_tat_vn(transcribed_text)
            cam_xuc=pt_cam_xuc_vnmese(transcribed_text[:250])
        else:
            tom_tat=Tom_Tat(transcribed_text)
            cam_xuc=text_sentiment_analysis(transcribed_text)
        
        global feeling
        if (language=="vi"):
            feeling=feelingVI(cam_xuc)
        else:
            feeling=feelingEN(cam_xuc)
        print("Transcription:")
        
        print("Văn bản tóm tắt :",tom_tat),
        print("Cảm xúc :",cam_xuc)
        print("Feeling",feeling)
        # Detect the language
        

        # Clean up downloaded audio file
        os.remove(f"{output_path}/{filename}")
        os.rmdir(output_path)

        return {"url": url,"title":info['title'], "content": transcribed_text, "summary":tom_tat,"feeling":feeling, "view":date_view['view'],"date":date_view['date'].strftime('%Y-%m-%d'),"comments":c_m_t}

    except Exception as e:
        print(f"An error occurred while processing {url}: {str(e)}")
        return None

# Input file containing YouTube URLs
def update_dataPY():

    input_file = "new_youtube_links.txt"

    # Output file for transcriptions
    output_file = "transcriptions.json"

    # Read existing data from JSON file, if available
    existing_data = []
    if os.path.exists(output_file):
        with open(output_file, "r", encoding="utf-8") as json_file:
            existing_data = json.load(json_file)

    # Process URLs from input file
    results = []
    with open(input_file, "r", encoding="utf-8") as file:
        urls = file.readlines()

    for url in urls:
        url = url.strip()  # Remove leading/trailing whitespaces
        result = process_youtube_url(url)
        if result:
            results.append(result)

    # Add new results to existing data
    existing_data.extend(results)

    # Write updated data to JSON file
    with open(output_file, "w", encoding="utf-8") as json_file:
        json.dump(existing_data, json_file, ensure_ascii=False, indent=4)

    print(f"All URLs processed. Transcriptions saved to {output_file}")