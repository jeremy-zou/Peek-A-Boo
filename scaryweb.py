from bs4 import BeautifulSoup
import requests
import re
import pyrebase

config = {
	"apiKey": "AIzaSyDgydSG7KjFNSooKwZxyA4ZwAx5Si4iR-g",
    "authDomain": "adverscary.firebaseapp.com",
    "databaseURL": "https://adverscary.firebaseio.com",
    "projectId": "adverscary",
	"storageBucket": "adverscary.appspot.com",
	"serviceAccount": "key.json"
}
firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
user = auth.sign_in_with_email_and_password("ericyan1234@gmail.com", "scaryweb")
token = user['idToken']
db = firebase.database()
base_url = "https://wheresthejump.com/full-movie-list/"
resp = requests.get(base_url)
soup = BeautifulSoup(resp.text, 'html.parser')
for row in soup.find_all("tr")[1:]:

	movie_link = row.find("a")['href']
	movie_page = requests.get(movie_link)
	movie_soup = BeautifulSoup(movie_page.text, 'html.parser')
	movie_title = re.findall(r'Jump Scares In (.*) \(', movie_soup.find("h1", attrs= {"class": "header-post-title-class"}).text)
	minor_scares = []
	major_scares = []
	if not movie_title:
		movie_title = "None"
	else:
		movie_title = movie_title[0]
	outputDict = {
		"name": movie_title,
		"major_scares": major_scares,
		"minor_scares": minor_scares
	}

	for jump_scare in movie_soup.find_all("p"):
		time = re.search(r'\d*:?\d+:\d+', jump_scare.text)
		major = bool(jump_scare.find("strong"))
		description = jump_scare.find("span")
		if (description):
			description_text = description.text[2:]
		if time and major:
			major_scares.append({time.group(): description_text})
		elif time and not major:
			minor_scares.append({time.group(): description_text})
	outputDict["major_scares"] = major_scares
	outputDict["minor_scares"] = minor_scares
	db.child("movies").push(outputDict, user['idToken'])
