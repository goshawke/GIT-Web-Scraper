#Notes:
#Issues are we cannot classify details like programming language, updated date and license because they fall into same tag <div> 
#and same class 'mr-3'

#Ideas
"""
While running function we should look for number of counts div tags are found
Based on the count we should check the data type of the content and then assign details to the object.
"""



import requests
from bs4 import BeautifulSoup

key_word = input('Please enter keyword: ')

url = f'https://github.com/search?l=C&o=desc&s=updated&type=Repositories&q={key_word}&p=1'

response = requests.get(url)

html_content = response.content
#print(html_content)
soup = BeautifulSoup(html_content, 'lxml')

search_results = soup.find_all('li', {'class':'repo-list-item'})
#only_one_result = soup.find('li', {'class':'repo-list-item'})
#print("Only one result=" + str(only_one_result))
count = 1

results = []
for each_result in search_results:
    sample_code = str(each_result)
    #print(sample_code)
    print(10*'*')
    print(f"Repo details for search result {count}")
    soup2 = BeautifulSoup(sample_code,'html.parser')    # repo name
    soup3 = BeautifulSoup(sample_code,'html.parser') #repo language
    soup4 = BeautifulSoup(sample_code,'html.parser') # repo license
    soup5 = BeautifulSoup(sample_code,'html.parser') # 
    
    repo_name = soup2.find('a',{'class':'v-align-middle'}).get_text().strip()
    #print(f'''Repo name = {soup2.find('a',{'class':'v-align-middle'}).get_text().strip()}''')

    stars = None
    license = None
    language = None
    repoDetails = soup3.find_all('div', {'class':'mr-3'})
    number_of_details = len(repoDetails)
    last_updated = each_result.select_one('relative-time').get_text().strip()
    temp_name = (each_result.a.get_text()).split("/")
    name = temp_name[1]
    temp_language = each_result.find('span',{'itemprop':'programmingLanguage'})

    if temp_language != None:
        language = temp_language.get_text().strip()


    #print("Last updated date of the repo = " + str(last_updated.text))
    
    #print(f"Number of details present in the repo: " + str(number_of_details))
    temp_stars = soup3.find('a',{'href':'/'+str(repo_name)+'/stargazers'})

    if temp_stars != None:
        stars = temp_stars.get_text().strip()
        #print("Number of stars available on the repo = " + str(stars))

    for each_detail in repoDetails:
        if 'license' in str(each_detail):
            #print("This is the license found= " + each_detail.text.strip())
            license = each_detail.text.strip()
            break


        #print("all details of each " + each_detail.text.strip())
    
    print(f'''
        Details present about the repo:
        Name = {name}
        license = {license}
        last_updated = {last_updated}
        stars = {stars}
        language = {language}
        ''')

    result = {
      "project_name": f"{name}",
      "project_owner": f"{temp_name[0]}",
      "language": f"{language}",
      "license": f"{license}",
      "stars": f"{stars}",
      "last_update": f"{last_updated}"
    }

    results.append(result)
    count = count + 1
            
'''
  {
      "project_name": "sample-project-2",
      "project_owner": "user2",
      "language": "C",
      "license": "MIT",
      "stars": 200,
      "last_update": "2023-01-15"
    }
'''
print("Printing search results: " + str(results))
print("Success")

    # Repo language = {soup3.find('span', {'itemprop':'programmingLanguage'}).get_text().strip()}
    # Repo license = {soup4.find('div', {'class':'mr-3'}).get_text().strip()}
    # Repo time = {soup5.find('relative-time', {'class':'no-wrap'}).get_text().strip()}




#soup_one = BeautifulSoup(only_one_result, 'html.parser')

#print("Only one result: " + soup_one.find('relative-time',{'class':'no-wrap'}))
#if search_results:
#    for all_dep in search_results:
#        #temp = BeautifulSoup(all_dep, 'html.parser')
#        c = all_dep.text.strip()
#        print(c)

