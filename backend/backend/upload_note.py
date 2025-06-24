import requests

url = 'http://localhost:8000/api/notes/'
files = {'file': open(r'C:\Users\USER\Documents\note.pdf', 'rb')}
data = {
    'title': 'Test Note',
    'semester': 1,
    'subject': 'Math'
}

response = requests.post(url, files=files, data=data)
print(response.status_code)
print(response.text)
