from flask import Flask
from bs4 import BeautifulSoup
import requests

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, Flask!"

@app.route("/search-results/<term>")
def searchResults(term):

    url = 'https://github.com/search?l=C&o=desc&s=updated&type=Repositories&q={term}&p=1'

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

