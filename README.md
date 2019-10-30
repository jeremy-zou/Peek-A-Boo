# Project Peek-A-Boo

## Authors
**Names:  Eric Yan, Jeremy Zou, Andrew Wang, Edward Chiao**

## Overview
Project Peek-A-Boo is a mobile application that alerts users in anticipation of jump scares from a database of over 500 scary movies.

The purpose of Project Peek-A-Boo is to make scary and intense movies more accessible to all types of audiences. Many movie-watchers
either avoid horror/scary movies altogether or read the plot in advance to make the experience more tolerable. We wanted to help
alleviate the scariness of watching a scary movie while avoiding the need for spoilers by creating this notification system for jump scares.

Once a user enters the mobile application, they are able to select from a database of over 500 scary movies. They are then able to
choose specifically which filters to apply. The main screen is a timer that can be played or paused in sync with the movie, and push
notifications will be sent to alert the user that a jump scare will occur in exactly 15 seconds, whether the phone screen is on or off.

## Implementation
In order to first create a database of jump scares, a python script was written to webscrape data from https://wheresthejump.com/ and to 
store the json data into a Firebase Realtime Database.

The mobile application was written in React Native and primarily consists of a home screen, search screen, checklist, and timer. The
search screen contains a search bar that automatically filters search results as the user types. The timer creates scheduled push
notifications when the user clicks start, and resets the schedule when the user clicks stop.
