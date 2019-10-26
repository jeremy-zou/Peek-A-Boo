from bs4 import BeautifulSoup
import requests
import re
import pyrebase
import configparser

def scrape():

	config = configparser.ConfigParser()
	config.read('config.ini')
	creds = {
		"apiKey": config["FIREBASE"]["apiKey"],
		"authDomain": config["FIREBASE"]["authDomain"],
		"databaseURL": config["FIREBASE"]["databaseURL"],
		"projectId": config["FIREBASE"]["projectId"],
		"storageBucket": config["FIREBASE"]["storageBucket"],
		"serviceAccount": config["FIREBASE"]["serviceAccount"]
	}
	firebase = pyrebase.initialize_app(creds)
	auth = firebase.auth()
	user = auth.sign_in_with_email_and_password("ericyan1234@gmail.com", "scaryweb")
	token = user['idToken']
	db = firebase.database()
	base_url = "https://wheresthejump.com/full-movie-list/"
	resp = requests.get(base_url)
	soup = BeautifulSoup(resp.text, 'html.parser')

	for row in soup.find_all("tr")[1:]:

		none_tag = False
		movie_link = row.find("a")['href']
		movie_page = requests.get(movie_link)
		movie_soup = BeautifulSoup(movie_page.text, 'html.parser')
		movie_title = re.findall(r'Jump Scares In (.*) \(', movie_soup.find("h1", attrs= {"class": "header-post-title-class"}).text)
		minor_scares = []
		major_scares = []
		if not movie_title:
			movie_title = "None"
			none_tag = True
		else:
			movie_title = movie_title[0]
		outputDict = {
			"name": movie_title,
			"major_scares": major_scares,
			"minor_scares": minor_scares
		}
		print("HEY")
		if not none_tag:
			# print(movie_title)
			# f.write(movie_title + "\n")
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
		none_tag = False

def make_movie_list():
	import json
	f = open('names.txt', 'r')
	count = 1
	val = []
	movies = []

	total = f.readlines()
	for movie in total:
		movie = movie.strip()
		temp = {}
		temp["id"] = count
		count += 1
		temp["name"] = movie
		movies.append(movie)
		val.append(temp)
	print(val)

if __name__ == "__main__":
	scrape()