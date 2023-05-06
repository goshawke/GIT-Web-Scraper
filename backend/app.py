from flask import Flask, request
from bs4 import BeautifulSoup
from flask_cors import CORS
import requests
import json
from datetime import *
import lxml
import ontology

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

@app.route("/")
def home():
    return "Hello, Flask!"

@app.route("/search-results/<term>")
def searchResults(term):
    print("search term is: " + term)

    args = request.args
    lang = args["lang"]

    url = f'https://github.com/search?l={lang}&o=desc&s=updated&type=Repositories&q={term}&p=1'

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
        
        newProj = ontology.create_project(result.get("name", "N/A"), "owner", "C", ["GNU_Lesser_General_Public_License"], 10, datetime(2023, 1, 4))
        print("new proj was created in ontology, name is : " + newProj.title)
        count = count + 1

    print("Success")
    returnedOntResult1 = ontology.get_individuals_Project_WithLastModified()
    for res in returnedOntResult1:
        print("returned from ontology :" + res) 
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

@app.route("/dependencies")
def dependencies():
    args = request.args
    user = args["user"]
    projName = args["projName"]

    # Define the URL of the repository page
    url = f'https://github.com/{user}/{projName}/network/dependencies'

    # Send a request to the URL and get the HTML content
    response = requests.get(url)
    html_content = response.content

    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(html_content, 'lxml')

    # Find the README.md file and extract its contents
    dependencies_list = soup.find_all('div', {'data-test-selector':'dg-repo-pkg-dependency'})

    dependencies = []
    if dependencies_list:
        
        for all_dep in dependencies_list:
            #temp = BeautifulSoup(all_dep, 'html.parser')
            dependency_name = all_dep.find('a',{'data-hovercard-type':'dependendency_graph_package'}).get_text().strip()
            dependency_version = all_dep.find('span',{'data-view-component':'true'}).get_text().strip()
            dependencies.append({'dependency_name':f'{dependency_name}','dependency_version':f'{dependency_version}'})
        print(dependencies)

    else:
        print("No dependencies")
    return dependencies