from flask import Flask, request
from bs4 import BeautifulSoup
import requests
import json
import datetime
import lxml

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, Flask!"

@app.route("/search-results/<term>")
def searchResults(term):
    print("search term is: " + term)

    url = f'https://github.com/search?l=C&o=desc&s=updated&type=Repositories&q={term}&p=1'

    response = requests.get(url)

    html_content = response.content
    soup = BeautifulSoup(html_content, 'html.parser')

    search_results = soup.find_all('li', {'class':'repo-list-item'})
    count = 1

    results = []

    for each_result in search_results:
        sample_code = str(each_result)
    
        print(10*'*')
        print(f"Repo details for search result {count}")
        soup2 = BeautifulSoup(sample_code,'html.parser') # repo name
        soup3 = BeautifulSoup(sample_code,'html.parser') # repo language
        soup4 = BeautifulSoup(sample_code,'html.parser') # repo license
        soup5 = BeautifulSoup(sample_code,'html.parser') # 

        repo_name = soup2.find('a',{'class':'v-align-middle'}).get_text().strip()
        
        print(f'''Repo name = {repo_name}''')

        repoDetails = soup3.find_all('div', {'class':'mr-3'})
        number_of_details = len(repoDetails)
        
        print(f"Number of details present in the repo: " + str(number_of_details))

        details = []
        for each_detail in repoDetails:
            cleaned = each_detail.text.strip()
            print(cleaned)
            details.append(cleaned)
        result = {'name': repo_name, 'details' : details}

        results.append(result)
        count = count + 1

    print("Success")
    return results

@app.route("/file-structure")
def fileStructure():
    args = request.args
    user = args["user"]
    projName = args["projName"]

    current_location = request.args.get("fullRoute", default= "")
    route = current_location.replace("-", "/")

    print("full route is :  " + current_location)

    print("user is : " + user)
    data = []

    url = f'https://github.com/{user}/{projName}/{route}'

    response = requests.get(url)
    html_content = response.content

    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(html_content, 'lxml')

    list_of_content = soup.find_all('div',{'role':'row','class':'Box-row Box-row--focus-gray py-2 d-flex position-relative js-navigation-item'})

    
    for content in list_of_content:
        content_name = content.find('div', {'role': 'rowheader'}).get_text().strip()
        content_type_temp = content.svg
        content_url = (content.a)['href']
        content_type = content_type_temp['aria-label']
        today = datetime.datetime.now()
        #content_updated_tag = content.find('relative-time')
        content_updated_tag = content.select_one('relative-time')
        if content_updated_tag is not None:
            content_updated = content_updated_tag.text
        else:
            content_updated = "N/A"
        data.append({'content_name': str(content_name), 'content_type': str(content_type), 'content_updated': str(content_updated), 'URL': str(content_url)})



    for d in data:
        print(d)

    return data

