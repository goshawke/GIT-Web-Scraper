from datetime import datetime
from ontology import all_licenses

class GitProject:
    def __init__(self, projTitle: str, details: list[str]):
        split_title = projTitle.split('/')
        self.owner = split_title[0]
        self.name = split_title[1]
        self.stars = 0
        self.license = 'MIT_License'
        self.updated = None
        self.lang = 'C'
        
        for detail  in details:
            if parse_stars(detail) > 0:
                self.stars = parse_stars(detail)
            elif detail.startswith('C'):
                self.lang = detail
            elif detail.startswith('Updated'):
                parsed = detail.strip('Updated ')
                reparsed = parsed.strip(',')
                self.updated = datetime.strptime(reparsed, '%B %d, %Y')
            elif len(detail) > 0:
                parsed_license = detail.strip(' license') ## this is formatting from Github
                for license in all_licenses:
                    if parsed_license in license:
                        self.license = license



def parse_stars(starsStr):
    try:
        return int(starsStr)
    except ValueError:
        return 0
