AngularJs Exercise – Visualize videogame data

The objective of this exercise is to understand the ability of the participant to use the available
datasets and load them into a database and generate meaningful analysis and visualizations on top
of it.
1. Setup ngx admin - https://github.com/akveo/ngx-admin or equivalent admin dashboards based
on angularJs. Feel free to use any of the alternatives mentioned in the link below
Some alternatives :
https://ourcodeworld.com/articles/read/678/top-7-best-free-angular-2-admin-templates
2. Change a few thematic/visual components on the dashboard to give it a corporate look and feel.
a. Use white based themes
b. Change headers / titles etc.
c. Remove unnecessary tabs/components from the dashboard.
d. Anything additional is a bonus
3. Download and understand the video game usage and sales datasets available at the following
location.
Video game sales : https://www.kaggle.com/gregorut/videogamesales/version/2
Video game usage : https://data.world/craigkelly/steam-game-data
You may need to register on both the sites to download the data.
4. Load the data into a database of your choice – Relational or NoSQL .
5. Try to come up with atleast 5 exploratory visualizations you would like to show. The more
insightful, the better.

 Show the number of games in each genre
 Games released by year
 Game buys vs game price - is the trend obvious?
 Age grouping of games

6. Create a python based api to expose this data analysis
7. Consume the above created api in your angularjs applications and create visualizations to depict
the analysis.
Things to note:
1. Try and create a story around the exercise
2. We will also want to look at the quality of code so do try and put in some tests to support
your code – python and angularjs
3. Feel free to improvise on the visualizations – you could use three.js, d3.js etc for the same.